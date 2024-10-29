import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import MainPage from "./pages/main/MainPage";
import AdminPage from "./pages/admin/AdminPage";
import { MainData } from "./types";
import { DataContextProvider } from "./contexts/DataContext";

function App() {
    return (
        <DataContextProvider>
            <Routes>
                <Route
                    path="/"
                    element={<MainPage />}
                />
                <Route
                    path="/admin"
                    element={
                        <AdminPage
                            
                        />
                    }
                />
            </Routes>
        </DataContextProvider>
    );
}

export default App;
