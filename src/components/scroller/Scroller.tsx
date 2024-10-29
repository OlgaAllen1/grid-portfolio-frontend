import "./Scroller.css";
import clsx from "clsx";
import { Children, cloneElement, isValidElement, useEffect, useRef } from "react";

const Scroller = ({ children, direction, speed }: {
    children: React.ReactNode,
    direction?: "right" | "left",
    speed?: "slow" | "fast" | "faster"
}) => {
    const scrollerRef = useRef<HTMLDivElement | null> (null);

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
            return cloneElement(child);
        }
        return child;
    });

    return (
        <div
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

const ScrollerItem = ({ children }: {children: React.ReactNode}) => {
    return <div className={"scroller__item"}>{children}</div>;
};

export { Scroller, ScrollerItem };
