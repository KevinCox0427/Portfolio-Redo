import React, { Fragment, FunctionComponent } from "react";
import Title from "../components/Title";
import PortfolioCard from "../../components/PortfolioCard";

type Props = {
    sectionContent: SectionContent,
    portfolioConfig: PortfolioConfig[]
}

/**
 * A component to render the web section on the homepage
 * @param sectionContent The title and description of this section. (Can change)
 * @param portfolioConfig The configuration of the portfolio. This is used to link the 4 most recent projects.
 */
const WebSection: FunctionComponent<Props> = (props) => {
    return <div id="web" className='Section' style={{
        order: props.sectionContent.order,
        zIndex: 6 - props.sectionContent.order
    }}>
        <Title
            content={props.sectionContent.content}
        ></Title>
        <div className="Example">
            {props.portfolioConfig.map((project, i) => {
                if(i >= 4) return <Fragment key={i}></Fragment>
                return <Fragment key={i}>
                    <PortfolioCard
                        project={project}
                    ></PortfolioCard>
                </Fragment>
            })}
            <div className="PortfolioButton">
                <a href="/portfolio">View my full portfolio</a>
            </div>
        </div>
    </div>
}

export default WebSection;