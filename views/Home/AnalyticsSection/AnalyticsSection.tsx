import React, { FunctionComponent } from "react";
import WatchTime from "./WatchTime";
import UserData from "./UserData";
import Heatmap from "./Heatmap";
import Title from "../components/Title";
import PageViews from "./PageViews";
import { useSelector } from "../../store/store";

type Props = {
    domain: string
}

/**
 * A component for the analytics section of the homepage.
 * @param domain The domain that this build is currently running on. This is to display proper urls when show the page views for each route.
 */
const AnalyticsSection:FunctionComponent<Props> = (props) => {
    const content = useSelector(state => state.sectionContent.analytics);

    return <div id="analytics" className='Section' style={{
        order: content.order,
        zIndex: 6 - content.order
    }}>
        <Title
            content={content.content}
        ></Title>
        <div className="GraphWrapper">
            <UserData></UserData>
            <WatchTime></WatchTime>
            <Heatmap></Heatmap>
            <PageViews
                domain={props.domain}
            ></PageViews>
        </div>
    </div>
}

export default AnalyticsSection;