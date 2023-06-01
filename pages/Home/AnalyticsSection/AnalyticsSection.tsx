import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import WindowCache from "../../components/windowCache";
import WatchTime from "./WatchTime";
import UserData from "./UserData";
import Heatmap from "./HeatMap";
import Title from "../components/Title";
import PageViews from "./PageViews";

type Props = {
    windowCache: WindowCache,
    sectionContent: SectionContent,
    watchTime: {
        start: number,
        timeStamps: {
            [sectionName: string]: number
        }
    },
    portfolioConfig: PortfolioConfig[],
    resetWatchTime: () => void,
    currentSection: string,
    cacheHasLoaded: boolean,
    style: React.CSSProperties,
    domain: string,
    locationData: {
        ip: string,
        city: string,
        ll: number[]
    }
}

const AnalyticsSection:FunctionComponent<Props> = (props) => {
    const [heatmap, setHeatMap] = useState<number[][]>([]);
    props.windowCache.registerCache('heatmap', heatmap, setHeatMap);

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
    
    props.windowCache.registerCache('pageLoads', pageViews, setPageViews);

    useEffect(() => {
        if(!props.cacheHasLoaded) return;
        setPageViews(oldPageViews => {
            return {...oldPageViews,
                "": oldPageViews[""] + 1
            }
        })
    }, [props.cacheHasLoaded]);

    function resetPageViews() {
        setPageViews(defaultPageViews);
    }

    return <div id="analytics" className='Section' style={props.style}>
        <Title content={props.sectionContent.content}></Title>
        <div className="GraphWrapper">
            <UserData locationData={props.locationData} cacheHasLoaded={props.cacheHasLoaded}></UserData>
            <WatchTime watchTime={props.watchTime} currentSection={props.currentSection} resetWatchTime={props.resetWatchTime}></WatchTime>
            <Heatmap heatMap={heatmap} setHeatMap={setHeatMap}></Heatmap>
            <PageViews pageViews={pageViews} resetPageViews={resetPageViews} domain={props.domain}></PageViews>
        </div>
    </div>
}

export default AnalyticsSection;