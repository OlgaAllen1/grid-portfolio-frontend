import React from "react";
import "./CustomError.css";
import { BiError } from "react-icons/bi";
import { Link } from "react-router-dom";

const CustomError = () => {
    return (
        <div className="error">
            <div className="error__content">
                <BiError className="error__icon" />
                <p>Something went wrong!</p>
                <Link to={"/"}>
                    <button className="form-link">Go back Home</button>
                </Link>
            </div>
        </div>
    );
};

export default CustomError;
