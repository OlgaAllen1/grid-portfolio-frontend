import { useEffect, useState } from "react";
import "./Header.css";
import { BiCopy, BiLogoLinkedinSquare, BiCheck } from "react-icons/bi";
import noAvatar from '../../assets/user.png';
import { IMainData } from '../../types'

function Header({ avatar, email, description,  linkedIn, name, position}: IMainData) {
    const [copied, setCopied] = useState(false);
    const copyEmail = () => {
        setCopied(true);
        navigator.clipboard.writeText(email);
    };

    useEffect(() => {
        if (copied) {
            setTimeout(() => {
                setCopied(false);
            }, 2000);
        }
    }, [copied]);

    return (
        <header className="block header section">
            <h2>{position}</h2>
            <h1>{name}</h1>
            <p>
               {description}
            </p>
            <div className="header__buttons">
                <a
                    href={linkedIn}
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
                <img src={avatar || noAvatar} alt="avatar" />
            </div>
        </header>
    );
}


export default Header;
