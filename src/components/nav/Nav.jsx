import { useState } from "react";
import "./Nav.css";

function Nav() {
    const [opened, setOpened] = useState(false);
    return (
        <>
            <nav className="menu">
                <div className="menu__logo block">
                    <img src={""} alt="logo" />
                </div>
                <ul className="menu__links block">
                    <li className="menu__link">
                        <button>About</button>
                    </li>
                    <li className="menu__link active">
                        <button>Education</button>
                    </li>
                    <li className="menu__link">
                        <button>Experience</button>
                    </li>
                    <li className="menu__link">
                        <button>Portfolio</button>
                    </li>
                </ul>
                <ul className="menu__links block menu__sandwich">
                    <li className="menu__link">
                        <button>About</button>
                    </li>
                    <li>
                        <button
                            onClick={() => setOpened((old) => !old)}
                            className={`sandwich ${opened && "active"}`}
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </li>
                </ul>
            </nav>

            <ul className={`menu__floating block ${opened && "active"}`}>
                <li className="menu__link active">
                    <button>Education</button>
                </li>
                <li className="menu__link">
                    <button>Experience</button>
                </li>
                <li className="menu__link">
                    <button>Portfolio</button>
                </li>
            </ul>
        </>
    );
}

export default Nav;
