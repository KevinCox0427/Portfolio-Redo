import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { hydrateRoot } from "react-dom/client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PortfolioCard from "../components/PortfolioCard";
import AddPageView from "../components/AddPageView";

// Declaring what properties this page should inherited from the server.
type Props = {
    ServerProps: {
        portfolioConfig: PortfolioConfig[],
        currentTag: string
    }
}

/**
 * A React page that will render the portfolio page. This is being rendered on the server and hydrated on the client.
 * @param portfolioConfig The configuration of the portfolio to render its content appropriately.
 * @param currentTag The starting tag to filter projects with.
 */
const Portfolio: FunctionComponent<Props> = (props) => {
    // Making sure we inherited the props from the server.
    const pageProps = props.ServerProps;
    if(!pageProps) return <></>;

    // Setting state for what projects to render based on tags.
    const [projects, setProjects] = useState(pageProps.portfolioConfig);

    // Getting every tag option.
    let tags = pageProps.portfolioConfig.map(project => project.tag);
    tags = tags.filter((tag, i) => tags.indexOf(tag) === i);

    // State variable for what tag is selected. 
    const [selectedTag, setSelectedTag] = useState(tags.includes(decodeURIComponent(pageProps!.currentTag))
        ? decodeURIComponent(pageProps.currentTag)
        : 'all'
    );

    // Callback function such that when a tag is changed, the appropriate projects are displayed.
    useEffect(() => {
        // Updating the query parameter in the url to reflect the change.
        const urlTag = window.location.href.split('/portfolio')[1];

        if(urlTag !== '' && selectedTag === 'all'){
            window.history.pushState({}, '', '/portfolio');
        }
        if(urlTag !== `?tag=${selectedTag}` && selectedTag !== 'all') {
            window.history.pushState({}, '', `/portfolio?tag=${encodeURIComponent(selectedTag)}`);
        }
        
        // Forcing a re-render for project elements so the animations will fire.
        setProjects([]);
        setTimeout(() => {
            setProjects(pageProps!.portfolioConfig.filter(project => project.tag === selectedTag || selectedTag === 'all'));
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
        <AddPageView
            portfolioConfig={pageProps.portfolioConfig}
            pageName="portfolio"
        ></AddPageView>
        <Header></Header>
        <div className="Contain" id="Portfolio">
            <div className="Title">
                <h1>Portfolio Projects</h1>
                <p>{projects.length}/{pageProps.portfolioConfig.length}</p>
            </div>
            <div className="TagsWrapper">
                <p className={selectedTag === 'all' ? 'Activated' : ' '} onClick={() => {setSelectedTag('all')}}>All</p>
                {tags.map((tag, i) => {
                    return <p className={selectedTag === tag ? 'Activated' : ' '} key={i} onClick={() => {setSelectedTag(tag)}}>{tag}</p>
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
        <Footer
            portfolioConfig={pageProps.portfolioConfig}
        ></Footer>
    </>
}

if(typeof window !== 'undefined') hydrateRoot(document.getElementById('root') as HTMLDivElement, <Portfolio ServerProps={window.ServerProps} />);

export default Portfolio;