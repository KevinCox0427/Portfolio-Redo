import React, { FunctionComponent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "../../store/store";
import { createSession, resetLogin, setLoginPassword, setLoginUsername } from "../../store/fakeUserCredentials";

type Props = {
    sessionCounterAmount: number
}

/**
 * A component in the Authentication section of the homepage to render a login form and a counter timer for the current user's session.
 * @param sessionCounterAmount The length of time a session is valid for in minutes.
 */
const Login: FunctionComponent<Props> = (props) => {
    const dispatch = useDispatch();
    const fakeUserCredentials = useSelector(state => state.fakeUserCredentials);

    // Creating a state variable to update error messages when a user submits.
    const [errorMessage, setErrorMessage] = useState({
        success: false,
        message: ''
    });

    // Creating a state variable to display a counter when a user creates a session key.
    const [sessionCounter, setSessionCounter] = useState(
        fakeUserCredentials.session.expires - Date.now() > 0 
            ? fakeUserCredentials.session.expires - Date.now()
            : 0
    );

    // Creating an 1 second interval to count down the session timer.
    useEffect(() => {
        // Guard clauses to stop the counter when it has reached 0.
        if(sessionCounter === 0) return;
        if(fakeUserCredentials.session.expires - Date.now() < 0) {
            setSessionCounter(0);
            return;
        }

        // Setting an interval for 1s to repeatly set the sessionCounter state variable.
        const interval = setInterval(() =>  setSessionCounter(fakeUserCredentials.session.expires - Date.now()), 1000);
        return () => clearInterval(interval);
    }, [sessionCounter]);

    // Resetting the error message on user input.
    useEffect(() => {
        setErrorMessage({
            message: '',
            success: false
        });
    }, [fakeUserCredentials.loginPassword, fakeUserCredentials.loginUsername]);

    /**
     * A function to submit a users credentials and create a user session if valid.
     */
    function submit(e:React.MouseEvent) {
        // Preventing default so form doesn't reload page on submit.
        e.preventDefault();

        // Guard clause for incorrect credentials.
        if(
            fakeUserCredentials.loginUsername !== fakeUserCredentials.registerUsername ||
            fakeUserCredentials.loginPassword !== fakeUserCredentials.registerPassword
        ) {
            setErrorMessage({
                message: 'Error: Incorrect username and password.',
                success: false
            });
            return;
        }

        // Creating a user session, returns wether the credentials were correct.
        dispatch(createSession(sessionCounter));
    
        // Now we'll start the session counter.
        setSessionCounter(fakeUserCredentials.session.expires - Date.now());

        // Setting an appropriate error message based on the success of the operation.
        setErrorMessage({
            message: 'Success! Take a look at your session to see how long you\'re logged in for.',
            success: true
        });
    }
    
    return <>
        <form className="Form">
            <h4>Login</h4>
            <i className="fa-solid fa-arrow-rotate-left Reset" onClick={() => dispatch(resetLogin())}></i>
            <div className="InputWrapper">
                <input
                    placeholder=" "
                    id="userLoginUsername"
                    value={fakeUserCredentials.loginUsername}
                    onChange={e => dispatch(setLoginUsername(e.target.value))}
                ></input>
                <label htmlFor="userLoginUsername">Username:</label>
            </div>
            <div className="InputWrapper">
                <input
                    placeholder=" "
                    id="userLoginPassword"
                    type="password"
                    value={fakeUserCredentials.loginPassword}
                    onChange={e => dispatch(setLoginPassword(e.target.value))}
                ></input>
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
            {fakeUserCredentials.session.key && fakeUserCredentials.session.expires > Date.now()
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
                        {fakeUserCredentials.session.key}
                    </p>
                </>
                : <></>
            }
        </div>
    </>
}

export default Login;