var config = require("./dbconfig");
const sql = require("mssql");

//function to fetch all reciepts
async function getReciepts(ID_User, cardNumbers) {
  try {
    let pool = await sql.connect(config);
    let reciepts = await pool
      .request()
      .input("input_parameter", sql.VarChar, ID_User)
      .input("input_cardNumbers", sql.NVarChar, cardNumbers.join(",")).query(`
        SELECT DISTINCT rd.ID_Reciept, sd.Logo_URL, rd.store_Name, rd.Datetime, rd.Total_Amount
        FROM dim.Reciept_details rd
        JOIN dim.Store_details sd ON rd.Store_Name = sd.Store_name
        WHERE rd.ID_User = @input_parameter AND rd.Card_number IN (
          SELECT value FROM STRING_SPLIT(@input_cardNumbers, ',')
        )
      `);

    console.log("server connected");
    return reciepts.recordsets;
  } catch (error) {
    console.log(error);
  }
}

//function to fetch all reciepts
async function getReceiptsInFolder(ID_User, ID_Folder) {
  try {
    let pool = await sql.connect(config);
    let reciepts = await pool
      .request()
      .input("input_parameter", sql.VarChar, ID_User)
      .input("input_ID_Folder", sql.Int, ID_Folder).query(`
      SELECT DISTINCT rd.ID_Reciept, sd.Logo_URL, rd.store_Name, rd.Datetime, rd.Total_Amount, fd.Folder_name, fd.Reciept_Number
      FROM dim.Reciept_details rd
      JOIN dim.Store_details sd ON rd.Store_Name = sd.Store_name 
      JOIN dim.Folder_Details fd ON fd.Reciept_Number= rd.ID_Reciept 
      WHERE rd.ID_User = @input_parameter AND fd.ID_Folder = @input_ID_Folder;
      
      `);

    console.log("server connected");
    return reciepts.recordsets;
  } catch (error) {
    console.log(error);
  }
}
//function to fetch reciept with a particular parameter
async function getReciept(receiptNumber) {
  try {
    let pool = await sql.connect(config);
    let receipts = await pool
      .request()
      .input("input_parameter", sql.VarChar, receiptNumber).query(`
        SELECT rd.*, sd.Logo_URL
        FROM dim.Reciept_details rd
        INNER JOIN dim.Store_details sd ON rd.Store_name = sd.Store_name
        WHERE rd.ID_Reciept = @input_parameter
      `);

    return receipts.recordsets;
  } catch (error) {
    console.log(error);
  }
}

//function to  fetch items for returns
async function getItemsWithReturns(ID_User) {
  try {
    let pool = await sql.connect(config);
    let returns = await pool
      .request()
      .input("input_parameter", sql.Int, ID_User).query(`
          SELECT rd.*, sd.Logo_URL
          FROM dim.Returns rd
          INNER JOIN dim.Store_details sd ON rd.Store_name = sd.Store_name
          WHERE rd.ID_User = @input_parameter  
      `);

    console.log("server connected");
    return returns.recordsets;
  } catch (error) {
    console.log(error);
  }
}

//function to fetch single return details
async function getSingleReturnDetail(ID_Return) {
  try {
    let pool = await sql.connect(config);
    let reciepts = await pool
      .request()
      .input("input_parameter", sql.BigInt, ID_Return)
      .query(
        "SELECT * FROM dim.Return_details where ID_Return = @input_parameter"
      );

    return reciepts.recordsets;
  } catch (errors) {
    console.log(errors);
  }
}

//function to fetch store details
async function getAllStoreDetails() {
  try {
    let pool = await sql.connect(config);
    let reciepts = await pool
      .request()
      .query("SELECT * FROM dim.Store_details");

    console.log("server connected");
    return reciepts.recordsets;
  } catch (errors) {
    console.log(errors);
  }
}

//function to fetch store with a particular parameter
async function getSingleStoreDetail(Store_Name) {
  try {
    let pool = await sql.connect(config);
    let singleStore = await pool
      .request()
      .input("input_parameter", sql.VarChar, Store_Name)
      .query(
        "SELECT * from dim.Store_details where Store_Name = @input_parameter"
      );

    return singleStore.recordsets;
  } catch (errors) {
    console.log(errors);
  }
}

