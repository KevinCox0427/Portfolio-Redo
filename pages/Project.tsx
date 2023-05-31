import React, { Fragment, FunctionComponent } from "react";
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
        <article className="Contain">
            <div className="Headline">
                {project.link ? 
                    <a href={project.link} target="_blank" className="Logo" rel="nofollow">
                        <img src={project.logo} alt={`${project.name} logo`}></img>
                    </a>
                : 
                    <div className="Logo">
                        <img src={project.logo} alt={`${project.name} logo`} rel="nofollow"></img>
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
                <div className="Left">
                    <h2 className="Title">The Client</h2>
                    {project.description.map((text, i) => <p key={i}>{text}</p>)}
                    <h2 className="Title">The Project</h2>
                    {project.problem.map((text, i) => <p key={i}>{text}</p>)}
                    <h2 className="Title">The Solution</h2>
                    {project.solution.map((text, i) => <p key={i}>{text}</p>)}
                    {project.link ? <a href={project.link} target="_blank" rel="nofollow">View their website</a> : <></>}
                </div>
                <div className="Right">
                    <div className="BrowserWrapper">
                        <div className='FakeBrowser'>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                        <div className="MainImage">
                            <img src={project.gallery[0]} alt={`${project.name} website image`}></img>
                        </div>
                    </div>
                </div>
            </div>
            <div className="Gallery">
                {project.gallery.map((url, i) => {
                    // if(i === 0) return <Fragment key={i}></Fragment>
                    return <div key={i} className="BrowserWrapper">
                        <div className='FakeBrowser'>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                        <div className="MainImage">
                            <img src={url} alt={`${project.name} gallery photo #${i+1}`}></img>
                        </div>
                    </div>
                })}
            </div>
            <div className="Suggestions">
                <div className="Suggestion">
                    <div className="SuggestLink">
                        <a href={`/portfolio/${previousProject.route}`}>Previous</a>
                    </div>
                    <PortfolioCard project={previousProject}></PortfolioCard>
                </div>
                <div className="Suggestion">
                    <div className="SuggestLink">
                        <a href={`/portfolio/${nextProject.route}`}>Next</a>
                    </div>
                    <PortfolioCard project={nextProject}></PortfolioCard>
                </div>
            </div>
        </article>
        <Footer portfolioConfig={props.ServerProps.projectPageProps.portfolioConfig}></Footer>
    </>
}

if(typeof window !== 'undefined') hydrateRoot(document.getElementById('root') as HTMLDivElement, <Project ServerProps={window.ServerProps} />);

export default Project;