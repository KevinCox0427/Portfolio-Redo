import React, { FunctionComponent } from "react";

type Props = {
    project: PortfolioConfig,
    style?: React.CSSProperties,
    tagCallback?: React.MouseEventHandler<HTMLParagraphElement>
}

const PortfolioCard: FunctionComponent<Props> = (props) => {
    
    return <div className="Project" style={props.style ? props.style : {}}>
        <a href={`/portfolio/${props.project.route}`} className="ImageWrapper">
            <img src={props.project.logo}></img>
        </a>
        <div className="Card">
            <a href={`/portfolio/${props.project.route}`}>
                <h2>{props.project.name}</h2>
            </a>
            <p className="Description">{props.project.description}</p>
            <div className="Tags">
                {props.tagCallback ? 
                    <p className="Tag" onClick={props.tagCallback}>{props.project.tag}</p>
                :
                    <a href={`/portfolio?tag=${props.project.tag.split(' ').join('')}`} className="Tag">{props.project.tag}</a>
                }
                <ul className="Skills">
                    {props.project.skills.map((skill, i) => {
                        return <li key={i}>{skill}</li>
                    })}
                </ul>
            </div>
        </div>
    </div>
}

export default PortfolioCard;