import React, { useState } from "react";
import CardContext from "./CardContext";

const SelectedCardsProvider = ({ children }) => {
  const [selectedCards, setSelectedCards] = useState([]);
  const [folderName, setFolderName] = useState('');
  const [folderColor, setFolderColor] = useState('');
  const [filterParams, setFilterParams] = useState({})
  const [isAddReceiptToFolder, setIsAddReceiptToFolder] = useState(false)
  const [selectedFolderId, setSelectedFolderId] = useState(null)
  const [receiptToFolderParams, setReceiptToFolderParams] = useState([])

  const updateSelectedCards = (newSelectedCards,) => {
    setSelectedCards(newSelectedCards);
  };

  const updateFolderName = (newFolderName) => {
    setFolderName(newFolderName);
  };

  const updateFolderColor = (newFolderColor) => {
    setFolderColor(newFolderColor);
  };

  const updateFilterParams = (newFilterParams) => {
    setFilterParams(newFilterParams);
  };

  const updateSelectedFolderId = (newSelectedFolderId) => {
    setSelectedFolderId(newSelectedFolderId);
  };


  const updateIsAddReceiptToFolder = (newIsAddReceiptToFolder) => {
    setIsAddReceiptToFolder(newIsAddReceiptToFolder);
  };



  const updateReceiptToFolderParams = (newReceiptToFolderParams) => {
    // Check if the newReceiptToFolderParams parameter is null or empty
    if (!newReceiptToFolderParams) {
      // Empty the array by setting it to an empty array
      setReceiptToFolderParams([]);
    } else if (receiptToFolderParams.includes(newReceiptToFolderParams)) {
      // Remove the existing value from the array
      setReceiptToFolderParams(receiptToFolderParams.filter(param => param !== newReceiptToFolderParams));
    } else {
      // Add the new value to the array
      setReceiptToFolderParams([...receiptToFolderParams, newReceiptToFolderParams]);
    }
  };
  

  return (
    <CardContext.Provider
      value={{
        selectedCards,
        updateSelectedCards,
        folderName,
        updateFolderName,
        folderColor,
        updateFolderColor,
        filterParams,
        updateFilterParams,
        isAddReceiptToFolder,
        updateIsAddReceiptToFolder,
        selectedFolderId,
        updateSelectedFolderId,
        receiptToFolderParams,
        updateReceiptToFolderParams
      }}
    >
      {children}
    </CardContext.Provider>
  );
};

export default SelectedCardsProvider;
