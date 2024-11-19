import { ForwardedRef, forwardRef } from "react";
import { useData } from "../../contexts/useData";
import GradientBlock from "../gradient-block/GradientBlock";
import "./About.css";

const About = forwardRef((_, ref: ForwardedRef<HTMLElement>) => {
    const { aboutData } = useData();
    return (
        <GradientBlock position="top" className="about section">
            <section ref={ref}>
                <h2>About</h2>
                <p>{aboutData.about}</p>
            </section>
        </GradientBlock>
    );
});

export default About;
