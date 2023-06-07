import React, { FunctionComponent } from "react";

type Props = {
    watchTime: {
        start: number,
        timeStamps: {
            [sectionName: string]: number
        }
    },
    resetWatchTime: () => void,
    currentSection: string
}

/**
 * A component for the Analytics section on the homepage that displays the watch time for each section on a bar graph.
 * 
 * @param watchTime An object that stores the view times for each section
 * @param resetWatchTime A function that resets all the view times to 0
 * @param currentSection A state variable that indicates what section on the homepage a user is currently viewing. 
 */
const WatchTime:FunctionComponent<Props> = (props) => {
    /**
     * Each section's label on the x axis of the bar graph being rendered.
     */
    const XAxisLabels = ["Landing Page", "Optimized Data", "Secure Authentication", "Seamless Integrations", "Detailed Analytics", "User Interfaces", "Beautiful Websites", "Footer"];

    /**
     * A function that converts an integer represnting milliseconds in a HH:MM:SS format.
     * @param time The time in milliseconds.
     */
    function createTimeString(time: number) {
        const hours = Math.floor((time/1000) / 3600);
        const minutes = Math.floor((time/1000) / 60) % 60;
        const seconds = Math.floor((time/100) % 600) / 10;
        return (hours ? `${hours}h ` : '') + (minutes ? `${minutes}m ` : '') + `${seconds}s`;
    }

    /**
     * Reducing the timestamps to find the largest one. This will be used to determine the labels on the Y-axis.
     */
    const largestTimestamp = Object.keys(props.watchTime.timeStamps).reduce((largestTimestamp, sectionKey) => {
        const value = props.watchTime.timeStamps[sectionKey as keyof typeof props.watchTime.timeStamps];
        return value > largestTimestamp ? value : largestTimestamp;
    }, 0);

    return <div className="Graph WatchTime">
        <h3>
            Watch Time:
            <i className="fa-solid fa-rotate-left Reset" onClick={props.resetWatchTime}></i>
        </h3>
        <div className="AxisWrapper" style={{
            gridTemplateColumns: `clamp(0.1px, 4.5em, ${100/(XAxisLabels.length+3)}vw) ${`clamp(0.1px, 3.5em, ${100/(XAxisLabels.length+3)}vw) `.repeat(XAxisLabels.length)}`
        }}>
            <div className="Column">
                <div className="YLabels">
                    {Array.from(''.repeat(3)).map((_, i) => {
                        return <p key={i}>{
                            createTimeString(largestTimestamp*((3-i)/3))
                        }</p>
                    })}
                    <p>0s</p>
                </div>
                <div className="Spacer"></div>
            </div>
            {Object.keys(props.watchTime.timeStamps).map((timeStampKey, i) => {
                const value = props.watchTime.timeStamps[timeStampKey as keyof typeof props.watchTime.timeStamps];
                
                return <div key={i} className="Column">
                    <div className="Timestamp">
                        <p className="Value" style={{
                            height: props.currentSection === 'analytics' ? `${(value/largestTimestamp) * 100}%` : '0%'
                        }}>
                            {createTimeString(value)}
                        </p>
                    </div>
                    <p className="XLabel">
                        <span>{XAxisLabels[i]}</span>
                    </p>
                </div>
            })}
        </div>
    </div>
}

export default WatchTime;