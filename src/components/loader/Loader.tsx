import React from "react";
import { BiLoaderCircle } from "react-icons/bi";
import "./Loader.css";

const Loader = () => {
    return (
        <div className="loader">
            <div className="loader__content">
				<BiLoaderCircle  className="loader__icon"/>
            </div>
        </div>
    );
};

export default Loader;
