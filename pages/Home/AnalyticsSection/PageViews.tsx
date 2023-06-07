import React, { FunctionComponent, useEffect, useState } from "react";
import WindowCache from "../../components/windowCache";

type Props = {
    portfolioConfig: PortfolioConfig[],
    windowCache: WindowCache,
    cacheHasLoaded: boolean,
    domain: string
}

/**
 * A component to be used in the analytics section for the homepage to display to the user how many times they've visited each page.
 * 
 * @param portfolioConfig The portfolio configuration object. This is used to list each project's page and its viewcount.
 * @param windowCache The utility class to save the page views each time a state change occurs. (AKA when they first load the page).
 * @param cacheHasLoaded A state variable representing whether the utility class has finished loading its values from local storage.
 * @param domain The name of the domain that this is currently running on. This is used to display full urls on the view coutns.
 */
const PageViews: FunctionComponent<Props> = (props) => {
    /**
     * Loading a defaulted site map with 0 views at every page.
     */
    let defaultPageViews = {
        "": 0,
        portfolio: 0,
        about: 0,
        contact: 0
    };
    props.portfolioConfig.forEach(project => {
        defaultPageViews = {...defaultPageViews,
            [`portfolio/${project.route}`]: 0
        }
    });

    /**
     * Setting a state variable to represent the page views.
     * Also loading it from local storage if found.
     */
    const [pageViews, setPageViews] = useState<{
        [pageName: string]: number
    }>(defaultPageViews);

    props.windowCache.registerCache('pageLoads', pageViews, setPageViews);

    /**
     * A function to revert everything back to this default state.
     */
    function resetPageViews() {
        setPageViews(defaultPageViews);
    }

    /**
     * After the utility class has loaded its values from local storage, add one to the current page to represent this page view.
     */
    useEffect(() => {
        if(!props.cacheHasLoaded) return;
        setPageViews(oldPageViews => {
            return {...oldPageViews,
                "": oldPageViews[""] + 1
            }
        })
    }, [props.cacheHasLoaded]);
    
    return <div className="Graph PageViews">
        <h3>
            Page Views:
            <i className="fa-solid fa-rotate-left Reset" onClick={resetPageViews}></i>
        </h3>
        <div className="Wrapper">
            {Object.keys(pageViews).sort((a, b) => {
                if(a === b) return 0;
                return a > b ? 1 : -1;
            }).map((pageName, i) => {
                return <div className="Row" key={i} style={{
                    paddingLeft: `${(pageName.split('/').length - 1) * 2}em`
                }}>
                    <a href={`/${pageName}`}>
                        {pageName.split('/').length === 1 ? props.domain : ''}
                        /
                        {pageName.split('/')[pageName.split('/').length - 1]}:</a>
                    <p>{pageViews[pageName]}</p>
                </div>
            })}
        </div>
    </div>
}

export default PageViews;