import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Account from "../../components/account/Account";
import Spinner from "../../components/spinner/Spinner";
import { isValidToken } from "../../utils/tokenControl";
import { reset, updateProfile } from "../../redux/auth/authSlice";
import { fetchProfile } from "../../redux/auth/authSlice";
import { edit, noEdit } from "../../redux/edit/editSlice";
import {
    generateErrorMessage,
    generateWarningMessage,
} from "../../utils/toastMessages";

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isError, isLoading, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    const [credentials, setCredentials] = useState({
        firstName: "",
        lastName: "",
    });
    const [editUser, setEditUser] = useState(false);
    const { firstName, lastName } = credentials;

    //control token validity expiration date
    useEffect(() => {
        if (isValidToken(localStorage.getItem("token"))) {
            dispatch(fetchProfile());
        } else {
            navigate("/login");
        }
    }, [dispatch, navigate]);

    useEffect(() => {
        //token invalid
        if (message || isError) {
            generateErrorMessage(message);
            if (message === 401) {
                navigate("/login");
                dispatch(reset());
            }
            return;
        }
        //token valid
        if (isSuccess || user) {
            setCredentials((prevState) => ({
                ...prevState,
                firstName: user.firstName,
                lastName: user.lastName,
            }));
        }
    }, [user, isError, isSuccess, message, dispatch, navigate]);

    
    //EDIT NAME : CLIC ON EDIT NAME BUTTON
    const handleEdit = () => {
        if (!isValidToken(localStorage.getItem("token"))) {
            goToLogin();
            return;
        }
        setEditUser(!editUser);
        dispatch(edit());
    };

    //EDIT NAME : Change fields content
    const handleChange = (e) => {
        if (!isValidToken(localStorage.getItem("token"))) {
            goToLogin();
            return;
        }
        setCredentials((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    //EDIT NAME : CLIC ON SAVE BUTTON
    const handleSubmit = (e) => {
        e.preventDefault();

        //token expiration date invalid
        if (!isValidToken(localStorage.getItem("token"))) {
            goToLogin();
            return;
        }

        if (!!firstName && !!lastName) {
            const userData = { firstName, lastName };
            dispatch(updateProfile(userData));
            
            if (message || isError) {
                generateErrorMessage(message);
                if (message === 401) navigate("/login");
                return;
            }
            if (isSuccess || user) {
                setEditUser(false);
                dispatch(noEdit());
                
                setCredentials((prevState) => ({
                    ...prevState,
                    firstName: user.firstName,
                    lastName: user.lastName,
                }));
            }
        }
    };

    // EDIT NAME : CLIC ON CANCEL BUTTON
    const resetFields = () => {
        if (!isValidToken(localStorage.getItem("token"))) {
            goToLogin();
            return;
        }
        document.getElementById("firstName").value = "";
        document.getElementById("lastName").value = "";
        setCredentials((prevState) => ({
            ...prevState,
            firstName: user.firstName,
            lastName: user.lastName,
        }));
        setEditUser(false);
        dispatch(noEdit());
    };

    const goToLogin = () => {
        generateWarningMessage("Session expired. Please log in");
        dispatch(noEdit());
        navigate("/login");
    };
    
    if (isLoading) return <Spinner />
    
    return (
        <main className={!editUser ? "main bg-dark" : "main bg-light"}>
            <div className="header">
                {!editUser ? (
                    <h1>
                        {" "}
                        Welcome back <br /> {firstName} {lastName}
                    </h1>
                ) : (
                    <h1 style={{ color: "black" }}>Welcome back</h1>
                )}
                <button
                    className={editUser ? "edit-button d-none" : "edit-button"}
                    onClick={handleEdit}
                >
                    Edit Name
                </button>

                <form
                    onSubmit={handleSubmit}
                    id="formUpdateUser"
                    className={!editUser ? "d-none" : ""}
                >
                    <div className="user-infos">
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            placeholder={firstName}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            placeholder={lastName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-btn">
                        <input
                            type="submit"
                            value="Save"
                            onClick={handleSubmit}
                        />
                        <input
                            type="button"
                            value="Cancel"
                            onClick={resetFields}
                        />
                    </div>
                </form>
            </div>

            <h2 className="sr-only">Transactions</h2>
            <Account
                title={"Argent Bank Checking (x8349)"}
                amount={"$2,082.79"}
                description={"Available Balance"}
                editMode={editUser}
            />
            <Account
                title={"Argent Bank Savings (x6712)"}
                amount={"$10,928.42"}
                description={"Available Balance"}
                editMode={editUser}
            />
            <Account
                title={"Argent Bank Credit Card (x8349)"}
                amount={"$184.30"}
                description={"Current Balance"}
                editMode={editUser}
            />
        </main>
    );
};

export default Dashboard;
