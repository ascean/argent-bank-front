import React from "react";
import { NavLink } from "react-router-dom";

/**
 * Render page when URL unknown
 * @returns {ReactElement}
 */
const Error = () => {
    return (
        <div className="error">
            <div>
                <h1>404</h1>
                <h2>Oups ! This page does not exist.</h2>
            </div>
            <NavLink to="/">Back to home page</NavLink>
        </div>
    );
};

export default Error;
