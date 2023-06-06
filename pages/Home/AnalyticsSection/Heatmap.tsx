import React, { FunctionComponent, useEffect, useRef, useState } from "react";

type Props = {
    heatMap: number[][],
    setHeatMap: React.Dispatch<React.SetStateAction<number[][]>>
}

const Heatmap:FunctionComponent<Props> = (props) => {
    const [heatMapImage, setHeatmapImage] = useState('');

    const resizeBuffer = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const root = document.getElementById('root') as HTMLDivElement;
        const wrapper = document.getElementsByClassName('HeatmapWrapper')[0] as HTMLDivElement
        if(!root || !wrapper) return;

        root.addEventListener('click', e => {
            const coordinate = [Math.round((e.clientX / window.innerWidth)*10000)/100, Math.round(((e.clientY + document.documentElement.scrollTop) / document.documentElement.scrollHeight)*10000)/100];

            props.setHeatMap(oldHeatMap => {
                return [...oldHeatMap, coordinate];
            })
        });

        resizeHeatMap();

        window.addEventListener('resize', () => {
            if(resizeBuffer.current) clearTimeout(resizeBuffer.current);
            resizeBuffer.current = setTimeout(resizeHeatMap, 100);
        });
    }, []);

    function resizeHeatMap() {
        let imageSize = Math.ceil(window.innerWidth/100)*100;
        if(imageSize > 2300) imageSize = 2300;
        if(imageSize < 500) imageSize = 500;

        setHeatmapImage(`https://dreamstateospublic.s3.us-east-2.amazonaws.com/self/self${imageSize}.jpg`);
    }

    return <div className="Graph Heatmap">
        <h3>
            Interaction Heatmap:
            <i className="fa-solid fa-rotate-left Reset" onClick={() => {
                props.setHeatMap([]);
            }}></i>
        </h3>
        <div className="HeatmapScroll">
            <div className="HeatmapWrapper">
                <img src={heatMapImage} alt={`Website screen ${heatMapImage.split('self')[1]} pixels`}></img>
                <div className="Gradient">
                    {props.heatMap.map((value, i) => {
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