async function getAllUserDetails(ID_User) {
  try {
    let pool = await sql.connect(config);
    let user = await pool
      .request()
      .input("input_parameter", sql.BigInt, ID_User)
      .query("SELECT * FROM dim.User_details  WHERE ID_User = 1");

    return user.recordsets;
  } catch (errors) {
    console.log(errors);
  }
}

//function to get folders of a user
async function getFolders(userId) {
  try {
    await sql.connect(config);
    const result =
      await sql.query`SELECT DISTINCT ID_Folder, Folder_name FROM dim.Folder_Details WHERE ID_User = ${userId}`;
    return result.recordset;
  } catch (err) {
    console.error(err);
  }
}

//function to delete cards
async function removeCard(ID_User, cardNumber) {
  try {
    let pool = await sql.connect(config);

    // Fetch user details
    const result = await pool
      .request()
      .input("input_parameter", sql.BigInt, ID_User)
      .query(`SELECT * FROM dim.User_details WHERE ID_User = @input_parameter`);

    if (result.recordset.length === 0) {
      // User not found
      return false;
    }

    const userDetails = result.recordset[0];
    const totalCards = userDetails.Total_cards_added;

    if (totalCards < cardNumber) {
      // Card not found
      return false;
    }

    // Shift card details
    if (cardNumber > 1) {
      for (let i = cardNumber - 1; i < totalCards - 1; i++) {
        const nextCardNumber = i + 1;
        await pool
          .request()
          .input("id", sql.BigInt, ID_User)
          .input("cardNumber", sql.Int, nextCardNumber).query(`
            UPDATE dim.User_details 
            SET 
              Card${i}_PO = Card${nextCardNumber}_PO,
              Card${i}_bank = Card${nextCardNumber}_bank,
              Card${i}_cardnumber = Card${nextCardNumber}_cardnumber,
              Card${i}_expiration_date = Card${nextCardNumber}_expiration_date
            WHERE ID_User = @id`);
      }
    }
    // Clear values of deleted card
    await pool
      .request()
      .input("id", sql.BigInt, ID_User)
      .input("cardNumber", sql.Int, totalCards).query(`
        UPDATE dim.User_details 
        SET 
          Card${totalCards}_PO = null,
          Card${totalCards}_bank = null,
          Card${totalCards}_cardnumber = null,
          Card${totalCards}_expiration_date = null,
          Total_cards_added = Total_cards_added - 1
        WHERE ID_User = @id`);

    return true; // Return true if update is successful
  } catch (errors) {
    console.log(errors);
    return false; // Return false if update fails
  }
}

async function addCard(ID_User, cardNumber, expirationDate, bank, PO) {
  try {
    let pool = await sql.connect(config);
    let totalCardsAdded = 0; // Set the initial value of totalCardsAdded
    // Fetch the current value of Total_cards_added from the database
    const result = await pool
      .request()
      .input("ID_User", sql.BigInt, ID_User)
      .query(
        `SELECT Total_cards_added FROM dim.User_details WHERE ID_User = @ID_User`
      );
    if (result.recordset.length > 0) {
      totalCardsAdded = result.recordset[0].Total_cards_added;
    }

    // Update the column names based on the value of totalCardsAdded
    const cardNumberColumnName = `Card${totalCardsAdded + 1}_cardnumber`;
    const expirationDateColumnName = `Card${
      totalCardsAdded + 1
    }_expiration_date`;
    const bankColumnName = `Card${totalCardsAdded + 1}_bank`;
    const POColumnName = `Card${totalCardsAdded + 1}_PO`;

    await pool
      .request()
      .input("ID_User", sql.BigInt, ID_User)
      .input("Card_cardnumber", sql.VarChar(16), cardNumber)
      .input("Card_expiration_date", sql.VarChar(5), expirationDate)
      .input("Card_bank", sql.VarChar(100), bank)
      .input("Card_PO", sql.VarChar(100), PO)
      .query(
        `UPDATE dim.User_details 
         SET ${cardNumberColumnName} = @Card_cardnumber,
             ${expirationDateColumnName} = @Card_expiration_date,
             ${bankColumnName} = @Card_bank,
             ${POColumnName} = @Card_PO,
             Total_cards_added = Total_cards_added + 1
             WHERE ID_User = @ID_User`
      );
    return true; // Return true if update is successful
  } catch (errors) {
    console.log(errors);
    return false; // Return false if update fails
  }
}

