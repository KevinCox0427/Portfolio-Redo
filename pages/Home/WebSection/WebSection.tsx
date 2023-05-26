import React, { Fragment, FunctionComponent } from "react";
import Title from "../Title";
import PortfolioCard from "../../parts/PortfolioCard";

type Props = {
    sectionContent: SectionContent,
    style: React.CSSProperties,
    portfolioConfig: PortfolioConfig[]
}

const WebSection: FunctionComponent<Props> = (props) => {
    
    return <div id="web" className='Section' style={props.style}>
        <Title content={props.sectionContent.content}></Title>
        <div className="Example">
            {props.portfolioConfig.map((project, i) => {
                if(i >= 4) return <Fragment key={i}></Fragment>

                return <Fragment key={i}>
                    <PortfolioCard project={project}></PortfolioCard>
                </Fragment>
            })}
            <div className="PortfolioButton">
                <a href="/portfolio">View my full portfolio</a>
            </div>
        </div>
    </div>
}

export default WebSection;