import React, { useEffect } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../../components/spinner/Spinner";
import { login } from "../../feature/auth/authSlice";
import { reset } from "../../feature/auth/authSlice";

const Login = () => {
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });
    const { email, password } = credentials;

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isError, isLoading, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    const handleChange = (e) => {
        setCredentials((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    useEffect(() => {
        if (isError) toast.error(message);

        if (isSuccess || user) {
            switch (user) {
                case 400:
                    toast.error("User unknown or incorrect password");
                    break;

                case 404:
                    navigate("/error");
                    break;

                default:
                    navigate("/dashboard");
                    break;
            }
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, dispatch, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = { email, password };
        dispatch(login(userData));
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <main className="main bg-dark">
            <section className="register-content">
                <FontAwesomeIcon icon={faCircleUser} />
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
