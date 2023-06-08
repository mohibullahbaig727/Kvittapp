import React, { useState } from "react";
import CardContext from "./CardContext";

const SelectedCardsProvider = ({ children }) => {
  const [selectedCards, setSelectedCards] = useState([]);

  const updateSelectedCards = (newSelectedCards) => {
    setSelectedCards(newSelectedCards);
  };

  return (
    <CardContext.Provider
      value={{
        selectedCards,
        updateSelectedCards,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};

export default SelectedCardsProvider;
