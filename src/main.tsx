import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

const root = document.getElementById("root");
if (!root) {
    throw new Error("Root not found!");
}

ReactDOM.createRoot(root).render(
    <BrowserRouter>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </BrowserRouter>
);
