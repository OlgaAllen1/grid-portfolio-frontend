export interface MainData {
    id: string;
    avatar: string;
    description: string;
    email: string;
    linkedIn: string;
    logo: string;
    name: string;
    position: string;
}

export interface IExperienceData {
    id: string;
    company: {
        image: string;
        name: string;
    };
    description: string[];
    position: string;
    startDate: string;
    endDate: string;
}
