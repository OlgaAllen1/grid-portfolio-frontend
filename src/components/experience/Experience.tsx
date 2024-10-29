import "./Experience.css";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import PropTypes from "prop-types";
import { useDrag } from "@use-gesture/react";

import { useState } from "react";
const experienceItems = [
    {
        id: 0,
        position: "Fullstack Developer",
        company: {
            name: "Example Co.",
            image: "#",
        },
        description: [
            "Developing and maintaining web applications using React.js and other related technologies.",
            "Often developing under strict time constraints, always delivering the finished project.",
            "Implementing responsive design and ensuring cross-browser compatibility.",
            "Participating in code reviews and providing constructive feedback to other developers.",
        ],
    },
    {
        id: 1,
        position: "Fullstack Developer",
        company: {
            name: "Example Co.",
            image: "#",
        },
        description: [
            "Developing and maintaining web applications using React.js and other related technologies.",
            "Often developing under strict time constraints, always delivering the finished project.",
            "Implementing responsive design and ensuring cross-browser compatibility.",
            "Participating in code reviews and providing constructive feedback to other developers.",
        ],
    },
    {
        id: 2,
        position: "Fullstack Developer",
        company: {
            name: "Example Co.",
            image: "#",
        },
        description: [
            "Developing and maintaining web applications using React.js and other related technologies.",
            "Often developing under strict time constraints, always delivering the finished project.",
            "Implementing responsive design and ensuring cross-browser compatibility.",
            "Participating in code reviews and providing constructive feedback to other developers.",
        ],
    },
    {
        id: 3,
        position: "Fullstack Developer",
        company: {
            name: "Example Co.",
            image: "#",
        },
        description: [
            "Developing and maintaining web applications using React.js and other related technologies.",
            "Often developing under strict time constraints, always delivering the finished project.",
            "Implementing responsive design and ensuring cross-browser compatibility.",
            "Participating in code reviews and providing constructive feedback to other developers.",
        ],
    },
];

const ExperienceItem = ({
    company: { image, name: companyName },
    description,
    position,
}) => {
    return (
        <div className="experience__item block">
            <div className="experience__item-header">
                <h2>{position}</h2>
                <h3>{companyName}</h3>
            </div>
            <img src={image} alt={companyName} />
            <ul className="experience__item-list">
                {description.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
};

ExperienceItem.propTypes = {
    company: PropTypes.shape({
        image: PropTypes.string,
        name: PropTypes.string,
    }),
    description: PropTypes.arrayOf(PropTypes.string),
    position: PropTypes.string,
};

const Experience = () => {
    const [offset, setOffset] = useState(0);
    const handleLeftClick = () => {
        if (offset > 0) {
            setOffset((prev) => prev - 1);
        }
    };
    const handleRightClick = () => {
        if (offset < experienceItems.length - 1) {
            setOffset((prev) => prev + 1);
        }
    };

    const bind = useDrag(
        ({ swipe: [swipeX], down, direction: [dx] }) => {
          if (!down) {
            if (swipeX < 0 || dx < -0.5) {
                handleRightClick();
            } else if (swipeX > 0 || dx > 0.5) {
                handleLeftClick();
            }
          }
        }
      );
    return (
        <section className="block experience section">
            <h2>Experience</h2>

            <div className="experience__items" >
                <button disabled={offset == 0} onClick={handleLeftClick}>
                    <BiLeftArrowAlt />
                </button>
                <div className="experience__items-content" {...bind()}>
                    {experienceItems.map((info, index) => (
                        <div
                            style={{
                                transform: `translateX(${
                                    (index - offset) * 100
                                }%)`,
                            }}
                            className="experience__item-wrapper"
                            key={info.id}
                        >
                            <ExperienceItem {...info} />
                        </div>
                    ))}
                </div>
                <button
                    disabled={offset == experienceItems.length - 1}
                    onClick={handleRightClick}
                >
                    <BiRightArrowAlt />
                </button>
            </div>
        </section>
    );
};

export default Experience;
