import React, { FunctionComponent, useState } from "react";
import WindowCache from "../../windowCache";
import WatchTime from "./WatchTime";
import UserData from "./UserData";
import Heatmap from "./HeatMap";
import { SectionContent } from "../../../Home";
import Title from "../Title";

export type { Analytics }

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
    heatMap: number[][]
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
    resetWatchTime: () => void,
    currentSection: number,
    cacheHasLoaded: boolean
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

    return <div id={props.sectionContent.name} className='Section'>
        <Title content={props.sectionContent.content}></Title>
        <div className="GraphWrapper">
            <UserData analytics={analytics} setAnalytics={setAnalytics} cacheHasLoaded={props.cacheHasLoaded}></UserData>
            <WatchTime watchTime={props.watchTime} currentSection={props.currentSection} resetWatchTime={props.resetWatchTime}></WatchTime>
            <Heatmap analytics={analytics} setAnalytics={setAnalytics}></Heatmap>
            <div className="Graph LinkTracking">
                <h3>Links:</h3>
            </div>
        </div>
    </div>
}

export default AnalyticsSection;