import { useEffect, useRef, useState } from "react";
import "./Nav.css";
import PropTypes from "prop-types";
import { RefsMap } from "../../types";
import clsx from "clsx";

const NavItem = ({
    sectionName,
    handleScrollTo,
}: {
    sectionName: string;
    handleScrollTo: (sectionName: string) => void;
}) => {
    return (
        <li className={clsx("menu__link")}>
            <button onClick={() => handleScrollTo(sectionName.toLowerCase())}>
                {sectionName}
            </button>
        </li>
    );
};

const Nav = ({ logo, refs }: { logo: string; refs: RefsMap }) => {
    const [opened, setOpened] = useState(false);
    const floatingMenuRef = useRef<HTMLUListElement | null>(null);
    const sandwichMenuRef = useRef<HTMLUListElement | null>(null);
    const sandwichButtonRef = useRef<HTMLButtonElement | null>(null);

    const handleScrollTo = (sectionName: string) => {
        const element = refs[sectionName]?.current;
        if (element) {
            const offset = -50;
            const elementPosition =
                element.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: elementPosition + offset,
                behavior: "smooth",
            });
        }
    };

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

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) {
                    setOpened(false);
                }
            },
            {
                root: null,
                threshold: 0,
            }
        );

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
                    <NavItem
                        sectionName="About"
                        handleScrollTo={handleScrollTo}
                    />
                    <NavItem
                        sectionName="Education"
                        handleScrollTo={handleScrollTo}
                    />
                    <NavItem
                        sectionName="Experience"
                        handleScrollTo={handleScrollTo}
                    />
                </ul>
                <ul
                    className="menu__links block menu__sandwich section"
                    ref={sandwichMenuRef}
                >
                    <NavItem
                        sectionName="About"
                        handleScrollTo={handleScrollTo}
                    />

                    <li>
                        <button
                            ref={sandwichButtonRef}
                            onClick={() => setOpened((old) => !old)}
                            className={clsx("sandwich", opened && "active")}
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
                <NavItem
                    sectionName="Education"
                    handleScrollTo={handleScrollTo}
                />
                <NavItem
                    sectionName="Experience"
                    handleScrollTo={handleScrollTo}
                />
            </ul>
        </>
    );
};
Nav.propTypes = {
    logo: PropTypes.string,
};
export default Nav;
