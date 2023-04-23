import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import WindowCache from "../windowCache";
import Register from "./AuthSection/Register";
import Login from "./AuthSection/Login";
import { SectionContent } from "../../Home";

export type { UserData }

type UserData = {
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

type Props = {
    windowCache: WindowCache,
    content: SectionContent
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

    const sessionCounterAmount = 20;
    const [sessionCounter, setSessionCounter] = useState(0);
    props.windowCache.registerCache('DreamStateSessionCounter', sessionCounter, setSessionCounter);

    return <div id={props.content.name} className="Section">
        <h3 className='Title'>{props.content.title}</h3>
        <p className='Description'>
            {props.content.description}
            <span>{props.content.subDescription}</span>
        </p>
        <div className='Example'>
            <Register userData={userData} setUserData={setUserData} setSessionCounter={setSessionCounter}></Register>
            <div className="Divider"></div>
            <Login userData={userData} setUserData={setUserData} sessionCounterAmount={sessionCounterAmount} sessionCounter={sessionCounter} setSessionCounter={setSessionCounter}></Login>
        </div>
    </div>
}

export default AuthSection;