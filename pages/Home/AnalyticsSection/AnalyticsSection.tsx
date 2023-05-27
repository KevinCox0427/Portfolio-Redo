import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import WindowCache from "../../parts/windowCache";
import WatchTime from "./WatchTime";
import UserData from "./UserData";
import Heatmap from "./HeatMap";
import Title from "../Title";
import PageViews from "./PageViews";

declare global {
    type Analytics = {
        userData: {
            location: {
                ip: string,
                city: string,
                ll: [number, number]
            },
            agent: {
                os: string,
                browser: string
            }
        },
        heatMap: number[][],
    }
}

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
    domain: string
}

const AnalyticsSection:FunctionComponent<Props> = (props) => {
    const [analytics, setAnalytics] = useState<Analytics>({
        userData: {
            location: {
                ip: '',
                city: '',
                ll: [0,0]
            },
            agent: {
                os: '',
                browser: ''
            }
        },
        heatMap: []
    });
    props.windowCache.registerCache('DreamStateAnalytics', analytics, setAnalytics);

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
            <UserData analytics={analytics} setAnalytics={setAnalytics} cacheHasLoaded={props.cacheHasLoaded}></UserData>
            <WatchTime watchTime={props.watchTime} currentSection={props.currentSection} resetWatchTime={props.resetWatchTime}></WatchTime>
            <Heatmap analytics={analytics} setAnalytics={setAnalytics}></Heatmap>
            <PageViews pageViews={pageViews} resetPageViews={resetPageViews} domain={props.domain}></PageViews>
        </div>
    </div>
}

export default AnalyticsSection;