import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * Render page when URL unknown
 * @returns {ReactElement}
 */
const Error = () => {
    return (
        <div className='error'>
            <div>
                <h1>404</h1>
                <h2>Oups ! La page que vous demandez n'existe pas.</h2>
            </div>
            <NavLink to="/">
                    Retourner sur la page d'accueil
            </NavLink>
        </div>
    );
};

export default Error;