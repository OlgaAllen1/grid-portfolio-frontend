import { useContext } from "react";
import { DataContext } from "./DataContext";

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error("useData must be used within a DataContextProvider");
    }
    return context;
};
