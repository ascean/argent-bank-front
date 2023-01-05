import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/auth/authSlice";
import { reset } from "../../redux/auth/authSlice";
import { generateErrorMessage } from "../../utils/toastMessages";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { loginAPI } from "../../services/authServices";

const Login = () => {

    const [ credentials, setCredentials ] = useState({
        email: "tony@stark.com",
        password: "password123",
    });
    const { email, password } = credentials;

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { token, error } = useSelector(
        (state) => state.auth
    );
    
    useEffect(() => {
        if (error && error !== 401) generateErrorMessage(error)
        if (token) navigate("/dashboard")
        dispatch(reset());

    }, [ dispatch, navigate, error, token ]);

    const handleChange = (e) => {
        setCredentials((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {

        e.preventDefault();
        const userData = {
            email:email.trim(),
            password:password.trim()
        };

        getUserLogin(userData)
        //dispatch(login(userData));


    };
    const getUserLogin = async (userData) => {
        const data = await loginAPI(userData)
        dispatch(login(data))
    }

    // if (isLoading) {
    //     return <Spinner />;
    // }

    return (
        <main className="main bg-dark">
            <section className="register-content">
                <FontAwesomeIcon icon={ faCircleUser } size={"3x"} />
                <h1>Sign In</h1>

                <form onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <label htmlFor="email">Username</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={email}
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" name="rememberme" />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    <button type="submit" className="log-button">
                        Sign In
                    </button>
                </form>
            </section>
        </main>
    );
};

export default Login;
