import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { API_BASE_URL } from "../constants";

const RemoveCard = async (ID_User, cardNumber, handleRefresh) => {
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
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Success',
        textBody: 'Card deleted successfully',
      })
      handleRefresh()
      // Handle success response
      console.log(result); // You can customize this based on your API response
    } else {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title:'Failed',
        textBody: 'Something went wrong',
      })
     
      // Handle error response
      console.log("Failed to update user details");
    }
  } catch (error) {
    // Handle fetch error
    console.log(error);
  }
};

export default RemoveCard;
