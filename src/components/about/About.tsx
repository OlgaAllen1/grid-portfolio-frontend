import GradientBlock from "../gradient-block/GradientBlock";
import "./About.css";

const about = [
    {
        id: 0,
        content: `Technical Business Analyst with wide experience in multiple stages of software life development life cycle. Experience in scoping
projects, requirements elicitation, Jira management, conducting user acceptance testing, and submitting change requests for
production (4 years of experience). Significant experience in Project Management and Implementation of software projects. Over
3 years of manual testing and conducting User Acceptance Tests with clients. Advanced Scrum Master Certified, 1.5 years of
experience as a Scrum Master on the team.`,
    }
   
];

const About = () => {
    return (
        <GradientBlock className="about">
            <section>
                {about.map(({ id, content }) => (
                    <p key={id}>{content}</p>
                ))}
            </section>
        </GradientBlock>
    );
};

export default About;
