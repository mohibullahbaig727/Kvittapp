import { API_BASE_URL } from "../constants";

const RemoveCard = async (ID_User, cardNumber) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/userDetails/${ID_User}/removeCard/${cardNumber}`, // Include card number in the URL
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // You can add additional headers if required, such as authorization token
        },
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

export default RemoveCard;
