import { useData } from "../../contexts/useData";
import GradientBlock from "../gradient-block/GradientBlock";
import "./About.css";

const About = () => {
    const { aboutData } = useData();
    return (
        <GradientBlock position="top" className="about">
            <section>
                <p>{aboutData.about}</p>
            </section>
        </GradientBlock>
    );
};

export default About;
