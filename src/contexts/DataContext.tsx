import React, { createContext, useEffect, useState } from "react";
import {
    IAboutData,
    IEducation,
    IEducationData,
    IExperienceData,
    IMainData,
} from "../types";
import axios, { AxiosError } from "axios";
import {
    browserLocalPersistence,
    setPersistence,
    signInWithEmailAndPassword,
    User,
} from "firebase/auth";
import { auth } from "../firebase";
import useAuthState from "../hooks";
import { getAuthToken } from "../utils";
import Loader from "../components/loader/Loader";
import CustomError from "../components/custom-error/CustomError";

interface IGeneralData {
    main: IMainData;
    about: IAboutData;
    experiences: IExperienceData[];
    education: IEducationData[];
}

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

export interface IEducationPostData extends IEducation {
    image?: File;
}

interface IDataContext {
    mainData: IMainData;
    aboutData: IAboutData;
    experienceItems: IExperienceData[];
    updateMainData: (data: IUpdateData) => Promise<void>;
    createExperienceItem: (data: IExperiencePostData) => Promise<void>;
    deleteExperienceItem: (id: string) => Promise<void>;
    updateExperienceItem: (data: IExperiencePostData) => Promise<void>;
    createEducationItem: (
        data: IEducationPostData,
        id: string
    ) => Promise<void>;
    deleteEducationItem: (id: string) => Promise<void>;
    updateEducationItem: (
        data: IEducationPostData,
        id: string
    ) => Promise<void>;
    createOrUpdateAboutData: (about: string) => Promise<void>;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    admin: User | null;
    educationItems: IEducationData[];
}

export const DataContext = createContext<IDataContext | undefined>(undefined);
const BASEURL = import.meta.env.VITE_BASE_URL;

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
    const admin = useAuthState();

    const signIn = async (email: string, password: string) => {
        try {
            await setPersistence(auth, browserLocalPersistence);
            const userCredentials = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
        } catch (error) {
            throw error;
        }
    };

    const signOut = async () => {
        try {
            await auth.signOut();
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
        try {
            const token = await getAuthToken();
            const formData = new FormData();
            console.log(selectedLogo, selectedAvatar);
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

            setLoading(true);
            const response = await axios.put(BASEURL + "/api/main", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });
            setMainData((prev) => ({
                ...prev,
                ...response.data,
            }));
            setLoading(false);
        } catch (error) {
            setError(true);
        }
    };

    const createOrUpdateAboutData = async (about: string) => {
        try {
            const formData = new FormData();
            formData.append("about", about);
            if (aboutData.id) {
                formData.append("id", aboutData.id);
            }
            const token = await getAuthToken();

            setLoading(true);
            const response = await axios.post(
                BASEURL + "/api/about/",
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setAboutData(response.data);
            setLoading(false);
        } catch (error) {
            console.log(error); 
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
        try {
            const formData = new FormData();
            if (companyLogo) {
                formData.append("file", companyLogo);
            }
            formData.append("description", JSON.stringify(description));
            formData.append("endDate", endDate || "");
            formData.append("position", position);
            formData.append("startDate", startDate);
            formData.append("companyName", companyName);
            const token = await getAuthToken();

            setLoading(true);

            const response = await axios.post(
                BASEURL + "/api/experiences",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setExperienceItems([...experienceItems, response.data]);
            setLoading(false);
        } catch (error) {
            console.log(error);
            if (error instanceof AxiosError) {
                const status = error.status as number;
                if (status < 500) {
                    throw new Error(error.response?.data.message);
                } else {
                    setError(true);
                }
            }
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
        try {
            setLoading(true);
            const formData = new FormData();
            if (companyLogo) {
                formData.append("file", companyLogo);
            }
            formData.append("description", JSON.stringify(description));
            formData.append("endDate", endDate || "");
            formData.append("position", position);
            formData.append("startDate", startDate);
            formData.append("companyName", companyName);
            const token = await getAuthToken();

            const response = await axios.put(
                BASEURL + "/api/experiences/" + id,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const i = experienceItems.findIndex(
                (experienceItem) => experienceItem.id === id
            );
            setExperienceItems([
                ...experienceItems.slice(0, i),
                {
                    ...experienceItems[i],
                    ...response.data,
                },
                ...experienceItems.slice(i + 1),
            ]);
            setLoading(false);
        } catch (error) {
            console.log(error);
            if (error instanceof AxiosError) {
                const status = error.status as number;
                if (status < 500) {
                    throw new Error(error.response?.data.message);
                } else {
                    setError(true);
                }
            }
        }
    };

    const deleteExperienceItem = async (id: string) => {
        try {
            setLoading(true);
            const token = await getAuthToken();

            await axios.delete(BASEURL + "/api/experiences/" + id, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

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

    const createEducationItem = async (
        {
            place,
            status,
            endDate,
            subjects,
            startDate,
            image,
        }: IEducationPostData,
        id: string = ""
    ) => {
        try {
            const formData = new FormData();
            formData.append("subjects", JSON.stringify(subjects));
            formData.append("status", status);
            formData.append("place", place);
            formData.append("endDate", endDate || "");
            formData.append("startDate", startDate);
            if (image) {
                formData.append("file", image);
            }

            setLoading(true);
            const token = await getAuthToken();
            const response = await axios.post(
                BASEURL + "/api/education",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setEducationItems([...educationItems, response.data]);
        } catch (error) {
            console.log(error);
            if (error instanceof AxiosError) {
                const status = error.status as number;
                if (status < 500) {
                    throw new Error(error.response?.data.message);
                } else {
                    setError(true);
                }
            }
        } finally {
            setLoading(false);
        }
    };

    const updateEducationItem = async (
        {
            place,
            status,
            endDate,
            subjects,
            startDate,
            image,
        }: IEducationPostData,
        id: string
    ) => {
        try {
            const formData = new FormData();
            formData.append("subjects", JSON.stringify(subjects));
            if (image) {
                formData.append("file", image);
            }
            formData.append("status", status);
            formData.append("place", place);
            formData.append("endDate", endDate || "");
            formData.append("startDate", startDate);
            const token = await getAuthToken();
            setLoading(true);
            const response = await axios.put(
                BASEURL + "/api/education/" + id,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const i = educationItems.findIndex((item) => item.id === id);
            setEducationItems([
                ...educationItems.slice(0, i),
                {
                    ...educationItems[i],
                    ...response.data,
                },
                ...educationItems.slice(i + 1),
            ]);
        } catch (error) {
            console.log(error);
            if (error instanceof AxiosError) {
                const status = error.status as number;
                if (status < 500) {
                    throw new Error(error.response?.data.message);
                } else {
                    setError(true);
                }
            }
        } finally {
            setLoading(false);
        }
    };

    const deleteEducationItem = async (id: string) => {
        try {
            const token = await getAuthToken();
            setLoading(true);
            await axios.delete(BASEURL + "/api/education/" + id, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
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
        const fetchGeneral = async () => {
            try {
                setLoading(true);
                const { data }: { data: IGeneralData } = await axios.get(
                    BASEURL + "/api/general"
                );

                setAboutData(data.about);
                setMainData(data.main);
                setExperienceItems(data.experiences);
                setEducationItems(data.education);
            } catch (error) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchGeneral();
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
            {loading && <Loader />}
            {error && <CustomError />}
            {!loading && !error && children}
        </DataContext.Provider>
    );
};
