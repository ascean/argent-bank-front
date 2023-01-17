import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/auth/authSlice";
import { reset } from "../../redux/auth/authSlice";
import { generateErrorMessage } from "../../utils/toastMessages";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { loginAPI } from "../../services/authServices";
import { toast } from "react-toastify";

const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-F0-9._-]+\.[a-zA-Z]{2,6}$/;

const Login = () => {
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });
    const { email, password } = credentials;
    const [validEmail, setValidEmail] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { token, error } = useSelector((state) => state.auth);

    const emailRef = useRef();
    const passwordRef = useRef();

    useEffect(() => {
        //check email
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
    }, [email]);

    useEffect(() => {
        if (error && error !== 401) generateErrorMessage(error);
        if (token) navigate("/dashboard");
        dispatch(reset());
    }, [dispatch, navigate, error, token]);

    const handleChange = (e) => {
        setCredentials((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !validEmail) {
            toast.error("Please enter a valid email address", { autoClose: 2000 })
            emailRef.current.focus();
            return
        }
        if (!password) {
            toast.error("Please enter your password", { autoClose: 2000 })
            passwordRef.current.focus();
            return
        }
        const userData = {
            email: email.trim(),
            password: password.trim(),
        };

        getUserLogin(userData);
        //dispatch(login(userData));
    };
    const getUserLogin = async (userData) => {
        const data = await loginAPI(userData);
        dispatch(login(data));
    };

    return (
        <main className="main bg-dark">
            <section className="register-content">
                <FontAwesomeIcon icon={faCircleUser} size={"3x"} />
                <h1>Sign In</h1>

                <form onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <label htmlFor="email">Username</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={email}
                            ref={emailRef}
                            aria-invalid={validEmail ? "false" : "true"}
                            aria-describedby="emailmsg"
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
                            ref={passwordRef}
                            aria-invalid={password ? "false" : "true"}
                            aria-describedby="passwordmsg"
                            onChange={handleChange}
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
