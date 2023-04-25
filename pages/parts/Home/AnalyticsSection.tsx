import React, { FunctionComponent, useState } from "react";
import WindowCache from "../windowCache";
import WatchTime from "./AnalyticsSection/WatchTime";
import UserData from "./AnalyticsSection/UserData";
import Heatmap from "./AnalyticsSection/HeatMap";
import { SectionContent } from "../../Home";
import parse, { Element } from 'html-react-parser'

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
        {parse(props.sectionContent.content, {
            replace: (node) => {
                const validTags = ['DIV', 'P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'A', 'SPAN', 'EM', 'STRONG', 'SMALL', 'IMAGE'];
                if(!(node instanceof Element)) return node;
                if(validTags.includes(node.tagName)) return node;
                return false;
            }
        })}
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