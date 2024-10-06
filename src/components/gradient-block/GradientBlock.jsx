import PropTypes from "prop-types";
import clsx from "clsx";
import "./GradientBlock.css";

const GradientBlock = ({ children, className, position="top" }) => {
    return (
        <div className={clsx("block gradient", position, className)}>
            <div className="content">
                {children}
            </div>
        </div>
    );
};

GradientBlock.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    position: PropTypes.oneOf(["top", "bottom"]),
};
export default GradientBlock;
