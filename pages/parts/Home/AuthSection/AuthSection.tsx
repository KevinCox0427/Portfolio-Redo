import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import WindowCache from "../../windowCache";
import Register from "./Register";
import Login from "./Login";
import { SectionContent } from "../../../Home";
import Title from "../Title";

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
    sectionContent: SectionContent,
    style: React.CSSProperties
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

    return <div id="authentication" className="Section" style={props.style}>
        <Title content={props.sectionContent.content}></Title>
        <div className='Example'>
            <Register userData={userData} setUserData={setUserData} setSessionCounter={setSessionCounter}></Register>
            <div className="Divider"></div>
            <Login userData={userData} setUserData={setUserData} sessionCounterAmount={sessionCounterAmount} sessionCounter={sessionCounter} setSessionCounter={setSessionCounter}></Login>
        </div>
    </div>
}

export default AuthSection;