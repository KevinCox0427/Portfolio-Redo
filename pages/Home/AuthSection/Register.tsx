import React, { FunctionComponent } from "react";
import { UserData } from "./AuthSection";

type Props = {
    userData: UserData,
    setUserData: React.Dispatch<React.SetStateAction<UserData>>,
    setSessionCounter: React.Dispatch<React.SetStateAction<number>>
}

const Register: FunctionComponent<Props> = (props) => {

    async function encryptPassword() {
        const response = await (await fetch('/encrypt', {
            method: 'POST',
            headers: {
                "Accept": 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password: props.userData.registerPassword
            })
        })).json()
        props.setUserData(oldUserData => {
            return {...oldUserData,
                hash: response.hash,
                salt: response.salt
            }
        });
    }
    
    return <>
        <div className="Form">
            <h4>Register</h4>
            <i className="fa-solid fa-arrow-rotate-left Reset" onClick={() => {
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
                props.setSessionCounter(0);
            }}></i>
            <div className="InputWrapper">
                <input placeholder=" " id="userCreateUsername" value={props.userData.registerUsername} onChange={e => {
                    props.setUserData(oldUserData => {
                        return {...oldUserData,
                            registerUsername: e.target.value,
                            session: {
                                key: '',
                                expires: 0
                            }
                        }
                    });
                    props.setSessionCounter(0);
                }}></input>
                <label htmlFor="userCreateUsername">Username:</label>
            </div>
            <div className="InputWrapper">
                <input placeholder=" " id="userCreatePassword" type="password" value={props.userData.registerPassword} onChange={e => {
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
                    props.setSessionCounter(0);
                }}></input>
                <label htmlFor="userCreatePassword">Password:</label>
            </div>
            <button className="Submit" onClick={encryptPassword}>Submit</button>
        </div>
        <div className="EncryptionWrapper">
            <h4>Your encrypted password:</h4>
            {props.userData.salt && props.userData.hash ? <p className="EncryptedPassword">
                {`${props.userData.salt}:${props.userData.hash}`}
            </p> : <></>}
        </div>
    </>
}

export default Register;