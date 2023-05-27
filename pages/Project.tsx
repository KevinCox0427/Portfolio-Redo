import React, { FunctionComponent } from "react";
import { hydrateRoot } from "react-dom/client";
import Header from "./parts/Header";
import Footer from "./parts/Footer";
import AddPageView from "./parts/AddPageView";
import PortfolioCard from "./parts/PortfolioCard";

declare global {
    type ProjectPageProps = {
        portfolioConfig: PortfolioConfig[],
        projectIndex: number
    }
}

type Props = {
    ServerProps: ServerPropsType
}

const Project: FunctionComponent<Props> = (props) => {
    if(typeof props.ServerProps.projectPageProps === 'undefined') return <></>;

    const project = props.ServerProps.projectPageProps.portfolioConfig[props.ServerProps.projectPageProps.projectIndex];

    const nextProject = props.ServerProps.projectPageProps.portfolioConfig[props.ServerProps.projectPageProps.projectIndex + 1 < props.ServerProps.projectPageProps.portfolioConfig.length ? props.ServerProps.projectPageProps.projectIndex + 1 : 0];

    const previousProject = props.ServerProps.projectPageProps.portfolioConfig[props.ServerProps.projectPageProps.projectIndex - 1 < 0 ? props.ServerProps.projectPageProps.portfolioConfig.length - 1 : props.ServerProps.projectPageProps.projectIndex - 1];
    
    return <>
        <AddPageView portfolioConfig={props.ServerProps.projectPageProps.portfolioConfig} pageName={`portfolio/${project.route}`}></AddPageView>
        <Header></Header>
        <main className="Contain">
            <div className="Headline">
                {project.link ? 
                    <a href={project.link} target="_blank" className="Logo">
                        <img src={project.logo}></img>
                    </a>
                : 
                    <div className="Logo">
                        <img src={project.logo}></img>
                    </div>
                }
                <div className="TitleWrapper">
                    <h1>{project.name}</h1>
                    <ul className="Skills">
                        {[project.tag, ...project.skills].map((skill, i) => <li key={i}>{skill}</li>)}
                    </ul>
                </div>
            </div>
            <div className="Body">
                <div className="Right">
                    <div className="BrowserWrapper">
                        <div className='FakeBrowser'>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                        <div className="MainImage">
                            <img src={project.gallery[0]}></img>
                        </div>
                    </div>
                </div>
                <div className="Left">
                    <h2 className="Title">The Client</h2>
                    <p>{project.description}</p>
                    <h2 className="Title">The Project</h2>
                    <p>{project.problem}</p>
                    <h2 className="Title">The Solution</h2>
                    <p>{project.solution}</p>
                    {project.link ? <a href={project.link} target="_blank">View their website</a> : <></>}
                </div>
            </div>
            <div className="Gallery">
                <h2 className="Title">Gallery</h2>
                {project.gallery.map((url, i) => <div key={i} className="BrowserWrapper">
                    <div className='FakeBrowser'>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div className="MainImage">
                        <img src={url}></img>
                    </div>
                </div>)}
            </div>
            <div className="Suggestions">
                <h2 className="Title">Suggestions</h2>
                <div className="Suggestion">
                    <a className="SuggestLink" href={`/portfolio/${previousProject.route}`}>Previous</a>
                    <PortfolioCard project={previousProject}></PortfolioCard>
                </div>
                <div className="Suggestion">
                    <a className="SuggestLink" href={`/portfolio/${nextProject.route}`}>Next</a>
                    <PortfolioCard project={nextProject}></PortfolioCard>
                </div>
            </div>
        </main>
        <Footer portfolioConfig={props.ServerProps.projectPageProps.portfolioConfig}></Footer>
    </>
}

if(typeof window !== 'undefined') hydrateRoot(document.getElementById('root') as HTMLDivElement, <Project ServerProps={window.ServerProps} />);

export default Project;