import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCheck,
    faCircleUser,
    faInfoCircle,
    faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { register, reset } from "../../redux/auth/authSlice";
import Spinner from "../../components/spinner/Spinner";

const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-F0-9._-]+\.[a-zA-Z]{2,6}$/;
const NAME_REGEX = /^[a-zàâäãçéèêëìïîòôöõùûüñ'-]{2,23}$/i;
const PWD_REGEX = /^[A-z0-9!@#$%]{6,23}$/;

const Register = () => {
    const [credentials, setCredentials] = useState({
        email: "titi@titi.fr",
        password: "111111",
        passwordConfirm: "111111",
        firstName: "pppp",
        lastName: "pppp",
    });

    const { email, password, passwordConfirm, firstName, lastName } =
        credentials;

    const [validEmail, setValidEmail] = useState(false);
    const [validPassword, setValidPassword] = useState(false);
    const [validMatch, setValidMatch] = useState(false);
    const [validFirstName, setValidFirstName] = useState(false);
    const [validLastName, setValidLastName] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isError, isLoading, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();

    useEffect(() => {
        //check email
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
    }, [email]);

    useEffect(() => {
        //check password format and match passwords
        setValidPassword(PWD_REGEX.test(password));
        const match = password === passwordConfirm;
        setValidMatch(match);
    }, [password, passwordConfirm]);

    useEffect(() => {
        //check firstName
        const result = NAME_REGEX.test(firstName);
        setValidFirstName(result);
    }, [firstName]);

    useEffect(() => {
        //check lastName
        const result = NAME_REGEX.test(lastName);
        setValidLastName(result);
    }, [lastName]);

    useEffect(() => {
        if (isError) toast.error(message);

        if (isSuccess || user) {
            switch (user) {
                case 400:
                    toast.error("User already exists");
                    break;

                case 500:
                    toast.error("Internal Server Error");
                    break;

                default:
                    navigate("/login");
                    break;
            }
        }
        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const handleChange = (e) => {
        setCredentials((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validEmail) {
            console.log("ok");
            emailRef.current.focus();
            return;
        }
        if (!validPassword) {
            passwordRef.current.focus();
            return;
        }
        if (!validMatch) {
            passwordConfirmRef.current.focus();
            return;
        }
        if (!validFirstName) {
            firstNameRef.focus();
            return;
        }
        if (!validLastName) {
            lastNameRef.current.focus();
            return;
        }

        if (password !== passwordConfirm) {
            toast.error("Passwords do not match");
        } else {
            dispatch(register({email, password, firstName, lastName},));
        }
    };
    if (isLoading) {
        return <Spinner />;
    }

    return (
        <main className="main bg-dark">
            <section className="register-content">
                <FontAwesomeIcon icon={faCircleUser} />
                <h1>Register</h1>

                <form onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <label htmlFor="email">
                            Username
                            <FontAwesomeIcon
                                icon={faCheck}
                                className={validEmail ? "valid" : "hide"}
                            />
                            <FontAwesomeIcon
                                icon={faTimes}
                                className={
                                    validEmail || !email ? "hide" : "invalid"
                                }
                            />
                        </label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={email}
                            ref={emailRef}
                            required
                            aria-invalid={validEmail ? "false" : "true"}
                            aria-describedby="emailmsg"
                            onChange={handleChange}
                        />
                        <p
                            id="emailmsg"
                            className={
                                email && !validEmail
                                    ? "instructions"
                                    : "offscreen"
                            }
                        >
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Please enter a valid email address
                        </p>
                    </div>

                    <div className="input-wrapper">
                        <label htmlFor="password">
                            Password
                            <FontAwesomeIcon
                                icon={faCheck}
                                className={validPassword ? "valid" : "hide"}
                            />
                            <FontAwesomeIcon
                                icon={faTimes}
                                className={
                                    validPassword || !password
                                        ? "hide"
                                        : "invalid"
                                }
                            />
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            ref={passwordRef}
                            required
                            aria-invalid={validPassword ? "false" : "true"}
                            aria-describedby="passwordmsg"
                            onChange={handleChange}
                        />
                        <p
                            id="passwordmsg"
                            className={
                                password && !validPassword
                                    ? "instructions"
                                    : "offscreen"
                            }
                        >
                            <FontAwesomeIcon icon={faInfoCircle} />6 characters
                            or more (letters, numbers or specials characters :{" "}
                            <span aria-label="exclamation mark">!</span>{" "}
                            <span aria-label="at symbol">@</span>{" "}
                            <span aria-label="hashtag">#</span>{" "}
                            <span aria-label="dollar sign">$</span>{" "}
                            <span aria-label="percent">%)</span>
                        </p>
                    </div>

                    <div className="input-wrapper">
                        <label htmlFor="passwordConfirm">
                            Confirm your password
                            <FontAwesomeIcon
                                icon={faCheck}
                                className={
                                    validMatch && passwordConfirm
                                        ? "valid"
                                        : "hide"
                                }
                            />
                            <FontAwesomeIcon
                                icon={faTimes}
                                className={
                                    validMatch || !passwordConfirm
                                        ? "hide"
                                        : "invalid"
                                }
                            />
                        </label>
                        <input
                            type="password"
                            id="passwordConfirm"
                            name="passwordConfirm"
                            value={passwordConfirm}
                            ref={passwordConfirmRef}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmmsg"
                            onChange={handleChange}
                        />
                        <p
                            id="confirmmsg"
                            className={
                                !validMatch ? "instructions" : "offscreen"
                            }
                        >
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>
                    </div>

                    <div className="input-wrapper">
                        <label htmlFor="firstName">
                            First name
                            <FontAwesomeIcon
                                icon={faCheck}
                                className={validFirstName ? "valid" : "hide"}
                            />
                            <FontAwesomeIcon
                                icon={faTimes}
                                className={
                                    validFirstName || !firstName
                                        ? "hide"
                                        : "invalid"
                                }
                            />
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={firstName}
                            ref={firstNameRef}
                            required
                            aria-invalid={validFirstName ? "false" : "true"}
                            aria-describedby="firstnamemsg"
                            onChange={handleChange}
                        />
                        <p
                            id="firstnamemsg"
                            className={
                                firstName && !validFirstName
                                    ? "instructions"
                                    : "offscreen"
                            }
                        >
                            <FontAwesomeIcon icon={faInfoCircle} />must contain 2
                            letters or more
                        </p>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="lastName">
                            Last name
                            <FontAwesomeIcon
                                icon={faCheck}
                                className={validLastName ? "valid" : "hide"}
                            />
                            <FontAwesomeIcon
                                icon={faTimes}
                                className={
                                    validLastName || !lastName
                                        ? "hide"
                                        : "invalid"
                                }
                            />
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={lastName}
                            ref={lastNameRef}
                            required
                            aria-invalid={validLastName ? "false" : "true"}
                            aria-describedby="lastnamemsg"
                            onChange={handleChange}
                        />
                        <p
                            id="lastnamemsg"
                            className={
                                lastName && !validLastName
                                    ? "instructions"
                                    : "offscreen"
                            }
                        >
                            <FontAwesomeIcon icon={faInfoCircle} />must contain 2
                            letters or more
                        </p>
                    </div>

                    <button className="log-button">Sign Up</button>
                </form>
            </section>
        </main>
    );
};

export default Register;
