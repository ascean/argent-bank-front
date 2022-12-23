import React from "react";

/**
 * Display account items
 * @param {string} title
 * @param {string} amount
 * @param {string} description
 * @param {boolean} editMode
 * @returns {ReactElement} Account
 */
const Transaction = ({ title, amount, description, editMode = false }) => {
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
                                ? "account-button"
                                : "account-button edit-mode"
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

export default Transaction;