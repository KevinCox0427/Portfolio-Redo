import React, { FunctionComponent } from "react";

type Props = {
    text:string,
    url:string
    activated: boolean
}

const Link:FunctionComponent<Props> = (props) => {
    return <a className={`Link ${props.activated ? 'Activated' : ''}`} href={props.url} target={props.url.charAt(0) == '/' ? '_self' : '_blank'}>
        {props.text}
        <i className="fa-solid fa-angle-right"></i>
    </a>
}

export default Link;