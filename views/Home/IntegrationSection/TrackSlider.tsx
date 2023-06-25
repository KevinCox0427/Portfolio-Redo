import React, { Fragment, FunctionComponent, useEffect, useRef, useState } from "react";
import { SpotifyResponseSong } from "./IntegrationSection";
import Track from "./Track";

type Props = {
    name: 'Search' | 'Recommendation',
    searchResults: SpotifyResponseSong[],
    isSearching: boolean,
    search: (title: string, isRecommend: boolean) => Promise<void>
}

/**
 * A component to render a slider of spotify tracks.
 * @param name The name of the slider, indicates whether it's showing search results or recommendation results.
 * @param searchResults The array of tracks from spotify.
 * @param isSearching A state variable representing whether the user is searching. This is to show a loading icon.
 * @param search A function to make a POST request to spotify's servers. This is to be able to get recommendations by clicking a track.
 */
const TrackSlider: FunctionComponent<Props> = (props) => {
    // State variable used for styling and sizing the rendered results.
    const [resultDimensions, setResultDimensions] = useState({
        width: 250,
        slideWidth: 3,
        slideIndex: 0
    });

    // Reference to the wrapper div of the results. This will be used to calculate the width of the results.
    const resultsWrapper = useRef<HTMLDivElement>(null);

    // Event handler to move the slider's results left one slide.
    function handleMoveSliderLeft() {
        if(resultDimensions.slideIndex != 0) setResultDimensions({...resultDimensions,
            slideIndex: resultDimensions.slideIndex-1
        });
    }

    // Event handler to move the slider's results right one slide.
    function handleMoveSliderRight() {
        if((translateAmount * (resultDimensions.slideIndex+1)) < 100) setResultDimensions({...resultDimensions,
            slideIndex: resultDimensions.slideIndex+1
        });
    }
    
    // Setting a resize event listener to resize the rendered results based on screen width.
    // This is buffered such that the callback function will only fire if 100ms have passed without an event.
    const timeoutBuffer = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        setTimeout(resizeResults, 100);
        window.addEventListener('resize', () => {
            if(timeoutBuffer.current) clearTimeout(timeoutBuffer.current);
            timeoutBuffer.current = setTimeout(resizeResults, 100);
        });
    }, []);

    // Also firing the resize callback for when a user searches.
    useEffect(() => {
        if(props.searchResults.length > 0 || props.searchResults.length > 0) {
            resizeResults();
        }
    }, [props.searchResults]);

    /**
     * A function to set the results state variable based on window width.
     * This is to resize our rendered song results while also making sure the slider stays on the current song when they are resized.
     */
    function resizeResults() {
        if(!resultsWrapper.current) return;

        // Determining how many results should show at once based on screen width.
        const slideWidth = window.innerWidth >= 1600
            ? 4
            : window.innerWidth < 1600 && window.innerWidth >= 1000
                ? 3
                : window.innerWidth < 1000 && window.innerWidth >= 650
                    ? 2
                    : 1;

        // Determining how much the sliders need to translate horizontally when a user clicks next on the slider.
        const newTranslateAmount = props.searchResults.length != 0
            ? (100/props.searchResults.length) * slideWidth
            : 0;

        // Adjusting the current search slider's horizontal translation if the count of results on screen changes.
        let sliderIndexAdjust = resultDimensions.slideIndex - Math.floor((slideWidth - resultDimensions.slideWidth) * (resultDimensions.slideIndex/slideWidth));

        // Making sure it doesn't go off screen. This will happen if the new count is not a multiple of the total results.
        if(newTranslateAmount * sliderIndexAdjust >= 100) sliderIndexAdjust = sliderIndexAdjust - 1;
        
        // Setting the new dimensions for the results sliders.
        setResultDimensions({
            // Setting the width of each result in pixels. 24px is the gap inbetween the results.
            width: Math.round((resultsWrapper.current.clientWidth - ((slideWidth - 1) * 24)) / slideWidth),
            slideWidth: slideWidth,
            slideIndex: slideWidth != resultDimensions.slideWidth
                ? sliderIndexAdjust
                : resultDimensions.slideIndex
        });
    }

    // Calculating how much the sliders will translate horizontally based on the user's input.
    const translateAmount = props.searchResults.length != 0
        ? (100/props.searchResults.length) * resultDimensions.slideWidth
        : 0;

    // A string to show what slide the user is on as well as the total amount of slides.
    const currentSlide = `${props.searchResults.length > 0 ? resultDimensions.slideIndex + 1 : 0} / ${Math.ceil(props.searchResults.length / resultDimensions.slideWidth)}`
    
    return <div className={`SpotifyResults ${props.name}`} id={`Spotify${props.name}`}>
        <h3>
            Search Results:
            <span>{currentSlide}</span>
        </h3>
        <div className="SliderWrapper">
            {props.isSearching
                ? <i className="fa-solid fa-arrows-rotate"></i>
                : props.searchResults.length > 0 
                    ? <>
                        <button onClick={handleMoveSliderLeft}>
                            <i className="fa-solid fa-arrow-left"></i>
                        </button>
                        <div ref={resultsWrapper} className="ResultsWrapper">
                            <div className="ResultsSlider" style={{
                                transform: `translateX(calc(-${translateAmount * resultDimensions.slideIndex}% - ${Math.round(24*((translateAmount * resultDimensions.slideIndex)/100))}px))`
                            }}>
                                {props.searchResults.map((searchResult, i) => {
                                    return <Fragment key={i}>
                                        <Track
                                            searchResult={searchResult}
                                            width={resultDimensions.width}
                                            isRecommend={props.name === 'Recommendation'}
                                            search={props.search}
                                        ></Track>
                                    </Fragment>
                                })}
                            </div>
                        </div>
                        <button onClick={handleMoveSliderRight}>
                            <i className="fa-solid fa-arrow-right"></i>
                        </button>
                    </> 
                    : <p className="None">No Results Found.</p>
            }
        </div>
    </div>
}

export default TrackSlider;