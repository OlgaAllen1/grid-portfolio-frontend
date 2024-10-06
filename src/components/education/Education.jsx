import "./Education.css";
import PropTypes from "prop-types";


const educationItems = [
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

const EducationListItem = ({ title, subTitle, description, date }) => {
    return (
        <li className="education__item">
            <div className="education__item__info">
                <h3 className="education__item__title">{title}</h3>
                <p className="education__item__subtitle">{subTitle}</p>
                <p className="education__item__description">{description}</p>
            </div>
            <p className="education__item__date">{date}</p>
        </li>
    );
};

EducationListItem.propTypes = {
	title: PropTypes.string,
	subTitle: PropTypes.string,
	description: PropTypes.string,
	date: PropTypes.string,
}

const Education = () => {
    return (
        <section className="education block">
            <h2>Education</h2>
            <ul className="education__list">
                {educationItems.map((item) => (
                    <EducationListItem
                        key={item.id}
                        title={item.status}
                        subTitle={item.place}
                        description={item.subjects.toString().replaceAll(",", ", ")}
                        date={item.date}
                    />
                ))}
            </ul>
        </section>
    );
};

export default Education;
