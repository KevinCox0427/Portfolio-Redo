import React, { FunctionComponent } from "react";

type Props = {
    project: PortfolioConfig
}

const PortfolioCard: FunctionComponent<Props> = (props) => {
    
    return <div className="Project">
        <a href={props.project.link} className="ImageWrapper">
            <img src={props.project.logo}></img>
        </a>
        <a href={props.project.link}><h2>{props.project.name}</h2></a>
        <div className="Description">
            <p className="Left">{props.project.description}</p>
            <div className="Right">
                <p className="Tag">{props.project.tag}</p>
                <div className="Skills">
                    {props.project.skills.map((skill, i) => {
                        return <p key={i}>{skill}</p>
                    })}
                </div>
            </div>
        </div>
    </div>
}

export default PortfolioCard;