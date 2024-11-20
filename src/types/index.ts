export interface IMainData {
    id: string;
    avatar: string;
    description: string;
    email: string;
    linkedIn: string;
    logo: string;
    name: string;
    position: string;
}

export interface IAboutData {
    id: string;
    about: string;
}

export interface IExperienceData {
    id: string;
    companyLogo: string;
    companyName: string;
    description: string[];
    position: string;
    startDate: string;
    endDate?: string;
}

export interface IEducation {
    status: string;
    place: string;
    subjects?: string[];
    startDate: string;
    endDate?: string;
}

export interface IEducationData extends IEducation {
    image?: string;
    id: string;

}

export type RefsMap = {
    [key: string]: React.RefObject<HTMLElement>;
};
