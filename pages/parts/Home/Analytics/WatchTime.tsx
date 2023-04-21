import React, { FunctionComponent } from "react";

type Props = {
    watchTime: {
        start: number,
        timeStamps: {
            [sectionName: string]: number
        }
    },
    currentSection: number
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
        <h3>Watch Time:</h3>
        <div className="AxisWrapper" style={{
            gridTemplateColumns: `4.5em ${'3.5em '.repeat(XAxisLabels.length)}`
        }}>
            <div className="Column">
                <div className="YLabels">
                    {[1,2,3,4].map((value, i) => {
                        return <p key={i}>{
                            createTimeString(largestTimestamp*((4-i)/4))
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
                            height: props.currentSection === 4 ? `${(value/largestTimestamp) * 100}%` : '0%'
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