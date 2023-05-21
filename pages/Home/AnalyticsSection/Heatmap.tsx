import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { Analytics } from "./AnalyticsSection";

type Props = {
    analytics: Analytics,
    setAnalytics: React.Dispatch<React.SetStateAction<Analytics>>
}

const Heatmap:FunctionComponent<Props> = (props) => {
    const [heatMap, setHeatmap] = useState({
        height: 0,
        width: 0,
        image: ''
    });

    const resizeBuffer = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const root = document.getElementById('root') as HTMLDivElement;
        const wrapper = document.getElementsByClassName('HeatmapWrapper')[0] as HTMLDivElement
        if(!root || !wrapper) return;

        root.addEventListener('click', e => {
            const coordinate = [Math.round((e.clientX / window.innerWidth)*10000)/100, Math.round(((e.clientY + document.documentElement.scrollTop) / document.documentElement.scrollHeight)*10000)/100];

            props.setAnalytics(oldAnalytics => {
                return {...oldAnalytics,
                    heatMap: [...oldAnalytics.heatMap, coordinate]
                };
            })
        });

        setHeatmap({
            image: `/assets/self${Math.ceil(window.innerWidth/100)*100}.png`,
            height: Math.ceil(wrapper.clientWidth * (root.scrollHeight / window.innerWidth)),
            width: Math.ceil(wrapper.clientWidth)
        });

        window.addEventListener('resize', () => {
            if(resizeBuffer.current) clearTimeout(resizeBuffer.current);
            resizeBuffer.current = setTimeout(() => {
                setHeatmap({
                    image: `/assets/self${Math.ceil(window.innerWidth/100)*100}.png`,
                    height: Math.ceil(wrapper.clientWidth * (root.scrollHeight / window.innerWidth)),
                    width: Math.ceil(wrapper.clientWidth)
                });
            }, 100);
        });
    }, []);

    return <div className="Graph Heatmap">
        <h3>
            Interaction Heatmap:
            <i className="fa-solid fa-rotate-left Reset" onClick={() => {
                props.setAnalytics(oldAnalytics => {
                    return {...oldAnalytics,
                        heatMap: []
                    }
                });
            }}></i>
        </h3>
        <div className="HeatmapScroll">
            <div className="HeatmapWrapper">
                <img src={heatMap.image}></img>
                <div className="Gradient" style={{
                    width: heatMap.width,
                    height: heatMap.height
                }}>
                    {props.analytics.heatMap.map((value, i) => {
                        return <div className="Circle" key={i} style={{
                            left: `${value[0]}%`,
                            top: `${value[1]}%`
                        }}></div>
                    })}
                </div>
            </div>
        </div>
    </div>
}

export default Heatmap;