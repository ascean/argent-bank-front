import React from "react";
import { Link } from "react-router-dom";
import ProfileIcon from "../../components/profileIcon/ProfileIcon";

const SignIn = () => {
    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <ProfileIcon />
                <h1>Sign In</h1>
                <form>
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" />
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    <button className="sign-in-button">
                        <Link to="/user">Sign In</Link>
                    </button>
                </form>
            </section>
        </main>
    );
};

export default SignIn;
