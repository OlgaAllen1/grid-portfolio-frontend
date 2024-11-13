import React, { createContext, useEffect, useState } from "react";
import {
    IAboutData,
    IEducationData,
    IExperienceData,
    IMainData,
} from "../types";
import axios, { AxiosError } from "axios";
import { signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { auth } from "../firebase";

interface IUpdateData {
    selectedAvatar?: File;
    selectedLogo?: File;
    position: string;
    description: string;
    name: string;
    linkedIn: string;
    email: string;
}

export interface IExperiencePostData {
    companyLogo?: File;
    companyName: string;
    description: string[];
    position: string;
    startDate: string;
    endDate?: string;
    id: string;
}

interface IDataContext {
    mainData: IMainData;
    aboutData: IAboutData;
    experienceItems: IExperienceData[];
    updateMainData: (data: IUpdateData) => Promise<void>;
    createExperienceItem: (data: IExperiencePostData) => Promise<void>;
    deleteExperienceItem: (id: string) => Promise<void>;
    updateExperienceItem: (data: IExperiencePostData) => Promise<void>;
    createEducationItem: (data: IEducationData) => Promise<void>;
    deleteEducationItem: (id: string) => Promise<void>;
    updateEducationItem: (data: IEducationData) => Promise<void>;
    createOrUpdateAboutData: (about: string) => Promise<void>;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    admin: UserCredential | null;
    educationItems: IEducationData[];
}

export const DataContext = createContext<IDataContext | undefined>(undefined);
const BASEURL = "http://localhost:8000";

export const DataContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [mainData, setMainData] = useState<IMainData>({
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
    const [aboutData, setAboutData] = useState<IAboutData>({
        about: "",
        id: "",
    });
    const [educationItems, setEducationItems] = useState<IEducationData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [admin, setAdmin] = useState<UserCredential | null>(null);

    const signIn = async (email: string, password: string) => {
        try {
            const userCredentials = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            setAdmin(userCredentials);
        } catch (error) {
            throw error;
        }
    };

    const signOut = async () => {
        try {
            await auth.signOut();
            setAdmin(null);
        } catch (error) {
            setError(true);
        }
    };

    const fetchMainData = async () => {
        try {
            const response = await axios.get(BASEURL + "/api/main");
            setMainData(response.data);
        } catch (error) {
            setError(true);
        }
    };

    const fetchAboutData = async () => {
        try {
            const response = await axios.get(BASEURL + "/api/about");
            setAboutData(response.data);
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.status !== 404) {
                    setError(true);
                }
            }
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

    const createOrUpdateAboutData = async (about: string) => {
        const formData = new FormData();
        formData.append("about", about);
        if (aboutData.id) {
            formData.append("id", aboutData.id);
        }

        try {
            setLoading(true);
            const response = await axios.post(
                BASEURL + "/api/about/",
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            setAboutData(response.data);
            setLoading(false);
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

    const createExperienceItem = async ({
        companyName,
        companyLogo,
        description,
        endDate,
        position,
        startDate,
    }: IExperiencePostData) => {
        const formData = new FormData();
        if (companyLogo) {
            formData.append("file", companyLogo);
        }
        formData.append("description", JSON.stringify(description));
        formData.append("endDate", endDate || "");
        formData.append("position", position);
        formData.append("startDate", startDate);
        formData.append("companyName", companyName);

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
            console.log(error);
        }
    };

    const updateExperienceItem = async ({
        companyName,
        companyLogo,
        description,
        endDate,
        position,
        startDate,
        id,
    }: IExperiencePostData) => {
        const formData = new FormData();
        if (companyLogo) {
            formData.append("file", companyLogo);
        }
        formData.append("description", JSON.stringify(description));
        formData.append("endDate", endDate || "");
        formData.append("position", position);
        formData.append("startDate", startDate);
        formData.append("companyName", companyName);

        try {
            setLoading(true);

            const response = await axios.put(
                BASEURL + "/api/experiences/" + id,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            const i = experienceItems.findIndex(
                (experienceItem) => experienceItem.id === id
            );
            setExperienceItems([
                ...experienceItems.slice(0, i),
                response.data,
                ...experienceItems.slice(i + 1),
            ]);
            setLoading(false);
        } catch (error) {
            setError(true);
            console.log(error);
        }
    };

    const deleteExperienceItem = async (id: string) => {
        try {
            setLoading(true);
            await axios.delete(BASEURL + "/api/experiences/" + id);

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

    const fetchEducationItems = async () => {
        try {
            const response = await axios.get(BASEURL + "/api/education");
            setEducationItems(response.data);
        } catch (error) {
            setError(true);
        }
    };

    const createEducationItem = async ({
        id,
        place,
        status,
        endDate,
        subjects,
        startDate,
    }: IEducationData) => {
        const formData = new FormData();

        formData.append("subjects", JSON.stringify(subjects));
        formData.append("status", status);
        formData.append("place", place);
        formData.append("endDate", endDate || "");
        formData.append("startDate", startDate);
        try {
            setLoading(true);

            const response = await axios.post(
                BASEURL + "/api/education",
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            setEducationItems([...educationItems, response.data]);
            setLoading(false);
        } catch (error) {
            setError(true);
            console.log(error);
        }
    };

    const updateEducationItem = async ({
        id,
        place,
        status,
        endDate,
        subjects,
        startDate,
    }: IEducationData) => {
        const formData = new FormData();

        formData.append("subjects", JSON.stringify(subjects));
        formData.append("status", status);
        formData.append("place", place);
        formData.append("endDate", endDate || "");
        formData.append("startDate", startDate);

        try {
            setLoading(true);

            const response = await axios.put(
                BASEURL + "/api/education/" + id,
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const i = educationItems.findIndex((item) => item.id === id);
            setEducationItems([
                ...educationItems.slice(0, i),
                response.data,
                ...educationItems.slice(i + 1),
            ]);
            setLoading(false);
        } catch (error) {
            setError(true);
            console.log(error);
        }
    };

    const deleteEducationItem = async (id: string) => {
        try {
            setLoading(true);
            await axios.delete(BASEURL + "/api/education/" + id);

            const i = educationItems.findIndex(
                (experienceItem) => experienceItem.id === id
            );
            setEducationItems([
                ...educationItems.slice(0, i),
                ...educationItems.slice(i + 1),
            ]);
            setLoading(false);
        } catch (error) {
            setError(true);
        }
    };

    useEffect(() => {
        const promises = [
            fetchMainData(),
            fetchExperienceItems(),
            fetchEducationItems(),
            fetchAboutData(),
        ];
        Promise.all(promises).then(() => {
            setLoading(false);
        });
    }, []);

    return (
        <DataContext.Provider
            value={{
                aboutData,
                mainData,
                experienceItems,
                admin,
                educationItems,
                deleteExperienceItem,
                updateMainData,
                createExperienceItem,
                updateExperienceItem,
                createEducationItem,
                updateEducationItem,
                deleteEducationItem,
                createOrUpdateAboutData,
                signIn,
                signOut,
            }}
        >
            {loading && <p>Loading...</p>}
            {error && <p>Error :(</p>}
            {!loading && !error && children}
        </DataContext.Provider>
    );
};
