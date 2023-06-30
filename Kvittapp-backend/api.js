const dbOperations = require("./dbOperations");
var Db = require("./dbOperations");
var Reciepts = require("./reciepts");

var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/api", router);

//middleware(thunk) used for authentication
router.use((request, response, next) => {
  console.log("middleware");
  next();
});

//api used to get list of reciepts for particular user and card number
router.route("/allReciepts/:ID_User").get((request, response) => {
  const { ID_User } = request.params;
  const cardNumbers = request.query.cardNumber
    ? request.query.cardNumber.split(",")
    : [];
  dbOperations
    .getReciepts(ID_User, cardNumbers)
    .then((result) => {
      response.json(result);
    })
    .catch((error) => {
      console.log(error);
      response.status(500).send("Internal server error");
    });
});

//api used to get data of a particular reciept
router.route("/recieptdata/:Receipt_number").get((request, response) => {
  dbOperations.getReciept(request.params.Receipt_number).then((result) => {
    response.json(result);
  });
});

//api used to get list of returns for particular user
router.route("/allReturns/:ID_User", async (req, res) => {
  try {
    // Call the function with the required parameters
    const  ID_User  = request.params.ID_User;
    const data = await dbOperations.getItemsWithReturns(ID_User);
    const jsonData = JSON.stringify(data);
    // Send the response back to the client
    res.send(jsonData);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while retrieving returns.");
  }
});
router.route("/allReturns/:ID_User").get((request, response) => {
  const { ID_User } = request.params;
  dbOperations
    .getItemsWithReturns(ID_User)
    .then((result) => {
      response.json(result);
    })
    .catch((error) => {
      console.log(error);
      response.status(500).send("Internal server error");
    });
});

router.route("/returns/:ID_Return").get((request, response) => {
  dbOperations
    .getSingleReturnDetail(request.params.ID_Return)
    .then((result) => {
      response.json(result);
    });
});

router.route("/storeDetails").get((request, response) => {
  dbOperations.getAllStoreDetails().then((result) => {
    response.json(result);
  });
});

router.route("/storeDetails/:Store_Name").get((request, response) => {
  dbOperations
    .getSingleStoreDetail(request.params.Store_Name)
    .then((result) => {
      response.json(result);
    });
});

router.route("/userDetails/:ID_User").get((request, response) => {
  dbOperations.getAllUserDetails(request.params.ID_User).then((result) => {
    response.json(result);
  });
});

router.get("/folders/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const folders = await dbOperations.getFolders(userId);
    res.status(200).json(folders);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching folders." });
  }
});

//get receipts for particular folder
router
  .route("/ReceiptsInFolder/:ID_User/:ID_Folder")
  .get((request, response) => {
    const { ID_User } = request.params;
    const { ID_Folder } = request.params;

    dbOperations
      .getReceiptsInFolder(ID_User, ID_Folder)
      .then((result) => {
        response.json(result);
      })
      .catch((error) => {
        console.log(error);
        response.status(500).send("Internal server error");
      });
  });

//remove card api
router
  .route("/userDetails/:ID_User/removeCard/:cardNumber")
  .put((request, response) => {
    const ID_User = request.params.ID_User;
    const cardNumber = request.params.cardNumber; // Get card number from URL params

    dbOperations
      .removeCard(ID_User, cardNumber) // Pass card number to removeCard function
      .then((result) => {
        if (result) {
          response.json({ message: "User details updated successfully" });
        } else {
          response.status(500).json({ error: "Failed to update user details" });
        }
      })
      .catch((error) => {
        response.status(500).json({ error: "Failed to update user details" });
      });
  });

// add card api
router.put("/userDetails/:ID_User/addCard", async (request, response) => {
  const ID_User = request.params.ID_User;
  const { cardNumber, expirationDate, bank, PO } = request.body; // Destructure card details from request body

  try {
    // Call the removeCard function from your database operations module
    const result = await dbOperations.addCard(
      ID_User,
      cardNumber,
      expirationDate,
      bank,
      PO
    );

    if (result) {
      response.json({ message: "User details updated successfully" });
    } else {
      response.status(500).json({ error: "Failed to update user details" });
    }
  } catch (error) {
    response.status(500).json({ error: "Failed to update user details" });
  }
});

//add a new return api
router.post("/userReturns/:ID_User/addReturn", async (req, res) => {
  const ID_User = req.params.ID_User;
  const {
    ID_Reciept,
    Store_name,
    Return_status,
    Return_quantity,
    Product,
    Product_name,
    Return_Amount,
    Return_reason,
    Return_comment,
    Return_option,
  } = req.body;

  try {
    await dbOperations.addReturn(
      ID_User,
      ID_Reciept,
      Store_name,
      Return_status,
      Return_quantity,
      Product,
      Product_name,
      Return_Amount,
      Return_reason,
      Return_comment,
      Return_option
    );
    res.json({ message: "Return added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add return" });
  }
});

//add a folder api
router.post("/addFolder/:ID_User", async (req, res) => {
  const ID_User = req.params.ID_User;
  const { ID_Folder, Folder_name, Reciept_Number } = req.body;

  try {
    await dbOperations.addNewFolder(ID_User, {
      ID_Folder,
      Folder_name,
      Reciept_Number,
    });
    res.status(201).json({ message: "New folder added successfully" });
  } catch (error) {
    console.error("Error adding new folder:", error);
    res.status(500).json({ error: "Failed to add new folder" });
  }
});

//delete a folder api
router.delete("/deleteFolder/:ID_User/:ID_Folder", async (req, res) => {
  const ID_User = req.params.ID_User;
  const ID_Folder = req.params.ID_Folder;

  try {
    await dbOperations.deleteFolder(ID_User, ID_Folder);
    res.status(200).json({ message: "Folder deleted successfully" });
  } catch (error) {
    console.error("Error deleting folder:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the folder" });
  }
});

//delete a folder api
router.delete(
  "/deleteReceiptInFolder/:ID_User/:ID_Folder/:Reciept_Number",
  async (req, res) => {
    const ID_User = req.params.ID_User;
    const ID_Folder = req.params.ID_Folder;
    const Reciept_Number = req.params.Reciept_Number;

    try {
      await dbOperations.deleteReceiptInFolder(
        ID_User,
        ID_Folder,
        Reciept_Number
      );
      res
        .status(200)
        .json({ message: "Receipt from folder deleted successfully" });
    } catch (error) {
      console.error("Error deleting Receipt from folder:", error);
      res.status(500).json({
        error: "An error occurred while deleting receipt frrom folder",
      });
    }
  }
);

router.put("/updateReturnStatus/:ID_Return", async (req, res) => {
  const ID_Return = req.params.ID_Return;
  const { Return_status } = req.body;

  try {
    await dbOperations.updateReturnStatus(ID_Return, Return_status);
    res.status(200).json({ message: "Return status updated successfully" });
  } catch (error) {
    console.error("Error updating return status:", error);
    res.status(500).json({ error: "Failed to update return status" });
  }
});

var port = process.env.PORT || 8090;
app.listen(port);
console.log("Reciepts api running at port :" + port);
