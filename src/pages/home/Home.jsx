import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Feature from "../../components/feature/Feature";
import Spinner from "../../components/spinner/Spinner";
import { isValidToken } from "../../feature/auth/authServices";
import { fetchProfile } from "../../feature/auth/authSlice";
import chatIcon from "./img/icon-chat.png";
import moneyIcon from "./img/icon-money.png";
import securityIcon from "./img/icon-security.png";

const Home = () => {

    const dispatch = useDispatch()
    const { user, isError, isLoading, isSuccess, message } = useSelector(
        (state) => state.auth
    );


    useEffect(() => {
        const token = window.localStorage.getItem("token")
        if (token) {
            if (isValidToken(token)) {
                dispatch(fetchProfile())
                if (isError) {
                    toast.error("Fetch : "+message);
                }
            } else {
                window.localStorage.removeItem("token")
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ isError, message, dispatch ])

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <main>
            <div className="hero">
                <section className="hero-content">
                    <h2 className="sr-only">Promoted Content</h2>
                    <p className="subtitle">No fees.</p>
                    <p className="subtitle">No minimum deposit.</p>
                    <p className="subtitle">High interest rates.</p>
                    <p className="text">
                        Open a savings account with Argent Bank today!
                    </p>
                </section>
            </div>
            <section className="features">
                <Feature
                    icon={chatIcon}
                    alt={"Chat Icon"}
                    title={"You are our #1 priority"}
                    content={
                        "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
                    }
                />
                    <Feature
                        icon={moneyIcon}
                        alt={"Money Icon"}
                        title={"More savings means higher rates"}
                        content={
                            "The more you save with us, the higher your interest rate will be!"
                        }
                    />
                <Feature
                    icon={securityIcon}
                    alt={"Security Icon"}
                    title={"Security you can trust"}
                    content={
                        "We use top of the line encryption to make sure your data and money is always safe."
                    }
                />
                
            </section>
        </main>
    );
};

export default Home;
