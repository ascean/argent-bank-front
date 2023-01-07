import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import BankFeature from "../../components/bankFeature/BankFeature";
import { isValidToken } from "../../utils/tokenControl";
import { fetchProfile, reset } from "../../redux/auth/authSlice";
import { fetchProfileAPI } from "../../services/authServices";
import BANK_FEATURES from "../../assets/datas/datas";

const Home = () => {
    
    const bankFeatures = BANK_FEATURES

    const dispatch = useDispatch()

    useEffect(() => {
        if (!isValidToken()) {
            dispatch(reset());
            return
        } 
        getUserProfile()
        
    }, [ dispatch ]);
    
    const getUserProfile = async () => {
        const data = await fetchProfileAPI()
        dispatch(fetchProfile(data))
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
                { bankFeatures.map((bankFeature) => (
                    <BankFeature
                        key={ bankFeature.key }
                        icon={bankFeature.icon}
                        alt={ bankFeature.alt }
                        title={ bankFeature.title }
                        description={ bankFeature.description }
                    />
                    
                ))}
            </section>
        </main>
    );
};

export default Home;
