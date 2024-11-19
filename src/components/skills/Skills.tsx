import { FaReact, FaHtml5, FaCss3, FaJs, FaPython } from "react-icons/fa";
import { Scroller, ScrollerItem } from "../scroller/Scroller";

const Skills = () => {
    return (
        <section className="block section skills" >
            <h2>Skills</h2>
            <Scroller>
                <ScrollerItem>
                    <FaReact />
                </ScrollerItem>
                <ScrollerItem>
                    <FaHtml5 />
                </ScrollerItem>
                <ScrollerItem>
                    <FaCss3 />
                </ScrollerItem>
                <ScrollerItem>
                    <FaJs />
                </ScrollerItem>
                <ScrollerItem>
                    <FaPython />
                </ScrollerItem>
            </Scroller>
        </section>
    );
};

export default Skills;
