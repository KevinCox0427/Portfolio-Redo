import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import Register from "./Register";
import Login from "./Login";
import Title from "../components/Title";

// A string of characters to create a base64 string.
// Ik this isn't how it's actually how it's done, but just for demo purposes.
const base64Characters = 'abcdefghijklmnopqrxtuvwxyzABCDEFGHIJKLMNOPQRXTUVWXYZ0123456789+/';

export type { UserAuthData }

type UserAuthData = {
    registerUsername: string,
    registerPassword: string,
    loginUsername: string,
    loginPassword: string,
    hash: string,
    salt: string,
    session: {
        key: string,
        expires: number
    }
}

/**
 * A component that renders the authentication section on the homepage.
 * @param windowCache The utility class that saves state variables into local storage upon state change.
 * @param sectionContent The title and description for this section. Can be changed.
 */
const AuthSection:FunctionComponent = () => {
    // State variable to keep track of the login & register forms, as well as the encrypted password and login sessions.
    // We're also loading & saving this to local storage.
    const [userData, setUserData] = useState<UserAuthData>({
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
    props.windowCache.registerCache('userRegister', userData, setUserData);

    // The length of time a session lasts for in minutes.
    const sessionCounterAmount = 20;

    /**
     * A function that checks the user's credentials and creates a session if login is valid.
     * @returns A boolean representing whether the login and session creation was sucessful.
     */
    function createSession() {
        const validLogin = userData.loginUsername === userData.registerUsername && userData.loginPassword === userData.registerPassword;
        // Generating a base64 key for the session.
        const key = Array.from(Array(64)).map(() => base64Characters.charAt(Math.random()*64)).join('');
        
        setUserData(oldUserData => {
            return {...oldUserData,
                loginUsername: '',
                loginPassword: '',
                session: {
                    key: validLogin ? key : '',
                    expires: validLogin ? Date.now() + (sessionCounterAmount*1000*60) : 0
                }
            }
        });

        return validLogin;
    }

    return <div id="authentication" className="Section"  style={{
        order: props.sectionContent.order,
        zIndex: 6 - props.sectionContent.order
    }}>
        <Title
            content={props.sectionContent.content}
        ></Title>
        <div className='Example'>
            <Register
                userData={userData}
                setUserData={setUserData}
            ></Register>
            <div className="Divider"></div>
            <Login
                userData={userData}
                setUserData={setUserData}
                sessionCounterAmount={sessionCounterAmount}
                createSession={createSession}
                cachedHasLoaded={props.cachedHadLoaded}
            ></Login>
        </div>
    </div>
}

export default AuthSection;