import React, { FunctionComponent } from "react";
import { useDispatch, useSelector } from "../../store/store";
import { resetRegister, setEncryptedPassword, setRegisterPassword, setRegisterUsername } from "../../store/fakeUserCredentials";

/**
 * A component in the Authenication section for the homepage to render the registration form and to display the encrypted password.
 */
const Register: FunctionComponent = () => {
    const dispatch = useDispatch();
    const fakeUserCredentials = useSelector(state => state.fakeUserCredentials);

    /**
     * A function to submit the registration form.
     * This is mostly to encrypt the password via the server.
     */
    async function submit(e: React.MouseEvent) {
        // Preventing default so the form doesn't reload the page.
        e.preventDefault();

        // Sending the password to the server to encrypt it.
        // I'm sure there's a client-side library to do this, I just couldn't find one and node's crypto library is easy.
        const response = await (await fetch('/encrypt', {
            method: 'POST',
            headers: {
                "Accept": 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password: fakeUserCredentials.registerPassword
            })
        })).json();
        
        dispatch(setEncryptedPassword(response));
    }
    
    return <>
        <form className="Form">
            <h4>Register</h4>
            <button className="Reset" onClick={() => dispatch(resetRegister())}>
                <i className="fa-solid fa-arrow-rotate-left"></i>
            </button>
            <div className="InputWrapper">
                <input
                    placeholder=" "
                    id="userCreateUsername"
                    value={fakeUserCredentials.registerUsername}
                    onChange={e => dispatch(setRegisterUsername(e.target.value))}
                ></input>
                <label htmlFor="userCreateUsername">Username:</label>
            </div>
            <div className="InputWrapper">
                <input
                    placeholder=" "
                    id="userCreatePassword"
                    type="password"
                    value={fakeUserCredentials.registerPassword}
                    onChange={e => dispatch(setRegisterPassword(e.target.value))}
                ></input>
                <label htmlFor="userCreatePassword">Password:</label>
            </div>
            <button className="Submit" onClick={submit}>Submit</button>
        </form>
        <div className="EncryptionWrapper">
            <h4>Your encrypted password:</h4>
            {fakeUserCredentials.salt && fakeUserCredentials.hash
                ? <p className="EncryptedPassword">
                    {`${fakeUserCredentials.salt}:${fakeUserCredentials.hash}`}
                </p>
                : <></>
            }
        </div>
    </>
}

export default Register;