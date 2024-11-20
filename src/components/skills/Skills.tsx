import { FaReact, FaHtml5, FaCss3, FaJs, FaPython } from "react-icons/fa";
import { Scroller, ScrollerItem } from "../scroller/Scroller";
import { SiCplusplus, SiJira } from "react-icons/si";
import { PiFileSql } from "react-icons/pi";

import "./Skills.css";

const Skills = () => {
    return (
        <section className="block section skills">
            <h2>Skills</h2>
            <Scroller>
                <ScrollerItem>
                    <div className="skill">
                        <FaReact />
                        <h2>React</h2>
                    </div>
                </ScrollerItem>
                <ScrollerItem>
                    <div className="skill">
                        <FaHtml5 />
                        <h2>HTML5</h2>
                    </div>
                </ScrollerItem>
                <ScrollerItem>
                    <div className="skill">
                        <FaCss3 />
                        <h2>CSS3</h2>
                    </div>
                </ScrollerItem>
                <ScrollerItem>
                    <div className="skill">
                        <FaJs />
                        <h2>Javascript</h2>
                    </div>
                </ScrollerItem>
                <ScrollerItem>
                    <div className="skill">
                        <FaPython />
                        <h2>Python</h2>
                    </div>
                </ScrollerItem>
                <ScrollerItem>
                    <div className="skill">
                        <SiCplusplus />
                        <h2>C++</h2>
                    </div>
                </ScrollerItem>
                <ScrollerItem>
                    <div className="skill">
                        <PiFileSql />
                        <h2>SQL</h2>
                    </div>
                </ScrollerItem>
                <ScrollerItem>
                    <div className="skill">
                        <SiJira />
                        <h2>Jira</h2>
                    </div>
                </ScrollerItem>
               
            </Scroller>
        </section>
    );
};

export default Skills;
