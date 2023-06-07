import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import WindowCache from "./windowCache";

type Props = {
    portfolioConfig: PortfolioConfig[],
    pageName: string
}

/**
 * A React component to load the page views from local storage and add 1 to the current page.
 * @param portfolioConfig The portfolio configuration for creating a full sitemap
 * @param pageName The name of the current page to add a view.
 */
const AddPageView: FunctionComponent<Props> = (props) => {
    /**
     * Loading the values from local storage via the WindowCache utility class.
     * See pages/components/windowCache.ts for more details.
     */
    const [cacheHasLoaded, setCacheHasLoaded] = useState(false);
    const windowCache = useRef(new WindowCache(setCacheHasLoaded));

    /**
     * Loading a full site map with all the values at 0 for the default start.
     */
    let defaultPageViews = {
        "": 0,
        portfolio: 0,
        resume: 0,
        contact: 0
    };

    props.portfolioConfig.forEach(project => {
        defaultPageViews = {...defaultPageViews,
            [`portfolio/${project.route}`]: 0
        }
    });

    /**
     * Setting a state variable with the default values.
     */
    const [pageViews, setPageViews] = useState<{
        [pageName: string]: number
    }>(defaultPageViews);

    /**
     * Registering this state variable in the Window Cache class.
     * This will also set state for any values found in the local storage.
     */
    windowCache.current.registerCache('pageLoads', pageViews, setPageViews);

    /**
     * Once the Window Cache has fully loaded all values from the local storage, then we'll add 1 to the current page.
     * The Window Cache class will then save the new value into local storage. 
     */
    useEffect(() => {
        if(!cacheHasLoaded) return;
        setPageViews(oldPageViews => {
            return {...oldPageViews,
                [props.pageName]: oldPageViews[props.pageName] + 1
            }
        })
    }, [cacheHasLoaded]);

    return <></>
}

export default AddPageView;