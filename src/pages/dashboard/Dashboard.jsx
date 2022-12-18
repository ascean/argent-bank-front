import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Account from "../../components/account/Account";
import Spinner from "../../components/spinner/Spinner";
import { isValidToken } from "../../feature/auth/authServices";
import { updateProfile } from "../../feature/auth/authSlice";
import { fetchProfile } from "../../feature/auth/authSlice";
import { status, resetStatus } from "../../feature/edit/editSlice";

const Dashboard = () => {
    
    const dispatch = useDispatch()
    const { user, isError, isLoading, isSuccess, message, token } = useSelector(
        (state) => state.auth
    );

    const { editMode } = useSelector((state) => state.edit) 
    
    const navigate = useNavigate()
    
    const [ credentials, setCredentials ] = useState({
        firstName: "",
        lastName: "",
    });
    const { firstName, lastName } = credentials;

    const [ editUser, setEditUser ] = useState(false);
    
    useEffect(() => {
        //tests : token does not exist or token not invalid
        if (!window.localStorage.getItem("token") || (!isValidToken(window.localStorage.getItem("token")))) {
            navigate("/login")        
        } else {
            
            dispatch(fetchProfile())
            if (isError) {
                toast.error("Fetch : "+message);
            }
            if (isSuccess || user) {
                setCredentials((prevState) => ({
                    ...prevState,
                    firstName: user.firstName,
                    lastName: user.lastName
                }))
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ isSuccess, isError, message, dispatch, navigate ])
    
    const handleEdit = () => {
        setEditUser(!editUser)
        dispatch(status())
    }

    const handleChange = (e) => {
        setCredentials((prevState) => ({
            ...prevState,
            [ e.target.name ]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!!firstName && !!lastName) {
            
            const userData = { firstName, lastName }
            dispatch(updateProfile(userData))
            
            if (isError) {
                toast.error("Update : "+message);
            }
            if (isSuccess || user) {
                setEditUser(false)
                dispatch(resetStatus())
            }
        }
    }
    
    
    if (isLoading) {
        return <Spinner />;
    }

    const resetFields = () => {
        setEditUser(false)
        dispatch(resetStatus())
    }

    return (
        <main className={ !editUser ? "main bg-dark" : "main bg-light" }>
            <div className="header">
                { !editUser ? (
                    <h1> Welcome back <br /> { firstName }{ " " }{ lastName }</h1>
                ) : (
                    <h1 style={ { color: "black" } }>Welcome back</h1>
                ) }
                <button
                    className={ editUser ? "edit-button d-none" : "edit-button" }
                    onClick={handleEdit}
                >
                    Edit Name
                </button>
                
                <form onSubmit={ handleSubmit } id="formUpdateUser" className={ !editUser ? "d-none" : "" } >
                    <div className="user-infos">
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            //value={firstName}
                            // ref={firstNameRef}
                            placeholder={ firstName }
                            onChange={ handleChange }
                        />
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            //value={ lastName }
                            // ref={lastNameRef}
                            placeholder={ lastName }
                            onChange={ handleChange }
                        />
                    </div>
                    <div className="form-btn">
                        <input
                            type="submit"
                            value="Save"
                            onClick={ handleSubmit }
                        />
                        <input
                            type="button"
                            value="Cancel"
                            onClick={ resetFields }
                        />
                    </div>
                </form>
            </div>
            <h2 className="sr-only">Accounts</h2>
            <Account
                title={ "Argent Bank Checking (x8349)" }
                amount={ "$2,082.79" }
                description={ "Available Balance" }
                editMode={ editUser }
            />
            <Account
                title={ "Argent Bank Savings (x6712)" }
                amount={ "$10,928.42" }
                description={ "Available Balance" }
                editMode={ editUser }
            />
            <Account
                title={ "Argent Bank Credit Card (x8349)" }
                amount={ "$184.30" }
                description={ "Current Balance" }
                editMode={ editUser }
            />
        </main>
    );
}

export default Dashboard;
