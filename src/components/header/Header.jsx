import React from "react";
import { Link } from "react-router-dom";
import ConnectedUser from "../connectedUser/ConnectedUser";
import ProfileIcon from "../profileIcon/ProfileIcon";
import SignOut from "../signOut/SignOut";

/**
 * Component header navigation
 * @returns {ReactElement} Header navigation
 */
const Header = () => {
    const user = true;
    return (
        <nav className="main-nav">
            <Link to="/" className="main-nav-logo">
                <img
                    className="main-nav-logo-image"
                    src="./img/argentBankLogo.png"
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            {!user ? (
                <div>
                    <Link to="sign-in" className="main-nav-item">
                        <ProfileIcon />
                        Sign In
                    </Link>
                </div>
            ) : (
                <div className="main-nav-signout">
                    <Link to="/" className="main-nav-item">
                        <ConnectedUser />
                        <span className="sign-out-label">Tony</span>
                    </Link>
                    <Link to="/" className="main-nav-item">
                        <SignOut />
                        <span className="sign-out-label">Sign Out</span>
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Header;
