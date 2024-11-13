import { Link } from "react-router-dom";

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

const Footer = ({ logo }: {logo: string}) => {
    return (
        <GradientBlock className="footer" position="bottom">
            <div className="footer__content">
                <div className="footer__logo">
                    <img src={logo} alt="Logo" />
                </div>
                <ul className="footer__socials">
                    {socials.map(({ id, title, link }) => (
                        <li key={id}>
                            <a href={link} target="_blank">
                                {title}
                            </a>
                        </li>
                    ))}
                    <li>
                        <Link to="/admin">Admin</Link>
                    </li>
                </ul>
                <p className="footer__copyright">&copy; 2024</p>
            </div>
        </GradientBlock>
    );
};


export default Footer;
