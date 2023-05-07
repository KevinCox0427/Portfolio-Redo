import React, { Fragment, FunctionComponent } from "react";
import { SectionContent } from "../../Home";
import Title from "../Title";

type Props = {
    sectionContent: SectionContent,
    style: React.CSSProperties,
    portfolioConfig: PortfolioConfig
}

const WebSection: FunctionComponent<Props> = (props) => {
    
    return <div id="web" className='Section' style={props.style}>
        <Title content={props.sectionContent.content}></Title>
        <div className="Example">
            {props.portfolioConfig.map((portfolio, i) => {
                if(i >= 4) return <Fragment key={i}></Fragment>

                return <div key={i} className="PortfolioPiece">
                    <a href={portfolio.route} className="ImageWrapper">
                        <img src={portfolio.logo}></img>
                    </a>
                    <div className="Description">
                        <h4>{portfolio.name}</h4>
                        <p>{portfolio.description}</p>
                        <a className="Link" href={portfolio.route}>Read More <i className="fa-solid fa-angle-right"></i></a>
                    </div>
                </div>
            })}
            <div className="PortfolioButton">
                <a href="/portfolio">View my full portfolio</a>
            </div>
        </div>
    </div>
}

export default WebSection;