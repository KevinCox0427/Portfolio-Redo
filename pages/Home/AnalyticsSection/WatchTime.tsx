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

const XAxisLabels = ["Landing Page", "Optimized Data", "Secure Authentication", "Seamless Integrations", "Detailed Analytics", "User Interfaces", "Beautiful Websites", "Footer"];

function createTimeString(time: number) {
    const hours = Math.floor((time/1000) / 3600);
    const minutes = Math.floor((time/1000) / 60) % 60;
    const seconds = Math.floor((time/100) % 600) / 10;
    return (hours ? `${hours}h ` : '') + (minutes ? `${minutes}m ` : '') + `${seconds}s`;
}

const WatchTime:FunctionComponent<Props> = (props) => {
    let largestTimestamp = 0;
    
    Object.keys(props.watchTime.timeStamps).forEach(timeStampKey => {
        const value = props.watchTime.timeStamps[timeStampKey as keyof typeof props.watchTime.timeStamps];
        if(value > largestTimestamp) largestTimestamp = value;
    });

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
                    {[1,2,3].map((value, i) => {
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