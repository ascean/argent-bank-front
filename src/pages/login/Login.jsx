import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/spinner/Spinner";
import { login } from "../../redux/auth/authSlice";
import { reset } from "../../redux/auth/authSlice";
import { generateErrorMessage } from "../../utils/toastMessages";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

const Login = () => {

    const [ credentials, setCredentials ] = useState({
        email: "",
        password: "",
    });
    const { email, password } = credentials;

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isError, isLoading, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    
    useEffect(() => {

        if (message || isError) {
            generateErrorMessage(message)
        } else {
            if (isSuccess || user) {
                navigate("/dashboard");
            }
        }
        dispatch(reset());

    }, [ user, isError, isSuccess, message, dispatch, navigate ]);

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
        dispatch(login(userData));
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <main className="main bg-dark">
            <section className="register-content">
                <FontAwesomeIcon icon={ faCircleUser } size={"3x"} />
                <h1>Log In</h1>

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
                        Login
                    </button>
                </form>
            </section>
        </main>
    );
};

export default Login;
