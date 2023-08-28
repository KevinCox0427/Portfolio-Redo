import React, { Fragment, FunctionComponent } from "react";
import Title from "../components/Title";
import PortfolioCard from "../../components/PortfolioCard";
import portfolioConfig from '../../portfolioConfig.json';
import { useSelector } from "../../store/store";

/**
 * A component to render the web section on the homepage
 */
const WebSection: FunctionComponent = () => {
    const sectionContent = useSelector(state => state.sectionContent.web);

    return <div id="web" className='Section' style={{
        order: sectionContent.order,
        zIndex: 6 - sectionContent.order
    }}>
        <Title
            content={sectionContent.content}
        ></Title>
        <div className="Example">
            {portfolioConfig.map((project, i) => {
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