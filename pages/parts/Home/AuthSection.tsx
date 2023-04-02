import { json } from "express";
import React, { FunctionComponent, useRef, useState } from "react";

const AuthSection:FunctionComponent = () => {
    const subtle = useRef<SubtleCrypto | null>(null);
    const [userData, setUserData] = useState({
        username: '',
        password: ''
    });
    const [isEngangingField, setIsEngagingField] = useState({
        username: false,
        password: false
    });

    const [encryptedPassword, setEncryptedPassword] = useState({
        hash: '',
        salt: ''
    });

    async function encryptPassword() {
        const response = await (await fetch('/encrypt', {
            method: 'POST',
            headers: {
                "Accept": 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password: userData.password
            })
        })).json()
        setEncryptedPassword(response);
    }

    if(typeof window != 'undefined') {
        subtle.current = globalThis.crypto.subtle;
    }

    return <div id="authentication" className="Section">
        <h3 className='Title'>In order to have users, you need secure authentication...</h3>
        <p className='Description'>Authentication on the web has given us many of the things we tend to take for granted: ecommerce, cloud storage, social media. I can give you the peace of mind by securely implementing many different methods of authentication, whether it be through an OAuth2 provider like Google, or entirely from stratch. Let's create a user from stratch together:</p>
        <div className='Example'>
            <div className="Register">
                <h4>Register</h4>
                <div className="InputWrapper" style={{
                    borderColor: isEngangingField.username ? 'var(--yellow)' : userData.username ? 'var(--green)' : 'var(--lightRed)'
                }} onMouseOver={() => {setIsEngagingField({...isEngangingField,
                    username: true
                })}} onMouseOut={() => {setIsEngagingField({...isEngangingField,
                    username: false
                })}}>
                    <p>Username:</p>
                    <input value={userData.username} onChange={e => {
                        setUserData({...userData,
                            username: e.target.value
                        });
                    }} onFocus={() => {setIsEngagingField({...isEngangingField,
                        username: true
                    })}} onBlur={() => {setIsEngagingField({...isEngangingField,
                        username: false
                    })}}></input>
                </div>
                <div className="InputWrapper" style={{
                    borderColor: isEngangingField.password ? 'var(--yellow)' : userData.password ? 'var(--green)' : 'var(--lightRed)'
                }} onMouseOver={() => {setIsEngagingField({...isEngangingField,
                    password: true
                })}} onMouseOut={() => {setIsEngagingField({...isEngangingField,
                    password: false
                })}}>
                    <p>Password:</p>
                    <input value={userData.password} onChange={e => {
                        setUserData({...userData,
                            password: e.target.value
                        });
                    }} onFocus={() => {setIsEngagingField({...isEngangingField,
                        password: true
                    })}} onBlur={() => {setIsEngagingField({...isEngangingField,
                        password: false
                    })}}></input>
                </div>
                <div className="Submit">
                    <button onClick={encryptPassword}>Submit</button>
                </div>
            </div>
            <div className="EncryptionWrapper">
                {encryptedPassword.salt && encryptedPassword.hash ? <>
                    <h4>Your encrypted password:</h4>
                    <p className="EncryptedPassword">{`${encryptedPassword.salt}:${encryptedPassword.hash}`}</p>
                    <p className="Disclaimer"></p>
                </> : <></>}
            </div>
        </div>
    </div>
}

export default AuthSection