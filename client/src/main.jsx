import React from 'react';
import ReactDOM from 'react-dom/client'; // Corrected import
import App from "./App";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container); // Corrected createRoot call
root.render(<App />);