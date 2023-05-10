import React, { Fragment, FunctionComponent, useState } from "react";
import { hydrateRoot } from "react-dom/client";
import Header from "./parts/Header";
import Footer from "./parts/Footer";
import PortfolioCard from "./parts/PortfolioCard";

type Props = {
    ServerProps: ServerPropsType
}

const Portfolio: FunctionComponent<Props> = (props) => {
    if(!props.ServerProps.portfolioConfig) return <></>;

    const [selectedTag, setSelectedTag] = useState('all');
    
    return <>
        <Header></Header>
        <main className="Contain">
            <h1>Portfolio Projects</h1>
            <div className="TagsWrapper">
                <p className={selectedTag === 'all' ? 'Activated' : ' '}>All</p>
                <p className={selectedTag === 'web' ? 'Activated' : ' '}>Web Development</p>
                <p className={selectedTag === 'design' ? 'Activated' : ' '}>Graphic Design</p>
            </div>
            <div className="ProjectsWrapper">
                {props.ServerProps.portfolioConfig.map((project, i) => {
                    return <Fragment key={i}>
                        <PortfolioCard project={project}></PortfolioCard>
                    </Fragment>
                })}
            </div>
        </main>
        <Footer portfolioConfig={props.ServerProps.portfolioConfig ? props.ServerProps.portfolioConfig : []}></Footer>
    </>
}

if(typeof window !== 'undefined') hydrateRoot(document.getElementById('root') as HTMLDivElement, <Portfolio ServerProps={window.ServerProps} />);

export default Portfolio;