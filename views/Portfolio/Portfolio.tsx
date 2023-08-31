import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { hydrateRoot } from "react-dom/client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PortfolioCard from "../components/PortfolioCard";
import portfolioConfig from "../portfolioConfig.json";
import LoadFromCache from "../components/LoadFromCache";
import { Provider } from "react-redux";
import { store } from "../store/store";

/**
 * A React page that will render the portfolio page. This is being rendered on the server and hydrated on the client.
 */
const Portfolio: FunctionComponent = () => {
    // Setting state for what projects to render based on tags.
    const [projects, setProjects] = useState(portfolioConfig);

    // Getting every tag option.
    let tags = portfolioConfig.map(project => project.tag);
    tags = tags.filter((tag, i) => tags.indexOf(tag) === i);

    // State variable for what tag is selected. 
    const [selectedTag, setSelectedTag] = useState('');

    /**
     * An event handler to toggle the tags on the portfolio page.
     * @param tag The tag being toggled
     */
    function toggleTag(tag: string) {
        if(tag === selectedTag) setSelectedTag('');
        else setSelectedTag(tag);
    }

    // Getting the starting tag from url since this is being prerendered / hydrated
    useEffect(() => {
        const startingTag = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('tag')
            ? new URLSearchParams(window.location.search).get('tag')!
            : '';
        setSelectedTag(startingTag);
    }, [])

    // Callback function such that when a tag is changed, the appropriate projects are displayed.
    useEffect(() => {
        // Forcing a re-render for project elements so the animations will fire.
        setProjects([]);
        setTimeout(() => {
            setProjects(portfolioConfig.filter(project => project.tag === selectedTag || selectedTag === ''));
        }, 10);
    }, [selectedTag]);

    /**
     * Event handler to change the current tag that's selected.
     * @param tag The tag to change to.
     */
    function handleTagClick(e: React.MouseEvent, tag:string) {
        // Preventing default since it's wrapped by an A tag and we don't want the user redirected.
        e.preventDefault();
        setSelectedTag(tag);
        // Scrolling to the top of the page when a new tag is selected.
        setTimeout(() => document.body.parentElement!.scrollTo(0, 1), 50);
    }
    
    return <>
        <LoadFromCache currentPage="portfolio"></LoadFromCache>
        <Header></Header>
        <div className="Contain" id="Portfolio">
            <div className="Title">
                <h1>Portfolio Projects</h1>
                <p>{projects.length}/{portfolioConfig.length}</p>
            </div>
            <div className="TagsWrapper">
                {tags.map((tag, i) => {
                    return <button
                        className={selectedTag === tag ? 'Activated' : ' '}
                        key={i}
                        onClick={() => {toggleTag(tag)}}
                    >{tag}</button>
                })}
            </div>
            <div className="ProjectsWrapper">
                {projects.map((project, i) => {
                    return <Fragment key={i}>
                        <PortfolioCard
                            project={project}
                            tagCallback={e => {handleTagClick(e, project.tag)}}
                            style={{
                                animation: `0.5s ease-in-out ${i*0.15}s forwards SlideDown`
                            }} 
                        ></PortfolioCard>
                    </Fragment>
                })}
            </div>
        </div>
        <Footer></Footer>
    </>
}

if (typeof window !== 'undefined') {
    hydrateRoot(
        document.getElementById('root') as HTMLElement,
        <React.StrictMode>
            <Provider store={store}>
                <Portfolio />
            </Provider>
        </React.StrictMode>
    );
}

export default Portfolio;