import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import WindowCache from "../../components/windowCache";

type Props = {
    windowCache: WindowCache
}

/**
 * A compenent in the analytics section for the homepage to keep track and display the position of every click from a user.
 * @param windowCache A utility class to save the heatmap data to local storage upon every state change.
 */
const Heatmap:FunctionComponent<Props> = (props) => {
    // A state variable to determine what screenshot image to use for the heatmap display based on the user's screen width.
    const [heatMapImage, setHeatmapImage] = useState('');
    // A multi-densional array to keep track of every user's click. Each click is pushed to the array and represented by a coordinate of percentages
    // ex. [50, 50] would be in the middle of the page.
    const [heatmap, setHeatMap] = useState<number[][]>([]);
    props.windowCache.registerCache('heatmap', heatmap, setHeatMap);

    // A buffer to only allow a callback function to occur if it call itself > 200ms earlier.
    const resizeBuffer = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Adding an event listener to the root element to push a new coordinate every time a user clicks.
        const root = document.getElementById('root') as HTMLDivElement;

        root.addEventListener('click', e => {
            const coordinate = [Math.round((e.clientX / window.innerWidth)*10000)/100, Math.round(((e.clientY + document.documentElement.scrollTop) / document.documentElement.scrollHeight)*10000)/100];

            setHeatMap(oldHeatMap => {
                return [...oldHeatMap, coordinate];
            })
        });

        // Loading an screenshot image for the heatmap display
        // Also adding an event listener to do so upon screen resize.
        resizeHeatMap();

        window.addEventListener('resize', () => {
            if(resizeBuffer.current) clearTimeout(resizeBuffer.current);
            resizeBuffer.current = setTimeout(resizeHeatMap, 100);
        });
    }, []);

    /**
     * A function to determine the current screen width and fetch an appropriate screenshot image for the heatmap display
     */
    function resizeHeatMap() {
        let imageSize = Math.ceil(window.innerWidth/100)*100;
        if(imageSize > 2300) imageSize = 2300;
        if(imageSize < 500) imageSize = 500;

        setHeatmapImage(`https://dreamstateospublic.s3.us-east-2.amazonaws.com/self/self${imageSize}.jpg`);
    }

    /**
     * A function to reset the heat map to be empty.
     */
    function resetHeatMap() {
        setHeatMap([]);
    }

    return <div className="Graph Heatmap">
        <h3>
            Interaction Heatmap:
            <i className="fa-solid fa-rotate-left Reset" onClick={resetHeatMap}></i>
        </h3>
        <div className="HeatmapScroll">
            <div className="HeatmapWrapper">
                <img src={heatMapImage} alt={`Website screen ${heatMapImage.split('self')[1]} pixels`}></img>
                <div className="Gradient">
                    {heatmap.map((value, i) => {
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