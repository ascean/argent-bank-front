import React from "react";

/**
 * Bank Feature Component on Home page
 * @param {String} icon picture path
 * @param {String} alt img alt attribute
 * @param {String} title
 * @param {String} content 
 * @returns {ReactElement} feature
 */
const Feature = ({ icon, alt, title, content }) => {

    return (
        <div className="feature-item">
            <img src={ icon } alt={ alt } className="feature-icon" />
            <h3 className="feature-item-title">{ title }</h3>
            <p>{ content }</p>
        </div>
    );
};

export default Feature;