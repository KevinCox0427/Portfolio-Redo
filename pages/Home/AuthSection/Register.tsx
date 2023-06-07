import React, { FunctionComponent } from "react";
import { UserAuthData } from "./AuthSection";

type Props = {
    userData: UserAuthData,
    setUserData: React.Dispatch<React.SetStateAction<UserAuthData>>
}

/**
 * A component in the Authenication section for the homepage to render the registration form and to display the encrypted password.
 * 
 * @param userData The state variable reprenting the forms' data and the session's data.
 * @param setUserData The set state function for the userData variable.
 */
const Register: FunctionComponent<Props> = (props) => {
    /**
     * A function to update the registration form's username.
     * Also removes any user sessions since the credentials will become invalid.
     */
    function handleUsernameInput(e:React.ChangeEvent<HTMLInputElement>) {
        props.setUserData(oldUserData => {
            return {...oldUserData,
                registerUsername: e.target.value,
                session: {
                    key: '',
                    expires: 0
                }
            }
        });
    }

    /**
     * A function to update the registration form's password.
     * Also removes any user sessions since the credentials will become invalid.
     */
    function handlePasswordInput(e:React.ChangeEvent<HTMLInputElement>) {
        props.setUserData(oldUserData => {
            return {...oldUserData,
                registerPassword: e.target.value,
                hash: '',
                salt: '',
                session: {
                    key: '',
                    expires: 0
                }
            }
        });
    }

    /**
     * A function to submit the registration form.
     * This is mostly to encrypt the password via the server.
     */
    async function submit(e: React.MouseEvent) {
        /**
         * Preventing default so the form doesn't reload the page.
         */
        e.preventDefault();

        /**
         * Sending the password to the server to encrypt it.
         * I'm sure there's a client-side library to do this, I just couldn't find one and node's crypto library is easy.
         */
        const response = await (await fetch('/encrypt', {
            method: 'POST',
            headers: {
                "Accept": 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password: props.userData.registerPassword
            })
        })).json();

        /**
         * Setting the encrypted password based on the response.
         */
        props.setUserData(oldUserData => {
            return {...oldUserData,
                hash: response.hash,
                salt: response.salt
            }
        });
    }

    /**
     * A function to reset the registration form's values and the session.
     */
    function reset() {
        props.setUserData(oldUserData => {
            return {...oldUserData,
                registerUsername: '',
                registerPassword: '',
                hash: '',
                salt: '',
                session: {
                    key: '',
                    expires: 0
                }
            }
        });
    }
    
    return <>
        <form className="Form">
            <h4>Register</h4>
            <i className="fa-solid fa-arrow-rotate-left Reset" onClick={reset}></i>
            <div className="InputWrapper">
                <input placeholder=" " id="userCreateUsername" value={props.userData.registerUsername} onChange={handleUsernameInput}></input>
                <label htmlFor="userCreateUsername">Username:</label>
            </div>
            <div className="InputWrapper">
                <input placeholder=" " id="userCreatePassword" type="password" value={props.userData.registerPassword} onChange={handlePasswordInput}></input>
                <label htmlFor="userCreatePassword">Password:</label>
            </div>
            <button className="Submit" onClick={submit}>Submit</button>
        </form>
        <div className="EncryptionWrapper">
            <h4>Your encrypted password:</h4>
            {props.userData.salt && props.userData.hash ? <p className="EncryptedPassword">
                {`${props.userData.salt}:${props.userData.hash}`}
            </p> : <></>}
        </div>
    </>
}

export default Register;