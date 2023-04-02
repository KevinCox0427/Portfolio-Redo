import React, { FunctionComponent } from "react";

type Props = {
    text:string,
    url:string
    activated: boolean
}

const Link:FunctionComponent<Props> = (props) => {
    return <a className="Link" href={props.url} style={props.activated ? {
        fontWeight: 400,
        padding: '0.2em 0.4em 0.2em 0.3em'
    } : {}}>
        {props.text}
        <i className="fa-solid fa-angle-right" style={props.activated ? {
            color: 'var(--black)'
        } : {}}></i>
        <div className="Underline" style={props.activated ? {
            height: '100%',
            borderRadius: '0.2em'
        } : {}}></div>
    </a>
}

export default Link;