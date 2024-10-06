import "./Scroller.css";
import clsx from "clsx";
import { Children, cloneElement, isValidElement, useEffect, useRef } from "react";

const Scroller = ({ children, direction, speed, className, variant, id }) => {
    const scrollerRef = useRef (null);

    function addAnimation() {
        if (scrollerRef.current) {
            scrollerRef.current.setAttribute("data-animated", "true");
        }
    }

    useEffect(() => {
        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            addAnimation();
        }
    }, []);

    const childrenWithProps = Children.map(children, (child) => {
        if (isValidElement(child)) {
            return cloneElement(child, { variant });
        }
        return child;
    });

    return (
        <div
            id={id}
            ref={scrollerRef}
            className={"scroller"}
            data-direction={direction}
            data-speed={speed}
        >
            <div className="scroller__inner">
                {childrenWithProps}
                {childrenWithProps}
                {childrenWithProps}
                {childrenWithProps}
            </div>
        </div>
    );
};

const ScrollerItem = ({ children }) => {
    return <div className={"scroller__item"}>{children}</div>;
};

export { Scroller, ScrollerItem };
