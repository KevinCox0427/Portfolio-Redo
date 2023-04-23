import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { UserData } from "../AuthSection";

const base64Characters = 'abcdefghijklmnopqrxtuvwxyzABCDEFGHIJKLMNOPQRXTUVWXYZ0123456789+/';

type Props = {
    userData: UserData,
    setUserData: React.Dispatch<React.SetStateAction<UserData>>,
    sessionCounterAmount: number,
    sessionCounter: number,
    setSessionCounter: React.Dispatch<React.SetStateAction<number>>
}

const Login: FunctionComponent<Props> = (props) => {
    const [errorMessage, setErrorMessage] = useState({
        success: false,
        message: ''
    });

    const sessionCounterInterval = useRef<NodeJS.Timeout | null>(null);

    function startSessionCounter() {
        tick();
        sessionCounterInterval.current = setInterval(tick, 1000);

        function tick() {
            const amount = getUserSessionExpiration() - Date.now();
            
            if(amount <= 0) {
                props.setSessionCounter(0);
                clearInterval(sessionCounterInterval.current!);
            }
            else props.setSessionCounter(amount);
        }
    }

    useEffect(() => {
        startSessionCounter();
    }, [getUserSessionExpiration]);

    function getUserSessionExpiration() {
        return props.userData.session.expires;
    }

    useEffect(() => {
        if(props.sessionCounter != (props.sessionCounterAmount*1000*60)) return;
        startSessionCounter();
    }, [props.sessionCounter]);

    function createSession() {
        if(sessionCounterInterval.current) clearInterval(sessionCounterInterval.current);
        props.setSessionCounter(0);

        if(props.userData.loginUsername != props.userData.registerUsername || props.userData.loginPassword != props.userData.registerPassword) {
            props.setUserData(oldUserData => {
                return {...oldUserData,
                    loginUsername: '',
                    loginPassword: '',
                    session: {
                        key: '',
                        expires: 0
                    }
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

        props.setUserData(oldUserData => {
            return {...oldUserData,
                loginUsername: '',
                loginPassword: '',
                session: {
                    key: key,
                    expires: Date.now() + (props.sessionCounterAmount*1000*60)
                }
            }
        });

        setErrorMessage({
            message: 'Success! Take a look at your session to see how long you\'re logged in for.',
            success: true
        });
        
        props.setSessionCounter(props.sessionCounterAmount*1000*60);
    }
    
    return <>
        <div className="Form">
            <h4>Login</h4>
            <i className="fa-solid fa-arrow-rotate-left Reset" onClick={() => {
                    props.setUserData(oldUserData => {
                        return {...oldUserData,
                            loginUsername: '',
                            loginPassword: '',
                            session: {
                                key: '',
                                expires: 0
                            }
                        }
                    });
                    props.setSessionCounter(0);
                }}></i>
            <div className="InputWrapper">
                <input placeholder=" " id="userLoginUsername" value={props.userData.loginUsername} onChange={e => {
                    props.setUserData(oldUserData => {
                        return {...oldUserData,
                            loginUsername: e.target.value
                        }
                    });
                    setErrorMessage({
                        message: '',
                        success: false
                    });
                }}></input>
                <label htmlFor="userLoginUsername">Username:</label>
            </div>
            <div className="InputWrapper">
                <input placeholder=" " id="userLoginPassword" value={props.userData.loginPassword} onChange={e => {
                    props.setUserData(oldUserData => {
                        return {...oldUserData,
                            loginPassword: e.target.value
                        }
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
            {props.userData.session.key && props.userData.session.expires > Date.now() ? <>
                <p className="Timer" style={{
                    color: Math.floor(props.sessionCounter/1000) > (props.sessionCounterAmount*60) / 2 ? 'var(--green)' : Math.floor(props.sessionCounter/1000) > (props.sessionCounterAmount*60) / 4 ? 'var(--yellow)' : 'var(--lightRed)',
                }}>{Math.floor(props.sessionCounter/(1000*60))}m {Math.floor(props.sessionCounter/1000) % 60}s</p>
                <p className="Key"><span>Key:</span> {props.userData.session.key}</p>
            </>: <></>}
        </div>
    </>
}

export default Login;