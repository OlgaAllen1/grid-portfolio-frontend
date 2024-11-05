import React, { createContext, useEffect, useState } from "react";
import { IExperienceData, MainData } from "../types";
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

interface IExperiencePostData {
    company: {
        image?: File;
        name: string;
    };
    description: string[];
    position: string;
    startDate: string;
    endDate: string;
}

interface IDataContext {
    mainData: MainData;
    experienceItems: IExperienceData[];
    updateMainData: (data: IUpdateData) => Promise<void>;
    createExperienceItem: (data: IExperiencePostData) => Promise<void>;
    deleteExperienceItem: (id: string) => Promise<void>;
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
    const [experienceItems, setExperienceItems] = useState<IExperienceData[]>(
        []
    );
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchMainData = async () => {
        try {
            const response = await axios.get(BASEURL + "/api/main");
            setMainData(response.data);
        } catch (error) {
            setError(true);
        }
    };
    const fetchExperienceItems = async () => {
        try {
            const response = await axios.get(BASEURL + "/api/experiences");
            setExperienceItems(response.data);
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
            const response = await axios.put(BASEURL + "/api/main", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setMainData(response.data);
            setLoading(false);
        } catch (error) {
            setError(true);
        }
    };

    const createExperienceItem = async ({
        company,
        description,
        endDate,
        position,
        startDate,
    }: IExperiencePostData) => {
        const formData = new FormData();
        if (company.image) {
            formData.append("file", company.image);
        }
        formData.append("description", JSON.stringify(description));
        formData.append("endDate", endDate);
        formData.append("position", position);
        formData.append("startDate", startDate);
        formData.append("companyName", company.name);

        try {
            setLoading(true);

            const response = await axios.post(
                BASEURL + "/api/experiences",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setExperienceItems([...experienceItems, response.data]);
            setLoading(false);
        } catch (error) {
            setError(true);
        }
    };

    const deleteExperienceItem = async (id: string) => {
        try {
            setLoading(true);
            await axios.delete(
                BASEURL + "/api/experiences/" + id
            );

            const i = experienceItems.findIndex(
                (experienceItem) => experienceItem.id === id
            );
            setExperienceItems([
                ...experienceItems.slice(0, i),
                ...experienceItems.slice(i + 1),
            ]);
            setLoading(false);
        } catch (error) {
            setError(true);
        }
    };

    useEffect(() => {
        const promises = [fetchMainData(), fetchExperienceItems()];
        Promise.all(promises).then(() => {
            setLoading(false);
        });
    }, []);

    return (
        <DataContext.Provider
            value={{
                mainData,
                experienceItems,
                deleteExperienceItem,
                updateMainData,
                createExperienceItem,
            }}
        >
            {loading && <p>Loading...</p>}
            {error && <p>Error :(</p>}
            {!loading && !error && children}
        </DataContext.Provider>
    );
};
