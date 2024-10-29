import React, { createContext, useEffect, useState } from "react";
import { MainData } from "../types";
import axios from "axios";
interface IUpdateData {
    selectedAvatar?: File;
    selectedLogo?: File;
    position: string;
    description: string;
    name: string;
    linkedIn: string;
    email: string;
}
interface IDataContext {
    mainData: MainData;
    updateMainData: (data: IUpdateData) => Promise<void>;
}

export const DataContext = createContext<IDataContext | undefined>(undefined);
const BASEURL = "http://localhost:8000";

export const DataContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [mainData, setMainData] = useState<MainData>({
        avatar: "",
        description: "",
        email: "",
        id: "",
        linkedIn: "",
        logo: "",
        name: "",
        position: "",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchMainData = async () => {
        try {
			console.log("FETCHING....")
            const response = await axios.get(BASEURL + "/api/main");
            setMainData(response.data);
            setLoading(false);
        } catch (error) {
            setError(true);
        }
    };

    const updateMainData = async ({
        selectedAvatar,
        selectedLogo,
        position,
        description,
        name,
        linkedIn,
        email,
    }: IUpdateData) => {
        const formData = new FormData();
        if (selectedAvatar) {
            formData.append("avatar", selectedAvatar);
        }
        if (selectedLogo) {
            formData.append("logo", selectedLogo);
        }
        formData.append("id", mainData.id);
        formData.append("position", position);
        formData.append("description", description);
        formData.append("name", name);
        formData.append("linkedIn", linkedIn);
        formData.append("email", email);

        try {
            setLoading(true);
			console.log("PUTTING....")

            await axios.put(BASEURL + "/api/main", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            await fetchMainData();
        } catch (error) {
            setError(true);
        }
    };

    useEffect(() => {
        fetchMainData();
    }, []);

    return (
        <DataContext.Provider value={{ mainData, updateMainData }}>
            {loading && <p>Loading...</p>}
            {error && <p>Error :(</p>}
            {!loading && !error && children}
        </DataContext.Provider>
    );
};
