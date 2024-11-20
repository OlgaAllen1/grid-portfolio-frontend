import { Routes, Route } from "react-router-dom";

import MainPage from "./pages/main/MainPage";
import AdminPage from "./pages/admin/AdminPage";
import { DataContextProvider } from "./contexts/DataContext";
import SigninPage from "./pages/signin/SigninPage";
import { Toaster } from "react-hot-toast";

function App() {
    return (
        <DataContextProvider>
            <Toaster position="top-center" reverseOrder={false} />
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/signin" element={<SigninPage />} />
            </Routes>
        </DataContextProvider>
    );
}

export default App;
