import React, { useState } from "react";
import CardContext from "./CardContext";

const SelectedCardsProvider = ({ children }) => {
  const [selectedCards, setSelectedCards] = useState([]);
  const [folderName, setFolderName] = useState('');
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
    setReceiptToFolderParams(...receiptToFolderParams ,newReceiptToFolderParams);
  };


  return (
    <CardContext.Provider
      value={{
        selectedCards,
        updateSelectedCards,
        folderName,
        updateFolderName,
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
