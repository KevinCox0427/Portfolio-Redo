import React, { FunctionComponent } from "react";
import { hydrateRoot } from "react-dom/client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AddPageView from "../components/AddPageView";
import PortfolioCard from "../components/PortfolioCard";

/**
 * Declaring what properties this page should inherited from the server.
 */
type Props = {
    ServerProps: {
        portfolioConfig: PortfolioConfig[],
        projectIndex: number
    }
}

/**
 * A React page that will render a project page. This is being rendered on the server and hydrated on the client.
 * 
 * @param portfolioConfig The configuration of the portfolio to render its content appropriately.
 * @param projectIndex The index of this project to get from the portfolioConfig.
 */
const Project: FunctionComponent<Props> = (props) => {
    /**
     * Making sure we've inherited the properties from the server.
     */
    const pageProps = props.ServerProps;
    if(typeof pageProps === 'undefined') return <></>;

    /**
     * References to the current, next and previous projects' data.
     */
    const project = pageProps.portfolioConfig[pageProps.projectIndex];

    const nextProject = pageProps.portfolioConfig[pageProps.projectIndex + 1 < pageProps.portfolioConfig.length ? pageProps.projectIndex + 1 : 0];

    const previousProject = pageProps.portfolioConfig[pageProps.projectIndex - 1 < 0 ? pageProps.portfolioConfig.length - 1 : pageProps.projectIndex - 1];
    
    return <>
        <AddPageView
            portfolioConfig={pageProps.portfolioConfig}
            pageName={`portfolio/${project.route}`}
        ></AddPageView>
        <Header></Header>
        <article className="Contain" id="Project">
            <div className="Headline">
                {project.link ? 
                    <a href={project.link} target="_blank" className="Logo" rel="nofollow">
                        <img src={project.logo} alt={`${project.name} logo`} loading="lazy"></img>
                    </a>
                : 
                    <div className="Logo">
                        <img src={project.logo} alt={`${project.name} logo`} rel="nofollow" loading="lazy"></img>
                    </div>
                }
                <div className="TitleWrapper">
                    <h1>{project.name}</h1>
                    <ul className="Skills">
                        {[project.tag, ...project.skills].map((skill, i) => <li key={i}>{skill}</li>)}
                    </ul>
                </div>
            </div>
            {project.problem || project.solution ? <>
                <div className="Body">
                    <div className="Left">
                        <h2 className="Title">The Client</h2>
                        {project.description.map((text, i) => <p key={i}>{text}</p>)}
                        <h2 className="Title">The Project</h2>
                        {project.problem ? project.problem.map((text, i) => <p key={i}>{text}</p>) : <></>}
                        <h2 className="Title">The Solution</h2>
                        {project.solution ? project.solution.map((text, i) => <p key={i}>{text}</p>) : <></>}
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
                                <img src={project.gallery[0]} alt={`${project.name} website image`} loading="lazy"></img>
                            </div>
                        </div>
                    </div>
                </div>
            </> : <div className="Top">
                {project.description.map((text, i) => <p key={i}>{text}</p>)}
            </div>}
            <div className="Gallery">
                {project.gallery.map((url, i) => {
                    return <div key={i} className="BrowserWrapper">
                        <div className='FakeBrowser'>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                        <div className="MainImage">
                            <img src={url} alt={`${project.name} gallery photo #${i+1}`} loading="lazy"></img>
                        </div>
                    </div>
                })}
            </div>
            <div className="Suggestions">
                <div className="Suggestion">
                    <div className="SuggestLink">
                        <a href={`/portfolio/${nextProject.route}`}>Next</a>
                    </div>
                    <PortfolioCard
                        project={nextProject}
                    ></PortfolioCard>
                </div>
                <div className="Suggestion">
                    <div className="SuggestLink">
                        <a href={`/portfolio/${previousProject.route}`}>Previous</a>
                    </div>
                    <PortfolioCard
                        project={previousProject}
                    ></PortfolioCard>
                </div>
            </div>
        </article>
        <Footer
            portfolioConfig={pageProps.portfolioConfig}
        ></Footer>
    </>
}

if(typeof window !== 'undefined') hydrateRoot(document.getElementById('root') as HTMLDivElement, <Project ServerProps={window.ServerProps} />);

export default Project;