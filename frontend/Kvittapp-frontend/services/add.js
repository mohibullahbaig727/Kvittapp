import { API_BASE_URL } from "../constants";

export const addCard = async (ID_User, cardDetails) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/userDetails/${ID_User}/addCard`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cardDetails), // Convert card details to JSON string
      }
    );

    if (response.ok) {
      const result = await response.json();
      // Handle success response
      console.log(result); // You can customize this based on your API response
    } else {
      // Handle error response
      console.log("Failed to update user details");
    }
  } catch (error) {
    // Handle fetch error
    console.log(error);
  }
};

export const addReturn = async (
  ID_User,
  Store_name,
  Return_status,
  Return_quantity,
  Product,
  Product_name,
  Return_Amount,
  Return_reason,
  Return_comment,
  Return_option
) => {
  const API_URL = `${API_BASE_URL}/userReturns/${ID_User}/addReturn`;
  const body = {
    Store_name,
    Return_status,
    Return_quantity,
    Product,
    Product_name,
    Return_Amount,
    Return_reason,
    Return_comment,
    Return_option,
  };
  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data.message);
    })
    .catch((error) => {
      console.error(error);
    });
};
