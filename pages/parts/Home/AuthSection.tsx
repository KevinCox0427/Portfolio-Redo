import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import WindowCache from "../windowCache";
import Register from "./AuthSection/Register";
import Login from "./AuthSection/Login";
import { SectionContent } from "../../Home";
import parse, { Element } from 'html-react-parser';

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
    sectionContent: SectionContent
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

    return <div id={props.sectionContent.name} className="Section">
        {parse(props.sectionContent.content, {
            replace: (node) => {
                const validTags = ['DIV', 'P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'A', 'SPAN', 'EM', 'STRONG', 'SMALL', 'IMAGE'];
                if(!(node instanceof Element)) return node;
                if(validTags.includes(node.tagName)) return node;
                return false;
            }
        })}
        <div className='Example'>
            <Register userData={userData} setUserData={setUserData} setSessionCounter={setSessionCounter}></Register>
            <div className="Divider"></div>
            <Login userData={userData} setUserData={setUserData} sessionCounterAmount={sessionCounterAmount} sessionCounter={sessionCounter} setSessionCounter={setSessionCounter}></Login>
        </div>
    </div>
}

export default AuthSection;