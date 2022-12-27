import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Account from "../../components/account/Account";
import Spinner from "../../components/spinner/Spinner";
import { isValidToken } from "../../interceptors/authReqInterceptor";
import { reset, updateProfile } from "../../redux/auth/authSlice";
import { fetchProfile } from "../../redux/auth/authSlice";
import { edit, noEdit } from "../../redux/edit/editSlice";

const Dashboard = () => {
    const dispatch = useDispatch();
    const { user, isError, isLoading, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        firstName: "",
        lastName: "",
    });
    const { firstName, lastName } = credentials;

    const [ editUser, setEditUser ] = useState(false);
    
    useEffect(() => {
        isValidToken(localStorage.getItem("token")) ? dispatch(fetchProfile()) : navigate("/login");
    }, [dispatch, navigate]);


    useEffect(() => {
        if (isError) {
            toast.error("Fetch : " + message);
        }
        if (isSuccess || user) {
            switch (user) {
                case 400:
                    toast.error("Invalid fields");
                    break;

                case 401:
                    localStorage.removeItem("token");
                    navigate("/login");
                    break;

                case 500:
                    toast.error("Internal Server Error");
                    break;

                default:
                    setCredentials((prevState) => ({
                        ...prevState,
                        firstName: user.firstName,
                        lastName: user.lastName,
                    }));
                    break;
            }
            // }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, isSuccess, isError, message, dispatch, navigate]);

    //EDIT NAME : CLIC ON EDIT NAME BUTTON
    const handleEdit = () => {
        if (isValidToken(localStorage.getItem("token"))) {
            setEditUser(!editUser);
            dispatch(edit());
        } else {
            navigate("/login");
        }
    };

    //EDIT NAME : Change fields content
    const handleChange = (e) => {
        if (isValidToken(localStorage.getItem("token"))) {
            setCredentials((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
            }));
        } else {
            navigate("login");
        }
    };

    //EDIT NAME : CLIC ON SAVE BUTTON
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!!firstName && !!lastName) {
            const userData = { firstName, lastName };
            dispatch(updateProfile(userData));

            if (isError) {
                toast.error("Update : " + message);
            }
            if (isSuccess || user) {
                switch (user) {
                    case 400:
                        toast.error("Invalid fields");
                        break;

                    case 401:
                        localStorage.removeItem("token");
                        dispatch(reset())
                        navigate("/login");
                        break;

                    case 500:
                        toast.error("Internal Server Error");
                        break;

                    default:
                        setEditUser(false);
                        dispatch(noEdit());
                        break;
                }
            }
        }
    };

    // EDIT NAME : CLIC ON CANCEL BUTTON
    const resetFields = () => {
        if (!isValidToken(localStorage.getItem("token"))) {
            navigate("/login");
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

    if (isLoading) {
        return <Spinner />;
    }

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
