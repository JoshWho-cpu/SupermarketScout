import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import UpdatePage from './routes/UpdatePage';
import StoreDetailPage from './routes/StoredetailPage';
import ItemSearchPage from './routes/ItemSearchPage';
import { StoresContextProvider } from './context/StoresContext';

const App = () => {
    return (
        <StoresContextProvider>
            <div className="container">
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/stores/:id/update" element={<UpdatePage />} />
                        <Route path="/stores/:id" element={<StoreDetailPage />} />
                        <Route path="/itemSearchPage" element={<ItemSearchPage />} />
                    </Routes>
                </Router>
            </div>
        </StoresContextProvider>
    );
};

export default App;
