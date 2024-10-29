import PropTypes from "prop-types";
import clsx from "clsx";
import "./GradientBlock.css";

const GradientBlock = ({ children, className, position="top" }: {children: React.ReactNode, className?: string, position: "top" | "bottom"}) => {
    return (
        <div className={clsx("block gradient", position, className)}>
            <div className="content section">
                {children}
            </div>
        </div>
    );
};


export default GradientBlock;
