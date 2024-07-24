import React, { useState, createContext } from "react";

export const StoresContext = createContext();

export const StoresContextProvider = (props) => {
    const [stores, setStores] = useState([]);
    const [selectedStore, setSelectedStore] = useState([]);
    const addStores = (store) => {
        setStores(prevStores => [...prevStores, store]);
    }
    return (
        <StoresContext.Provider 
            value={{ 
                stores, 
                setStores, 
                addStores,
                selectedStore,
                setSelectedStore
            }}
        >
            {props.children}
        </StoresContext.Provider>
    );
};