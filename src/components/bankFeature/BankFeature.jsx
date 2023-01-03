import React from "react";

/**
 * Bank Feature Component on Home page
 * @param {String} icon picture path
 * @param {String} alt img alt attribute
 * @param {String} title feature title
 * @param {String} description feature description
 * @returns {ReactElement} feature
 */
const Feature = ({ icon, alt, title, description }) => {

    return (
        <div className="feature-item">
            <img src={ icon } alt={ alt } className="feature-icon" />
            <h3 className="feature-item-title">{ title }</h3>
            <p>{ description }</p>
        </div>
    );
};

export default Feature;