import GradientBlock from "../gradient-block/GradientBlock";
import "./Footer.css";

const socials = [
    {
        id: 0,
        title: "Github",
        link: "https://github.com/OlgaAllen1",
    },
    {
        id: 1,
        title: "LinkedIn",
        link: "https://www.linkedin.com/in/olga-allen-mba/",
    },
];

const Footer = () => {
    return (
        <GradientBlock className="footer" position="bottom">
            <div className="footer__content">
                <img src="" alt="Logo" />
                <ul className="footer__socials">
                    {socials.map(({ id, title, link }) => (
                        <li key={id}>
                            <a href={link} target="_blank">{title}</a>
                        </li>
                    ))}
                </ul>
                <p>
                    &copy; 2024
                </p>
            </div>
        </GradientBlock>
    );
};

export default Footer;
