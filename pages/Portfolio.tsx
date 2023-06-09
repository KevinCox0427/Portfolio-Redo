import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { hydrateRoot } from "react-dom/client";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PortfolioCard from "./components/PortfolioCard";
import AddPageView from "./components/AddPageView";

/**
 * Declaring globally what properties this page should inherited from the server under "Page404Props".
 */
declare global {
    type PortfolioPageProps = {
        portfolioConfig: PortfolioConfig[],
        currentTag: string
    }
}

type Props = {
    ServerProps: ServerPropsType
}

/**
 * A React page that will render the portfolio page. This is being rendered on the server and hydrated on the client.
 * 
 * @param portfolioConfig The configuration of the portfolio to render its content appropriately.
 * @param currentTag The starting tag to filter projects with.
 */
const Portfolio: FunctionComponent<Props> = (props) => {
    const pageProps = props.ServerProps.portfolioPageProps;
    if(!pageProps) return <></>;

    const [projects, setProjects] = useState(pageProps.portfolioConfig);

    const tags:string[] = [];
    projects.forEach(project => {
        if(!tags.includes(project.tag)) tags.push(project.tag);
    })

    const [selectedTag, setSelectedTag] = useState(tags.every(tag => tag !== decodeURIComponent(pageProps!.currentTag)) ? 'all' : decodeURIComponent(pageProps.currentTag));

    /**
     * Callback function such that when a tag is changed, the appropriate projects are displayed.
     */
    useEffect(() => {
        const urlTag = window.location.href.split('/portfolio')[1];
        if(
            (urlTag !== '' && selectedTag === 'all') ||
            (urlTag !== `?tag=${selectedTag}` && selectedTag !== 'all')
        ) {
            window.history.pushState({}, '', `/portfolio${selectedTag === 'all' ? '' : '?tag=' + encodeURIComponent(selectedTag)}`);
        }
        
        /**
         * Forcing a re-render for project elements so the animation will fire.
         */
        setProjects([]);
        setTimeout(() => {
            setProjects(pageProps!.portfolioConfig.filter(project => {
                return project.tag === selectedTag || selectedTag === 'all';
            }));
        }, 10);
    }, [selectedTag]);

    console.log(selectedTag)
    
    return <>
        <AddPageView portfolioConfig={pageProps.portfolioConfig} pageName="portfolio"></AddPageView>
        <Header></Header>
        <main className="Contain">
            <h1>Portfolio Projects</h1>
            <div className="TagsWrapper">
                <p className={selectedTag === 'all' ? 'Activated' : ' '} onClick={() => {setSelectedTag('all')}}>All</p>
                {tags.map((tag, i) => {
                    return <p className={selectedTag === tag ? 'Activated' : ' '} key={i} onClick={() => {setSelectedTag(tag)}}>{tag}</p>
                })}
            </div>
            <div className="ProjectsWrapper">
                {projects.map((project, i) => {
                    return <Fragment key={i}>
                        <PortfolioCard project={project} style={{
                            animation: `0.5s ease-in-out ${i*0.15}s forwards SlideDown`
                        }} tagCallback={(e: React.MouseEvent) => {
                            e.preventDefault();
                            setSelectedTag(project.tag);
                        }}></PortfolioCard>
                    </Fragment>
                })}
            </div>
        </main>
        <Footer portfolioConfig={pageProps.portfolioConfig}></Footer>
    </>
}

if(typeof window !== 'undefined') hydrateRoot(document.getElementById('root') as HTMLDivElement, <Portfolio ServerProps={window.ServerProps} />);

export default Portfolio;