import React, { FunctionComponent } from "react";

type Props = {
    project: PortfolioConfig,
    style?: React.CSSProperties,
    tagCallback?: React.MouseEventHandler<HTMLParagraphElement>
}

const PortfolioCard: FunctionComponent<Props> = (props) => {
    
    return <a className="Project"  href={`/portfolio/${props.project.route}`} style={props.style ? props.style : {}}>
        <div className="ImageWrapper">
            <img src={props.project.logo} alt={`${props.project.name} logo`}></img>
        </div>
        <div className="Card">
            <h2>{props.project.name}</h2>
            <p className="Description">{props.project.description[0].length > 200 ? props.project.description[0].substring(0,197) + '...' : props.project.description[0]}</p>
            <div className="Tags">
                <p className="Tag" onClick={props.tagCallback ? props.tagCallback : e => {
                    e.preventDefault();
                    window.location.href = `/portfolio?tag=${props.project.tag.split(' ').join('')}`;
                }}>{props.project.tag}</p>
                <ul className="Skills">
                    {props.project.skills.map((skill, i) => {
                        return <li key={i}>{skill}</li>
                    })}
                </ul>
            </div>
        </div>
    </a>
}

export default PortfolioCard;