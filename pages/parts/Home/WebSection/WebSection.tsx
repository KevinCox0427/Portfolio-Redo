import React, { FunctionComponent } from "react";
import { PortfolioPiece, SectionContent } from "../../../Home";
import Title from "../Title";

type Props = {
    sectionContent: SectionContent,
    portfolioData: PortfolioPiece[],
    style: React.CSSProperties
}

const WebSection: FunctionComponent<Props> = (props) => {
    
    return <div id="web" className='Section' style={props.style}>
        <Title content={props.sectionContent.content}></Title>
        <div className="Example">
            {props.portfolioData.map((portfolio, i) => {
                return <div key={i} className="PortfolioPiece">
                    <div className="ImageWrapper">
                        <img src={portfolio.image}></img>
                    </div>
                    <div className="Description">
                        <h4>{portfolio.title}</h4>
                        <p>{portfolio.description}</p>
                        <a className="Link" href={portfolio.link}>Read More <i className="fa-solid fa-angle-right"></i></a>
                    </div>
                </div>
            })}
            <a className="PortfolioButton" href="/portfolio">View my full portfolio</a>
        </div>
    </div>
}

export default WebSection;