import { ForwardedRef, forwardRef } from "react";
import { useData } from "../../contexts/useData";
import { IEducationData } from "../../types";
import noimage from "../../assets/noimage.png";
import "./Education.css";

export const EducationListItem = ({
    status,
    subjects,
    place,
    startDate,
    endDate,
    image,
}: IEducationData) => {
    return (
        <li className="education__item">
            <img src={image || noimage} alt={place} />
            <div className="education__item__info">
                <h3 className="education__item__title">{status}</h3>
                <p className="education__item__subtitle">{place}</p>
                <p className="education__item__description">
                    {subjects?.toString().replaceAll(",", ", ")}
                </p>
            </div>
            <p className="education__item__date">
                {startDate === "not-selected" ? "" : startDate }<br/>{endDate === "not-selected" ? "" : endDate }
            </p>
        </li>
    );
};

const Education = forwardRef((_, ref: ForwardedRef<HTMLElement>) => {
    const { educationItems } = useData();
    return (
        <section className="education block section" ref={ref}>
            <h2>Education</h2>
            <ul className="education__list">
                {educationItems.map((item) => (
                    <EducationListItem key={item.id} {...item} />
                ))}
            </ul>
        </section>
    );
});

export default Education;
