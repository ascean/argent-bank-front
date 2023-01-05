import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Account from "../../components/account/Account";
import { isValidToken } from "../../utils/tokenControl";
import { reset } from "../../redux/auth/authSlice";
import { fetchProfile } from "../../redux/auth/authSlice";
import { edit, noEdit } from "../../redux/edit/editSlice";
import { generateWarningMessage } from "../../utils/toastMessages";
import { fetchProfileAPI, updateProfileAPI } from "../../services/authServices";

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token, error, user } = useSelector((state) => state.auth);

    const [credentials, setCredentials] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
    });
    const [editUser, setEditUser] = useState(false);

    useEffect(() => {
        if (error === 401) dispatch(reset());

        if (error) return;

        setCredentials((prevState) => ({
            ...prevState,
            firstName: user.firstName,
            lastName: user.lastName,
        }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error, dispatch]);

    //control token validity expiration date
    useEffect(() => {
        const token = isValidToken();

        if (!token) {
            navigate("/login");
            return;
        }

        getUserProfile(token);
        setCredentials((prevState) => ({
            ...prevState,
            firstName: user.firstName,
            lastName: user.lastName,
        }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, navigate]);

    /**
     * Update database profile + state
     * @param {Object} credentials
     * @param {string} credentials.firstName new first name
     * @param {string} credentials.lastName new last name
     */
    const updateProfile = async (credentials) => {
        const data = await updateProfileAPI(credentials);
        dispatch(updateProfile(data));
    };

    /**
     * Get database profile user + update state
     */
    const getUserProfile = async () => {
        const data = await fetchProfileAPI();
        dispatch(fetchProfile(data));
    };

    //EDIT NAME FORM
    //Clic on EDIT NAME button
    const handleEdit = () => {
        if (!isValidToken()) {
            goToLogin();
            return;
        }
        setEditUser(!editUser);
        dispatch(edit());
    };

    //Change fields content
    const handleChange = (e) => {
        if (!isValidToken()) {
            goToLogin();
            return;
        }
        setCredentials((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    //Clic on SAVE name button
    const handleSubmit = (e) => {
        e.preventDefault();

        //token expiration date invalid
        if (!isValidToken()) {
            goToLogin();
            return;
        }

        //missing datas
        if (credentials.firstName === "" && credentials.lastName === "") {
            generateWarningMessage(
                "You have to type first name and/or last name"
            );
            return;
        }

        //complete empty field with original content
        // prettier-ignore
        if (credentials.firstName === "") {
            setCredentials((prevState) => ({...prevState, firstName: user.firstName }));
        }
        // prettier-ignore
        if (credentials.lastName === "") {
            setCredentials((prevState) => ({ ...prevState, lastName: user.lastName }));
        }

        updateProfile(credentials);
        setEditUser(false);
        dispatch(noEdit());
        document.getElementById("firstName").value = "";
        document.getElementById("lastName").value = "";
    };

    //Clic on CANCEL name button
    const handleCancel = () => {
        if (!isValidToken()) {
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
        dispatch(reset());
        navigate("/login");
    };

    return (
        <main className={!editUser ? "main bg-dark" : "main bg-light"}>
            <div className="header">
                {!editUser ? (
                    <h1>
                        {" "}
                        Welcome back <br /> {credentials.firstName}{" "}
                        {credentials.lastName}
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
                            placeholder={credentials.firstName}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            placeholder={credentials.lastName}
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
                            onClick={handleCancel}
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
