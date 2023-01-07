import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchProfile, reset } from "../../redux/auth/authSlice";
import { noEdit } from "../../redux/edit/editSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleUser,
    faSignInAlt,
    faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { isValidToken } from "../../utils/tokenControl";
import { useEffect } from "react";

/**
 * Component header navigation
 * @returns {ReactElement} Header navigation
 */
const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { firstName } = useSelector((state) => state.auth.user);
    const editMode = useSelector((state) => state.edit.editMode);

    useEffect(() => {
        if (!isValidToken()) {
            dispatch(reset());
        }
        if (editMode) dispatch(noEdit());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ navigate ]);

    const onLogout = () => {
        localStorage.removeItem("token");
        dispatch(reset());
        dispatch(noEdit());
        navigate("/");
    };

    return (
        <div className="main-nav">
            <div
                type="button"
                className="main-nav-logo"
                onClick={ () => !editMode ? navigate("/") : null } >
                <img className="main-nav-logo-image" src="./img/argentBankLogo.png" alt="Argent Bank Logo" />
                <h1 className="sr-only">Argent Bank</h1>
            </div>

            { firstName && firstName !== "" ? (
                <div className="main-nav-log">
                    {editMode ? (
                        <div className="main-nav-item" disabled style={{ opacity: "0.7" }} >
                            <FontAwesomeIcon icon={faCircleUser} />
                            <span className="sign-label">{firstName}</span>
                        </div>
                    ) : (
                        <div type="button" className="main-nav-item" onClick={() => navigate("/dashboard")} >
                            <FontAwesomeIcon icon={faCircleUser} />
                            <span className="sign-label">{firstName}</span>
                        </div>
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
                        <span className="sign-label">Sign In</span>
                    </Link>
                    <Link to="register" className="main-nav-item">
                        <FontAwesomeIcon icon={faSignInAlt} />
                        <span className="sign-label">Sign Up</span>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Header;
