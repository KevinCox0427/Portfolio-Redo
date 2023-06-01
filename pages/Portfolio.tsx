import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { hydrateRoot } from "react-dom/client";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PortfolioCard from "./components/PortfolioCard";
import AddPageView from "./components/AddPageView";

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

    const tags:string[] = [];
    projects.forEach(project => {
        if(!tags.includes(project.tag)) tags.push(project.tag);
    })

    const [selectedTag, setSelectedTag] = useState(tags.every(tag => tag.replace(" ", "") !== props.ServerProps.portfolioPageProps!.currentTag) ? 'all' : props.ServerProps.portfolioPageProps.currentTag);

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
                {tags.map((tag, i) => {
                    return <p className={selectedTag === tag.replace(' ', '') ? 'Activated' : ' '} key={i} onClick={() => {
                        setSelectedTag(tag.replace(' ', ''));
                    }}>{tag}</p>
                })}
            </div>
            <div className="ProjectsWrapper">
                {projects.map((project, i) => {
                    return <Fragment key={i}>
                        <PortfolioCard project={project} style={{
                            animation: `0.5s ease-in-out ${i*0.15}s forwards SlideDown`
                        }} tagCallback={(e: React.MouseEvent) => {
                            e.preventDefault();
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