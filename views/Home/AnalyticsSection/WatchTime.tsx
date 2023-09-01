import React, { FunctionComponent, useEffect } from "react";
import { useSelector, useDispatch } from "../../store/store";
import { resetWatchTime, setNewTimeStamp } from "../../store/watchTime";

/**
 * A component for the Analytics section on the homepage that displays the watch time for each section on a bar graph.
 */
const WatchTime:FunctionComponent = () => {
    const dispatch = useDispatch();
    const watchTime = useSelector(state => state.watchTime);
    const currentSection = useSelector(state => state.currentSection);


    // Each section's label on the x axis of the bar graph being rendered.
    const XAxisLabels = ["Landing Page", "Optimized Data", "Secure Authentication", "Seamless Integrations", "Detailed Analytics", "User Interfaces", "Beautiful Websites", "Footer"];

    /**
     * A function that converts an integer represnting milliseconds in a HH:MM:SS format.
     * @param time The time in milliseconds.
     */
    function createTimeString(time: number) {
        const hours = Math.floor((time/1000) / 3600);
        const minutes = Math.floor((time/1000) / 60) % 60;
        const seconds = Math.floor((time/1000) % 60);
        return (hours ? `${hours}h ` : '') + (minutes ? `${minutes}m ` : '') + `${seconds}s`;
    }

    // Reducing the timestamps to find the largest one. This will be used to determine the labels on the Y-axis.
    const largestTimestamp = Object.keys(watchTime.timeStamps).reduce((largestTimestamp, sectionKey) => {
        const value = watchTime.timeStamps[sectionKey as keyof typeof watchTime.timeStamps];
        return value > largestTimestamp
            ? value
            : largestTimestamp;
    }, 0);

    // A useeffect callback to start a 1 second interval when the user is viewing the analytics section.
    // This is so that the analytics watch time ticks up when the user is looking at the bar graph.
    useEffect(() => {
        if(currentSection === 'analytics') {
            const interval = setInterval(() => dispatch(setNewTimeStamp('analytics')), 1000);
            return () => clearInterval(interval);
        }
    }, [currentSection]);

    return <div className="Graph WatchTime">
        <h3>
            Watch Time:
            <button className="Reset" onClick={() => dispatch(resetWatchTime())}>
                <i className="fa-solid fa-rotate-left"></i>
            </button>
        </h3>
        <div className="AxisWrapper" style={{
            gridTemplateColumns: `clamp(0.1px, 4.5em, ${100/(XAxisLabels.length+3)}vw) ${`clamp(0.1px, 3.5em, ${100/(XAxisLabels.length+3)}vw) `.repeat(XAxisLabels.length)}`
        }}>
            <div className="Column">
                <div className="YLabels">
                    {Array.from(Array(3)).map((_, i) => {
                        return <p key={i}>{
                            createTimeString(largestTimestamp*((3-i)/3))
                        }</p>
                    })}
                    <p>0s</p>
                </div>
                <div className="Spacer"></div>
            </div>
            {Object.keys(watchTime.timeStamps).map((timeStampKey, i) => {
                const value = watchTime.timeStamps[timeStampKey as keyof typeof watchTime.timeStamps];
                
                return <div key={i} className="Column">
                    <div className="Timestamp">
                        <p className="Value" style={{
                            height: currentSection === 'analytics'
                                ? `${(value/largestTimestamp) * 100}%`
                                : '0%'
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