import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import BankFeature from "../../components/bankFeature/BankFeature";
import Spinner from "../../components/spinner/Spinner";
import { isValidToken } from "../../utils/tokenControl";
import { fetchProfile, reset } from "../../redux/auth/authSlice";
import chatIcon from "./img/icon-chat.png";
import moneyIcon from "./img/icon-money.png";
import securityIcon from "./img/icon-security.png";

const Home = () => {

    const dispatch = useDispatch()

    const { user, isError, isLoading, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    //useful to add user firstname in header
    useEffect(() => {
        isValidToken(localStorage.getItem("token")) ? dispatch(fetchProfile()) : dispatch(reset());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


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
                    dispatch(reset())
                    break;

                case 500:
                    toast.error("Internal Server Error");
                    break;

                default:
                    break;
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, isSuccess, isError, message]);

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
                <BankFeature
                    icon={chatIcon}
                    alt={"Chat Icon"}
                    title={"You are our #1 priority"}
                    content={
                        "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
                    }
                />
                <BankFeature
                    icon={moneyIcon}
                    alt={"Money Icon"}
                    title={"More savings means higher rates"}
                    content={
                        "The more you save with us, the higher your interest rate will be!"
                    }
                />
                <BankFeature
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
