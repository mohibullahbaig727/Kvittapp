export const validateCardName= (text) => {
    const regex = /^[A-Za-z]+$/;
    
    if (!regex.test(text)) {
      return "Only alphabets are allowed";
    }
  
    if (text.length > 15) {
      return "Maximum length exceeded (15 characters)";
    }
  
    return ""; // Return an empty string if the text is valid
};
  
export const validateCardNumber = (text) => {
    const regex = /^\d{16}$/;
  
    if (!regex.test(text)) {
      return "Card number must be 16 digits";
    }
  
    return ""; // Return an empty string if the text is valid
};
  

export const validateFolderName = (text) => {
    const regex = /^[A-Za-z\s\p{P}]+$/u;
  
    if (text.length > 20) {
      return "Maximum length exceeded (20 characters)";
    }
  
    if (!regex.test(text)) {
      return "Only alphabets, punctuation marks, and spaces are allowed";
    }
  
    return ""; // Return an empty string if the text is valid
  };
  