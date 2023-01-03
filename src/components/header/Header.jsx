import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, reset } from "../../redux/auth/authSlice";
import { noEdit } from "../../redux/edit/editSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleUser,
    faSignInAlt,
    faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

/**
 * Component header navigation
 * @returns {ReactElement} Header navigation
 */
const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const editMode = useSelector((state) => state.edit.editMode);

    const gotToHome = () => {
        if (editMode) {
            dispatch(noEdit())
            navigate("/")
        }
    }

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        dispatch(noEdit());
        navigate("/");
    };

    return (
        <div className="main-nav">
            {editMode ? (
                <div type="button" className="main-nav-logo" onClick={() => gotToHome()}>
                    <img
                        className="main-nav-logo-image"
                        src="./img/argentBankLogo.png"
                        alt="Argent Bank Logo"
                    />
                    <h1 className="sr-only">Argent Bank</h1>
                </div>
            ) : (
                <Link to="/" className="main-nav-logo">
                    <img
                        className="main-nav-logo-image"
                        src="./img/argentBankLogo.png"
                        alt="Argent Bank Logo"
                    />
                    <h1 className="sr-only">Argent Bank</h1>
                </Link>
            )}

            {user ? (
                <div className="main-nav-log">
                    {editMode ? (
                        <div
                            className="main-nav-item"
                            disabled
                            style={{ opacity: "0.7" }}
                        >
                            <FontAwesomeIcon icon={faCircleUser} />
                            <span className="sign-label">{user.firstName}</span>
                        </div>
                    ) : (
                        <Link to="/dashboard" className="main-nav-item">
                            <FontAwesomeIcon icon={faCircleUser} />
                            <span className="sign-label">{user.firstName}</span>
                        </Link>
                    )}
                    <Link to="/" className="main-nav-item" onClick={onLogout}>
                        <FontAwesomeIcon icon={faSignOutAlt} />
                        <span className="sign-label">Sign Out</span>
                    </Link>
                </div>
            ) : (
                <div className="main-nav-log">
                    <Link to="login" className="main-nav-item">
                        <FontAwesomeIcon icon={faCircleUser} />
                        <span className="sign-label">Log In</span>
                    </Link>
                    <Link to="register" className="main-nav-item">
                        <FontAwesomeIcon icon={faSignInAlt} />
                        <span className="sign-label">Register</span>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Header;
