import React, { FunctionComponent } from "react";
import WindowCache from "../../components/windowCache";
import WatchTime from "./WatchTime";
import UserData from "./UserData";
import Heatmap from "./HeatMap";
import Title from "../components/Title";
import PageViews from "./PageViews";

type Props = {
    windowCache: WindowCache,
    cacheHasLoaded: boolean,
    sectionContent: SectionContent,
    currentSection: string,
    watchTime: {
        start: number,
        timeStamps: {
            [sectionName: string]: number
        }
    },
    setWatchTime: React.Dispatch<React.SetStateAction<Props["watchTime"]>>,
    portfolioConfig: PortfolioConfig[],
    style: React.CSSProperties,
    domain: string,
    locationData: {
        ip: string,
        city: string,
        ll: number[]
    }
}

/**
 * A component for the analytics section of the homepage.
 * 
 * @param windowCache The utility class to save state variables to local storage upon state changes.
 * @param cacheHasLoaded The state variable representing whether the window cache has loaded all it's values from local storage.
 * @param sectionContent The titles and descriptions of each seciton on the homepage. This can be changed by the UI section.
 * @param currentSection The key at which this sections content can be found in sectionContent.
 * @param watchTime The watchtime of each section recorded by the home page. This will be displayed in a bar graph
 * @param resetWatchTime A function to reset of all the watch times to 0s.
 * @param portfolioConfig The configuration of all the porfolio projects. This is to display the site map.
 * @param style Any additional stylings to the wrapper div.
 * @param domain The domain that this build is currently running on. This is to display proper urls when show the page views for each route.
 * @param locationData The data collected on the user via their IP. This is to display this information along with a map of their location.
 */
const AnalyticsSection:FunctionComponent<Props> = (props) => {
    return <div id="analytics" className='Section' style={props.style}>
        <Title content={props.sectionContent.content}></Title>
        <div className="GraphWrapper">
            <UserData locationData={props.locationData}></UserData>
            <WatchTime watchTime={props.watchTime} currentSection={props.currentSection} setWatchTime={props.setWatchTime}></WatchTime>
            <Heatmap windowCache={props.windowCache}></Heatmap>
            <PageViews portfolioConfig={props.portfolioConfig} windowCache={props.windowCache} cacheHasLoaded={props.cacheHasLoaded} domain={props.domain}></PageViews>
        </div>
    </div>
}

export default AnalyticsSection;