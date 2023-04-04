import React, { FunctionComponent, useRef, useState } from "react";
import { cacheLocalStorage } from "../../Home";

const base64Characters = 'abcdefghijklmnopqrxtuvwxyzABCDEFGHIJKLMNOPQRXTUVWXYZ0123456789+/';

const AuthSection:FunctionComponent = () => {
    const [userData, setUserData] = useState({
        registerUsername: '',
        registerPassword: '',
        loginUsername: '',
        loginPassword: '',
        hash: '',
        salt: '',
        session: {
            key: '',
            expires: 0
        }
    });
    cacheLocalStorage('DreamStateUserRegister', userData, setUserData);

    const [isEngangingField, setIsEngagingField] = useState({
        registerUsername: false,
        registerPassword: false,
        loginUsername: false,
        loginPassword: false
    });

    async function encryptPassword() {
        const response = await (await fetch('/encrypt', {
            method: 'POST',
            headers: {
                "Accept": 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password: userData.registerPassword
            })
        })).json()
        setUserData({...userData,
            hash: response.hash,
            salt: response.salt
        });
    }

    const [sessionCounter, setSessionCounter] = useState(0);
    const sessionCounterInterval = useRef<ReturnType<typeof setTimeout> | null>(null);

    function createSession() {
        if(sessionCounterInterval.current) clearInterval(sessionCounterInterval.current);
        
        if(userData.loginUsername != userData.registerUsername || userData.loginPassword != userData.registerPassword) {
            setUserData({...userData,
                loginUsername: '',
                loginPassword: '',
                session: {
                    key: '',
                    expires: 0
                }
            });
            return;
        }

        const key = Array.from(Array(64)).map(() => {
            return base64Characters.charAt(Math.random()*64);
        }).join('');

        setUserData({...userData,
            session: {
                key: key,
                expires: Date.now() + (1000*5*60)
            }
        });

        setSessionCounter(userData.session.expires - Date.now());
        sessionCounterInterval.current = setInterval(() => {
            const amount = userData.session.expires - Date.now();
            if(amount < 0) {
                setSessionCounter(0);
                clearInterval(sessionCounterInterval.current!);
            }
            else setSessionCounter(amount);
        }, 1000);
    }

    return <div id="authentication" className="Section">
        <h3 className='Title'>In order to have users, you need secure authentication...</h3>
        <p className='Description'>Authentication on the web has given us many of the things we tend to take for granted: ecommerce, cloud storage, social media. I can give you the peace of mind by securely implementing many different methods of authentication, whether it be through an OAuth2 provider like Google, or entirely from stratch. Let's create a user from stratch together:</p>
        <div className='Example'>
            <div className="Form">
                <h4>Register</h4>
                <i className="fa-solid fa-arrow-rotate-left Reset" onClick={() => {
                        setUserData({...userData,
                            registerUsername: '',
                            registerPassword: '',
                            hash: '',
                            salt: '',
                        });
                    }}></i>
                <div className="InputWrapper" style={{
                    borderColor: isEngangingField.registerUsername ? 'var(--yellow)' : userData.registerUsername ? 'var(--green)' : 'var(--lightRed)'
                }} onMouseOver={() => {setIsEngagingField({...isEngangingField,
                    registerUsername: true
                })}} onMouseOut={() => {setIsEngagingField({...isEngangingField,
                    registerUsername: false
                })}}>
                    <p>Username:</p>
                    <input value={userData.registerUsername} onChange={e => {
                        setUserData({...userData,
                            registerUsername: e.target.value
                        });
                    }} onFocus={() => {setIsEngagingField({...isEngangingField,
                        registerUsername: true
                    })}} onBlur={() => {setIsEngagingField({...isEngangingField,
                        registerUsername: false
                    })}}></input>
                </div>
                <div className="InputWrapper" style={{
                    borderColor: isEngangingField.registerPassword ? 'var(--yellow)' : userData.registerPassword ? 'var(--green)' : 'var(--lightRed)'
                }} onMouseOver={() => {setIsEngagingField({...isEngangingField,
                    registerPassword: true
                })}} onMouseOut={() => {setIsEngagingField({...isEngangingField,
                    registerPassword: false
                })}}>
                    <p>Password:</p>
                    <input value={userData.registerPassword} onChange={e => {
                        setUserData({...userData,
                            registerPassword: e.target.value,
                            hash: '',
                            salt: ''
                        });
                    }} onFocus={() => {setIsEngagingField({...isEngangingField,
                        registerPassword: true
                    })}} onBlur={() => {setIsEngagingField({...isEngangingField,
                        registerPassword: false
                    })}}></input>
                </div>
                <button className="Submit" onClick={encryptPassword}>Submit</button>
            </div>
            <div className="EncryptionWrapper">
                <h4>Your encrypted password</h4>
                {userData.salt && userData.hash ? <>
                    <p className="EncryptedPassword">{`${userData.salt}:${userData.hash}`}</p>
                    {/* <p className="Disclaimer">Note: This password encryption is type 8, however all password encryption implementions I use are type 9. The main difference is that type 9 is much more computationally expensive to encrypt, and therefore crack. I haven't used it in this example since someone could spam my server. For more information, visit <a target='_blank' href="https://media.defense.gov/2022/Feb/17/2002940795/-1/-1/0/CSI_CISCO_PASSWORD_TYPES_BEST_PRACTICES_20220217.PDF">here</a>.</p> */}
                </> : <></>}
            </div>
            <div className="Divider"></div>
            <div className="Form">
                <h4>Login</h4>
                <i className="fa-solid fa-arrow-rotate-left Reset" onClick={() => {
                        setUserData({...userData,
                            loginUsername: '',
                            loginPassword: '',
                            session: {
                                key: '',
                                expires: 0
                            }
                        });
                    }}></i>
                <div className="InputWrapper" style={{
                    borderColor: isEngangingField.loginUsername ? 'var(--yellow)' : userData.loginUsername ? 'var(--green)' : 'var(--lightRed)'
                }} onMouseOver={() => {setIsEngagingField({...isEngangingField,
                    loginUsername: true
                })}} onMouseOut={() => {setIsEngagingField({...isEngangingField,
                    loginUsername: false
                })}}>
                    <p>Username:</p>
                    <input value={userData.loginUsername} onChange={e => {
                        setUserData({...userData,
                            loginUsername: e.target.value
                        });
                    }} onFocus={() => {setIsEngagingField({...isEngangingField,
                        loginUsername: true
                    })}} onBlur={() => {setIsEngagingField({...isEngangingField,
                        loginUsername: false
                    })}}></input>
                </div>
                <div className="InputWrapper" style={{
                    borderColor: isEngangingField.loginPassword ? 'var(--yellow)' : userData.loginPassword ? 'var(--green)' : 'var(--lightRed)'
                }} onMouseOver={() => {setIsEngagingField({...isEngangingField,
                    loginPassword: true
                })}} onMouseOut={() => {setIsEngagingField({...isEngangingField,
                    loginPassword: false
                })}}>
                    <p>Password:</p>
                    <input value={userData.loginPassword} onChange={e => {
                        setUserData({...userData,
                            loginPassword: e.target.value
                        });
                    }} onFocus={() => {setIsEngagingField({...isEngangingField,
                        loginPassword: true
                    })}} onBlur={() => {setIsEngagingField({...isEngangingField,
                        loginPassword: false
                    })}}></input>
                </div>
                <button className="Submit" onClick={createSession}>Submit</button>
            </div>
            <div className="SessionWrapper">
                <h4>Your current session</h4>
                {userData.session.key && userData.session.expires > Date.now() ? <>
                    <p>{userData.session.key}</p>
                    <p>Expires in {Math.floor(sessionCounter/(1000*60))}m {Math.floor(sessionCounter/1000) % 60}s</p>
                </>: <></>}
             </div>
        </div>
    </div>
}

export default AuthSection