//add a return to the db
async function addReturn(
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
) {
  try {
    // Connect to the database
    await sql.connect(config);

    // Get the last ID_return_row value
    const result =
      await sql.query`SELECT TOP 1 ID_return_row FROM dim.Returns ORDER BY ID_return_row DESC`;

    // Get the current date
    const currentDate = new Date();

    // Insert the new row into the database
    await sql.query`
      INSERT INTO dim.Returns
        ( ID_Return,  ID_User, ID_Reciept, Store_name, Return_status, Return_date_created, Return_quantity, Product, Product_name, Return_Amount, Return_reason, Return_comment, Return_option)
      VALUES
        ( null, ${ID_User}, ${ID_Reciept}, ${Store_name}, ${Return_status}, ${currentDate}, ${Return_quantity}, ${Product}, ${Product_name}, ${Return_Amount}, ${Return_reason}, ${Return_comment}, ${Return_option})
    `;

    // Close the database connection
    await sql.close();
  } catch (err) {
    console.error(err);
  }
}

//create a new folder |||| can also be used to add reciept to a folder
async function addNewFolder(ID_User, body) {
  const { ID_Folder, Folder_name, Reciept_Number } = body;

  try {
    await sql.connect(config);
    const request = new sql.Request();
    request.input("ID_User", sql.Int, ID_User);
    request.input("ID_Folder", sql.Int, ID_Folder);
    request.input("Folder_name", sql.NVarChar(50), Folder_name);
    request.input("Reciept_Number", sql.Int, Reciept_Number);

    const query = `
      INSERT INTO [dim].[Folder_Details]
        ( [ID_Folder], [Folder_name], [ID_User], [Reciept_Number])
      VALUES
        ( @ID_Folder, @Folder_name, @ID_User, @Reciept_Number)
    `;

    const result = await request.query(query);
    console.log("New folder added to the database:", result);
  } catch (err) {
    console.error("Error adding new folder to the database:", err);
  } finally {
    sql.close();
  }
}

async function deleteFolder(ID_User, ID_Folder) {
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request.input("ID_User", sql.Int, ID_User);
    request.input("ID_Folder", sql.Int, ID_Folder);

    const query = `
      DELETE FROM [dim].[Folder_Details]
      WHERE [ID_User] = @ID_User AND [ID_Folder] = @ID_Folder
    `;

    const result = await request.query(query);
    console.log("Folder deleted from the database:", result);
  } catch (err) {
    console.error("Error deleting folder from the database:", err);
  } finally {
    sql.close();
  }
}

async function deleteReceiptInFolder(ID_User, ID_Folder, Reciept_Number) {
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request.input("ID_User", sql.Int, ID_User);
    request.input("ID_Folder", sql.Int, ID_Folder);
    request.input("Reciept_Number", sql.Int, Reciept_Number);

    const query = `
      DELETE FROM [dim].[Folder_Details]
      WHERE [ID_User] = @ID_User AND [Reciept_Number] = @Reciept_Number
    `;

    const result = await request.query(query);
    console.log("receipt in Folder deleted from the database:", result);
  } catch (err) {
    console.error("Error deleting receipt in folder from the database:", err);
  } finally {
    sql.close();
  }
}


async function updateReturnStatus(ID_Return, newStatus) {
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request.input("ID_Return", sql.Int, ID_Return);
    request.input("Return_status", sql.VarChar(50), newStatus);

    const query = `
      UPDATE [dim].[Returns]
      SET [Return_status] = @Return_status
      WHERE [ID_Return] = @ID_Return
    `;

    const result = await request.query(query);
    console.log("Return status updated in the database:", result);
  } catch (err) {
    console.error("Error updating return status in the database:", err);
  } finally {
    sql.close();
  }
}


module.exports = {
  getReciepts: getReciepts,
  getReciept: getReciept,
  getItemsWithReturns: getItemsWithReturns,
  getAllStoreDetails: getAllStoreDetails,
  getSingleStoreDetail: getSingleStoreDetail,
  getSingleReturnDetail: getSingleReturnDetail,
  getAllUserDetails: getAllUserDetails,
  getFolders: getFolders,
  getReceiptsInFolder: getReceiptsInFolder,

  addCard: addCard,
  addReturn: addReturn,
  addNewFolder: addNewFolder,

  updateReturnStatus: updateReturnStatus,

  removeCard: removeCard,
  deleteFolder: deleteFolder,
  deleteReceiptInFolder: deleteReceiptInFolder,
  //addReciept: addReciept,
};
