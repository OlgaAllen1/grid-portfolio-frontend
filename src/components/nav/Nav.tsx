import { useEffect, useRef, useState } from "react";
import "./Nav.css";
import PropTypes from "prop-types";


function Nav({logo}: {logo: string}) {
    const [opened, setOpened] = useState(false);
    const floatingMenuRef = useRef<HTMLUListElement | null>(null);
    const sandwichMenuRef = useRef<HTMLUListElement | null>(null);
    const sandwichButtonRef = useRef<HTMLButtonElement | null>(null); 

    const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (
            floatingMenuRef.current &&
            !floatingMenuRef.current.contains(target) &&
            sandwichButtonRef.current &&
            !sandwichButtonRef.current.contains(target) 
        ) {
            setOpened(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) {
                setOpened(false);
            }
        }, {
            root: null,
            threshold: 0,
        });

        if (sandwichMenuRef.current) {
            observer.observe(sandwichMenuRef.current);
        }

        return () => {
            if (sandwichMenuRef.current) {
                observer.unobserve(sandwichMenuRef.current);
            }
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            <nav className="menu">
                <div className="menu__logo block">
                    <img src={logo} alt="logo" />
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
                <ul
                    className="menu__links block menu__sandwich section"
                    ref={sandwichMenuRef}
                >
                    <li className="menu__link">
                        <button>About</button>
                    </li>
                    <li>
                        <button
                            ref={sandwichButtonRef} 
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

            <ul
                ref={floatingMenuRef}
                className={`menu__floating block ${opened && "active"}`}
            >
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
Nav.propTypes = {
    logo: PropTypes.string
}
export default Nav;
