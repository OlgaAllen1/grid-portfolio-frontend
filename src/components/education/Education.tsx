import "./Education.css";

interface IEducationItem {
	status: string,
	place: string,
	subjects: string[],
	date: string,
    id: number | string,
}


const educationItems: IEducationItem[] = [
    {
        id: 0,
        status: "MASTERS OF BUSINESS ADMINISTRATION",
        place: "Weber State University-Ogden, UT",
        subjects: ["IT Management", "Networking", "Cybersecurity", "Accounting and Finance"],
        date: "December 2016",
    },
    {
        id: 1,
        status: "FULL STACK WEB DEVELOPER IMMERSIVE PROGRAM",
        place: "Helio Training - Salt Lake City, UT",
        subjects: ["React", "MongoDB", "GraphQL", "NodeJS"],
        date: "September 2017-December 2017, August 2020-October 2020",
    },
    {
        id: 2,
        status: "ADVANCED SCRUM MASTER CERTIFICATION",
        place: "Scrum Alliance - Awarded",
        subjects: [],
        date: "January 18, 2024",
    },
    {
        id: 3,
        status: "COMPUTER SCIENCE CLASSES",
        place: "Weber State University-Ogden, UT",
        subjects: ["C++", "Python", "SQL", "Advanced Algorithms", "Calculus"],
        date: "August 2022-present",
    },
];

const EducationListItem = ({ status, subjects, place, date }: IEducationItem) => {
    return (
        <li className="education__item">
            <div className="education__item__info">
                <h3 className="education__item__title">{status}</h3>
                <p className="education__item__subtitle">{place}</p>
                <p className="education__item__description">{subjects.toString().replaceAll(",", ", ")}</p>
            </div>
            <p className="education__item__date">{date}</p>
        </li>
    );
};


const Education = () => {
    return (
        <section className="education block section">
            <h2>Education</h2>
            <ul className="education__list">
                {educationItems.map((item) => (
                    <EducationListItem
                        key={item.id}
                        {...item}
                    />
                ))}
            </ul>
        </section>
    );
};

export default Education;
