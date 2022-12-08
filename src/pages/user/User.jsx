import React, { useState } from "react";
import Account from "../../components/account/Account";

const User = () => {
    const [editUser, setEditUser] = useState(false);
    const [firstName, setFirstName] = useState("Tony");
    const [lastName, setLastName] = useState("Jarvis");

    const updateUser = (e) => {
        e.preventDefault();
        console.log(firstName, lastName);
        setEditUser(false);
    };

    return (
        <main className = {!editUser ? "main bg-dark" : "main bg-light"}>
            <div className="header">
                {!editUser ? (
                    <h1> Welcome back <br /> { firstName }{ " " }{ lastName }</h1>
                ) : (
                    <h1 style={{ color: "black" }}>Welcome back</h1>
                )}
                <button
                    className={editUser ? "edit-button d-none" : "edit-button"}
                    onClick={() => setEditUser(!editUser)}
                >
                    Edit Name
                </button>
                <form action="" className={!editUser ? "d-none" : ""}>
                    <div className="user-infos">
                        <input
                            type="text"
                            name="firstName"
                            placeholder="Tony"
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Jarvis"
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div className="form-btn">
                        <input
                            type="button"
                            value="Save"
                            onClick={(e) => updateUser(e)}
                        />
                        <input
                            type="button"
                            value="Cancel"
                            onClick={() => setEditUser(false)}
                        />
                    </div>
                </form>
            </div>
            <h2 className="sr-only">Accounts</h2>
            <Account
                title={"Argent Bank Checking (x8349)"}
                amount={"$2,082.79"}
                description={"Available Balance"}
                editMode={editUser}
            />
            <Account
                title={"Argent Bank Savings (x6712)"}
                amount={"$10,928.42"}
                description={"Available Balance"}
                editMode={editUser}
            />
            <Account
                title={"Argent Bank Credit Card (x8349)"}
                amount={"$184.30"}
                description={"Current Balance"}
                editMode={editUser}
            />
        </main>
    );
};

export default User;
