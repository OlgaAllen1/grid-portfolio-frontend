import { useEffect, useState } from "react";
import avatarImg from "../../assets/avatar.jpg";
import "./Header.css";
import { BiCopy, BiLogoLinkedinSquare, BiCheck } from "react-icons/bi";

function Header() {
    const [copied, setCopied] = useState(false);
    const copyEmail = () => {
        setCopied(true);
        navigator.clipboard.writeText("olyaallen@gmail.com");
    };

    useEffect(() => {
        if (copied) {
            setTimeout(() => {
                setCopied(false);
            }, 2000);
        }
    }, [copied]);

    return (
        <header className="block header">
            <h2>Technical Business Analyst</h2>
            <h1>Olga Allen</h1>
            <p>
                with wide experience in multiple stages of software life
                development life cycle
            </p>
            <div className="header__buttons">
                <a
                    href="https://www.linkedin.com/in/olga-allen-mba/"
                    target="_blank"
                >
                    <button className="linkedIn">
                        <BiLogoLinkedinSquare />
                    </button>
                </a>
                <button className="copy-email" onClick={copyEmail}>
                    <span className="copy-email__text">Copy email</span>{" "}
                    <span className="copy-email__icon">
                        {copied ? <BiCheck /> : <BiCopy />}
                    </span>
                </button>
            </div>
            <div className="header__avatar">
                <img src={avatarImg} alt="avatar" />
            </div>
        </header>
    );
}
export default Header;
