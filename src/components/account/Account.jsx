import React from "react";
import { Link } from "react-router-dom";

/**
 * Display the account page for selected user
 * @param {string} title
 * @param {string} amount
 * @param {string} description
 * @param {boolean} editMode
 * @returns {ReactElement} Account
 */
const Account = ({ title, amount, description, editMode = false }) => {
    return (
        <section className="account">
            <div className="account-content-wrapper">
                <h3 className="account-title">{title}</h3>
                <p className="account-amount">{amount}</p>
                <p className="account-amount-description">{description}</p>
            </div>
            <div className="account-content-wrapper cta">
                <div>
                    <button
                        className={
                            !editMode
                                ? "transaction-button"
                                : "transaction-button edit-mode"
                        }
                        disabled={editMode && "disabled"}
                    >
                        View transactions
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Account;