import "./Experience.css";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import { useDrag } from "@use-gesture/react";

import { ForwardedRef, forwardRef, useEffect, useState } from "react";
import { useData } from "../../contexts/useData";
import { IExperienceData } from "../../types";

export const ExperienceItem = ({
    companyLogo,
    companyName,
    description,
    position,
    startDate,
    endDate,
}: IExperienceData) => {
    return (
        <div className="experience__item block">
            <div className="experience__item-header">
                <h2>{position}</h2>
                <h3>{companyName}</h3>
                <p className="experience__item-date">
                    {startDate.month} {startDate.year} -{" "}
                    {endDate ? endDate.month + " " + endDate.year : "now"}
                </p>
            </div>
            <img src={companyLogo} alt={companyName} />
            <ul className="experience__item-list">
                {description.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
};

const Experience = forwardRef((_, ref: ForwardedRef<HTMLElement>) => {
    const { experienceItems } = useData();
    const [offset, setOffset] = useState(0);
    const [slidesPerView, setSlidesPerView] = useState(1); // Default to 1 slide for small screens

    // Calculate slides per view based on screen size
    useEffect(() => {
        const updateSlidesPerView = () => {
            setSlidesPerView(window.innerWidth > 768 ? 2 : 1); // 2 slides for large screens, 1 for small
        };

        updateSlidesPerView(); // Initial check
        window.addEventListener("resize", updateSlidesPerView); // Update on resize

        return () => {
            window.removeEventListener("resize", updateSlidesPerView);
        };
    }, []);

    // Calculate the maximum offset
    const maxOffset = Math.max(0, experienceItems.length - slidesPerView);

    const handleLeftClick = () => {
        if (offset > 0) {
            setOffset((prev) => prev - 1);
        }
    };

    const handleRightClick = () => {
        if (offset < maxOffset) {
            setOffset((prev) => prev + 1);
        }
    };

    const bind = useDrag(({ swipe: [swipeX], down, direction: [dx] }) => {
        if (!down) {
            if (swipeX < 0 || dx < -0.5) {
                handleRightClick();
            } else if (swipeX > 0 || dx > 0.5) {
                handleLeftClick();
            }
        }
    });
    return (
        <section className="block experience section" ref={ref}>
            <h2>Experience</h2>

            <div className="experience__items">
                <button disabled={offset == 0} onClick={handleLeftClick}>
                    <BiLeftArrowAlt />
                </button>
                <div className="experience__items-slider">
                    <div
                        style={{
                            transform: `translateX(-${offset * (100 / slidesPerView)}%)`,
                        }}
                        className="experience__items-content"
                        {...bind()}
                    >
                        {experienceItems.map((info) => (
                            <div
                                className="experience__item-wrapper"
                                key={info.id}

                            >
                                <ExperienceItem {...info} />
                            </div>
                        ))}
                    </div>
                </div>
                <button disabled={offset >= maxOffset} onClick={handleRightClick}>
                    <BiRightArrowAlt />
                </button>
            </div>
        </section>
    );
});

export default Experience;
