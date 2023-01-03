import React from "react";

/**
 * Display account items
 * @param {string} title account title
 * @param {string} amount account amount
 * @param {string} description account description
 * @param {boolean} editMode edit mode used for button style
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

export default Account;