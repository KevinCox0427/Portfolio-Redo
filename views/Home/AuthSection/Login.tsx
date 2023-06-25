import React, { FunctionComponent, useEffect, useState } from "react";
import { UserAuthData } from "./AuthSection";

type Props = {
    userData: UserAuthData,
    setUserData: React.Dispatch<React.SetStateAction<UserAuthData>>,
    sessionCounterAmount: number,
    createSession: () => boolean,
    cachedHasLoaded: boolean
}

/**
 * A component in the Authentication section of the homepage to render a login form and a counter timer for the current user's session.
 * @param userData The state variable reprenting the forms' data and the session's data.
 * @param setUserData The set state function for the userData variable.
 * @param sessionCounterAmount The length of time a session is valid for in minutes.
 * @param createSession A function to check the validity of the user's crendentials, and create a new session if valid.
 * @param cachedHasLoaded A state variable representing whether the values from local storage were loaded or not.
 */
const Login: FunctionComponent<Props> = (props) => {
    // Creating a state variable to update error messages when a user submits.
    const [errorMessage, setErrorMessage] = useState({
        success: false,
        message: ''
    });

    // Creating a state variable to display a counter when a user creates a session key.
    const [sessionCounter, setSessionCounter] = useState(0);

    // Creating an 1 second interval to count down the session timer.
    useEffect(() => {
        // Guard clauses to stop the counter when it has reached 0.
        if(sessionCounter === 0) return;
        if(props.userData.session.expires - Date.now() < 0) {
            setSessionCounter(0);
            return;
        }

        // Setting an interval for 1s to repeatly set the sessionCounter state variable.
        // Ik it looks weird but React is weird.
        const interval = setInterval(() => {
            setSessionCounter(props.userData.session.expires - Date.now());
        }, 1000);
        return () => clearInterval(interval);
    }, [sessionCounter]);

    // Creating a callback function when the page loads to start the session counter if a session is still valid.
    useEffect(() => {
        if(props.userData.session.expires - Date.now() > 0) setSessionCounter(props.userData.session.expires - Date.now());
    }, [props.cachedHasLoaded]);

    /**
     * A function to change the username input value for the login field.
     * Also resets error messages.
     */
    function handleUsernameChange(e:React.ChangeEvent<HTMLInputElement>) {
        props.setUserData(oldUserData => {
            return {...oldUserData,
                loginUsername: e.target.value
            }
        });
        setErrorMessage({
            message: '',
            success: false
        });
    }

    /**
     * A function to change the password input value for the login field.
     * Also resets error messages.
     */
    function handlePasswordChange(e:React.ChangeEvent<HTMLInputElement>) {
        props.setUserData(oldUserData => {
            return {...oldUserData,
                loginPassword: e.target.value
            }
        });
        setErrorMessage({
            message: '',
            success: false
        });
    }

    /**
     * A function to reset the login fields and current session.
     */
    function reset() {
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
    }

    /**
     * A function to submit a users credentials and create a user session if valid.
     */
    function submit(e:React.MouseEvent) {
        // Preventing default so form doesn't reload page on submit.
        e.preventDefault();

        // Creating a user session, returns wether the credentials were correct.
        const result = props.createSession();
    
        // If it's correct, then we'll start the session counter.
        if(result) setSessionCounter(props.userData.session.expires - Date.now());

        // Setting an appropriate error message based on the success of the operation.
        setErrorMessage({
            message: result ? 'Success! Take a look at your session to see how long you\'re logged in for.' : 'Error: Incorrect username and password.',
            success: result
        });
    }
    
    return <>
        <form className="Form">
            <h4>Login</h4>
            <i className="fa-solid fa-arrow-rotate-left Reset" onClick={reset}></i>
            <div className="InputWrapper">
                <input placeholder=" " id="userLoginUsername" value={props.userData.loginUsername} onChange={handleUsernameChange}></input>
                <label htmlFor="userLoginUsername">Username:</label>
            </div>
            <div className="InputWrapper">
                <input placeholder=" " id="userLoginPassword" type="password" value={props.userData.loginPassword} onChange={handlePasswordChange}></input>
                <label htmlFor="userLoginPassword">Password:</label>
            </div>
            {errorMessage.message
                ? <p className="ErrorMessage" style={{
                    color: errorMessage.success ? 'var(--green)' : 'var(--lightRed)'
                }}>
                    {errorMessage.message}
                </p>
                : <></>
            }
            <button className="Submit" onClick={submit}>Submit</button>
        </form>
        <div className="SessionWrapper">
            <h4>Your current session:</h4>
            {props.userData.session.key && props.userData.session.expires > Date.now()
                ? <>
                    <p className="Timer" style={{
                        color: Math.floor(sessionCounter/1000) > (props.sessionCounterAmount*60) / 2
                            ? 'var(--green)'
                            : Math.floor(sessionCounter/1000) > (props.sessionCounterAmount*60) / 4
                                ? 'var(--yellow)'
                                : 'var(--lightRed)',
                    }}>
                        {Math.floor(sessionCounter/(1000*60))}m {Math.floor(sessionCounter/1000) % 60}s
                    </p>
                    <p className="Key">
                        <span>Key:</span>
                        {props.userData.session.key}
                    </p>
                </>
                : <></>
            }
        </div>
    </>
}

export default Login;