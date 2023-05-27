import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import WindowCache from "./windowCache";

type Props = {
    portfolioConfig: PortfolioConfig[],
    pageName: string
}

const AddPageView: FunctionComponent<Props> = (props) => {
    const [cacheHasLoaded, setCacheHasLoaded] = useState(false)
    const windowCache = useRef(new WindowCache(setCacheHasLoaded));

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

    const [pageViews, setPageViews] = useState<{
        [pageName: string]: number
    }>(defaultPageViews);

    windowCache.current.registerCache('pageLoads', pageViews, setPageViews);

    useEffect(() => {
        setPageViews(oldPageViews => {
            return {...oldPageViews,
                [props.pageName]: oldPageViews[props.pageName] + 1
            }
        })
    }, [cacheHasLoaded]);

    return <></>
}

export default AddPageView;