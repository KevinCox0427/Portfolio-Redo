import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "../../store/store";
import { addClick, resetHeatmap } from "../../store/heatmap";

/**
 * A compenent in the analytics section for the homepage to keep track and display the position of every click from a user.
 */
const Heatmap:FunctionComponent = () => {
    const dispatch = useDispatch();

    // A state variable to determine what screenshot image to use for the heatmap display based on the user's screen width.
    const [heatMapImage, setHeatmapImage] = useState('');

    // A multi-densional array to keep track of every user's click. Each click is pushed to the array and represented by a coordinate of percentages
    // ex. [50, 50] would be in the middle of the page.
    const heatmap = useSelector(state => state.heatmap);

    // A buffer to only allow a callback function to occur if it call itself > 200ms earlier.
    const resizeBuffer = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Loading an screenshot image for the heatmap display
        resizeHeatMap();

        // Adding an event listener to the root element to push a new coordinate every time a user clicks.
        const root = document.getElementById('root') as HTMLDivElement;
        root.addEventListener('click', e => {
            const coordinate: [number, number] = [Math.round((e.clientX / window.innerWidth)*10000)/100, Math.round(((e.clientY + document.documentElement.scrollTop) / document.documentElement.scrollHeight)*10000)/100];
            dispatch(addClick(coordinate));
        });

        // Adding an event listener to do so upon screen resize.
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

    return <div className="Graph Heatmap">
        <h3>
            Interaction Heatmap:
            <i className="fa-solid fa-rotate-left Reset" onClick={() => dispatch(resetHeatmap())}></i>
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