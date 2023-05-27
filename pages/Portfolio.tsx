import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { hydrateRoot } from "react-dom/client";
import Header from "./parts/Header";
import Footer from "./parts/Footer";
import PortfolioCard from "./parts/PortfolioCard";
import AddPageView from "./parts/AddPageView";

declare global {
    type PortfolioPageProps = {
        portfolioConfig: PortfolioConfig[],
        currentTag: string
    }
}

type Props = {
    ServerProps: ServerPropsType
}

const Portfolio: FunctionComponent<Props> = (props) => {
    if(!props.ServerProps.portfolioPageProps) return <></>;

    const [projects, setProjects] = useState(props.ServerProps.portfolioPageProps.portfolioConfig);
    const [selectedTag, setSelectedTag] = useState(props.ServerProps.portfolioPageProps.currentTag);

    useEffect(() => {
        const urlTag = window.location.href.split('/portfolio')[1];
        if(
            (urlTag !== '' && selectedTag === 'all') ||
            (urlTag !== `?tag=${selectedTag}` && selectedTag !== 'all')
        ) {
            window.history.pushState({}, '', `/portfolio${selectedTag === 'all' ? '' : '?tag=' + selectedTag}`);
        }
        
        setProjects([]);
        setTimeout(() => {
            setProjects(props.ServerProps.portfolioPageProps!.portfolioConfig.filter(project => {
                return project.tag.split(' ').join('') === selectedTag || selectedTag === 'all';
            }));
        }, 10);
    }, [selectedTag]);
    
    return <>
        <AddPageView portfolioConfig={props.ServerProps.portfolioPageProps.portfolioConfig} pageName="portfolio"></AddPageView>
        <Header></Header>
        <main className="Contain">
            <h1>Portfolio Projects</h1>
            <div className="TagsWrapper">
                <p className={selectedTag === 'all' ? 'Activated' : ' '} onClick={() => {
                    setSelectedTag('all');
                }}>All</p>
                <p className={selectedTag === 'WebDevelopment' ? 'Activated' : ' '} onClick={() => {
                    setSelectedTag('WebDevelopment');
                }}>Web Development</p>
                <p className={selectedTag === 'GraphicDesign' ? 'Activated' : ' '} onClick={() => {
                    setSelectedTag('GraphicDesign');
                }}>Graphic Design</p>
            </div>
            <div className="ProjectsWrapper">
                {projects.map((project, i) => {
                    return <Fragment key={i}>
                        <PortfolioCard project={project} style={{
                            animation: `0.5s ease-in-out ${i*0.25}s forwards SlideDown`
                        }} tagCallback={() => {
                            setSelectedTag(project.tag.split(' ').join(''));
                        }}></PortfolioCard>
                    </Fragment>
                })}
            </div>
        </main>
        <Footer portfolioConfig={props.ServerProps.portfolioPageProps.portfolioConfig}></Footer>
    </>
}

if(typeof window !== 'undefined') hydrateRoot(document.getElementById('root') as HTMLDivElement, <Portfolio ServerProps={window.ServerProps} />);

export default Portfolio;