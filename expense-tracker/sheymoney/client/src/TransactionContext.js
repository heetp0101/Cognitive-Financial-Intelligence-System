import React, { createContext, useContext, useState } from "react";

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactionData, setTransactionData] = useState(null);

  const setTransaction = (data) => {
    setTransactionData(data);
  };


  return (
    <TransactionContext.Provider value={{ transactionData, setTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransaction = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error("useTransaction must be used within a TransactionProvider");
  }
  return context;
};
