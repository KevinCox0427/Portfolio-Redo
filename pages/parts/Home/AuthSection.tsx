import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import WindowCache from "../../windowCache";

const base64Characters = 'abcdefghijklmnopqrxtuvwxyzABCDEFGHIJKLMNOPQRXTUVWXYZ0123456789+/';


type Props = {
    windowCache: WindowCache
}

const AuthSection:FunctionComponent<Props> = (props) => {
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
    props.windowCache.registerCache('DreamStateUserRegister', userData, setUserData);

    const [errorMessage, setErrorMessage] = useState({
        success: false,
        message: ''
    });

    const sessionCounterAmount = 20;
    const [sessionCounter, setSessionCounter] = useState(0);
    props.windowCache.registerCache('DreamStateSessionCounter', sessionCounter, setSessionCounter);

    const sessionCounterInterval = useRef<ReturnType<typeof setTimeout> | null>(null);

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

    function createSession() {
        if(sessionCounterInterval.current) clearInterval(sessionCounterInterval.current);
        setSessionCounter(0);

        if(userData.loginUsername != userData.registerUsername || userData.loginPassword != userData.registerPassword) {
            setUserData({...userData,
                loginUsername: '',
                loginPassword: '',
                session: {
                    key: '',
                    expires: 0
                }
            });
            setErrorMessage({
                message: 'Error: Incorrect username and password.',
                success: false
            });
            return;
        }

        const key = Array.from(Array(64)).map(() => {
            return base64Characters.charAt(Math.random()*64);
        }).join('');

        setUserData({...userData,
            loginUsername: '',
            loginPassword: '',
            session: {
                key: key,
                expires: Date.now() + (sessionCounterAmount*1000*60)
            }
        });
        setErrorMessage({
            message: 'Success! Take a look at your session to see how long you\'re logged in for.',
            success: true
        });
        setSessionCounter(sessionCounterAmount*1000*60);
    }

    function startSessionCounter() {
        tick();
        sessionCounterInterval.current = setInterval(tick, 1000);

        function tick() {
            const amount = userData.session.expires - Date.now();
            if(amount <= 0) {
                setSessionCounter(0);
                clearInterval(sessionCounterInterval.current!);
            }
            else setSessionCounter(amount);
        }
    }

    const [initialLoad, setInitialLoad] = useState(false);
    if(typeof window != 'undefined') window.addEventListener('load', () => {
        setInitialLoad(true);
    });

    useEffect(() => {
        if(initialLoad) {
            startSessionCounter();
            setInitialLoad(false);
        }
        if(sessionCounter != (sessionCounterAmount*1000*60)) return;
        startSessionCounter();
    }, [sessionCounter, initialLoad]);

    return <div id="authentication" className="Section">
        <h3 className='Title'>
            In order to have users, you need secure authentication...
        </h3>
        <p className='Description'>
            Authentication on the web has given us many of the things we tend to take for granted: ecommerce, cloud storage, social media. I can give you the peace of mind by securely implementing many different methods of authentication, whether it be through an OAuth2 provider like Google, or entirely from stratch.
            <span>Let's create you a user from stratch together!</span>
        </p>
        <div className='Example'>
            <div className="Form">
                <h4>Register</h4>
                <i className="fa-solid fa-arrow-rotate-left Reset" onClick={() => {
                        setUserData({...userData,
                            registerUsername: '',
                            registerPassword: '',
                            hash: '',
                            salt: '',
                            session: {
                                key: '',
                                expires: 0
                            }
                        });
                        setSessionCounter(0);
                    }}></i>
                <div className="InputWrapper">
                    <input placeholder=" " id="userCreateUsername" value={userData.registerUsername} onChange={e => {
                        setUserData({...userData,
                            registerUsername: e.target.value,
                            session: {
                                key: '',
                                expires: 0
                            }
                        });
                        setSessionCounter(0);
                    }}></input>
                    <label htmlFor="userCreateUsername">Username:</label>
                </div>
                <div className="InputWrapper">
                    <input placeholder=" " id="userCreatePassword" value={userData.registerPassword} onChange={e => {
                        setUserData({...userData,
                            registerPassword: e.target.value,
                            hash: '',
                            salt: '',
                            session: {
                                key: '',
                                expires: 0
                            }
                        });
                        setSessionCounter(0);
                    }}></input>
                    <label htmlFor="userCreatePassword">Password:</label>
                </div>
                <button className="Submit" onClick={encryptPassword}>Submit</button>
            </div>
            <div className="EncryptionWrapper">
                <h4>Your encrypted password:</h4>
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
                        setSessionCounter(0);
                    }}></i>
                <div className="InputWrapper">
                    <input placeholder=" " id="userLoginUsername" value={userData.loginUsername} onChange={e => {
                        setUserData({...userData,
                            loginUsername: e.target.value
                        });
                        setErrorMessage({
                            message: '',
                            success: false
                        });
                    }}></input>
                    <label htmlFor="userLoginUsername">Username:</label>
                </div>
                <div className="InputWrapper">
                    <input placeholder=" " id="userLoginPassword" value={userData.loginPassword} onChange={e => {
                        setUserData({...userData,
                            loginPassword: e.target.value
                        });
                        setErrorMessage({
                            message: '',
                            success: false
                        });
                    }}></input>
                    <label htmlFor="userLoginPassword">Password:</label>
                </div>
                {errorMessage.message ? <p className="ErrorMessage" style={{
                    color: errorMessage.success ? 'var(--green)' : 'var(--lightRed)'
                }}>
                    {errorMessage.message}
                </p> : <></>}
                <button className="Submit" onClick={() => {createSession()}}>Submit</button>
            </div>
            <div className="SessionWrapper">
                <h4>Your current session:</h4>
                {userData.session.key && userData.session.expires > Date.now() ? <>
                    <p className="Timer" style={{
                        color: Math.floor(sessionCounter/1000) > (sessionCounterAmount*60) / 2 ? 'var(--green)' : Math.floor(sessionCounter/1000) > (sessionCounterAmount*60) / 4 ? 'var(--yellow)' : 'var(--lightRed)',
                    }}>{Math.floor(sessionCounter/(1000*60))}m {Math.floor(sessionCounter/1000) % 60}s</p>
                    <p className="Key"><span>Key:</span> {userData.session.key}</p>
                </>: <></>}
             </div>
        </div>
    </div>
}

export default AuthSection