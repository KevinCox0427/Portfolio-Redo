import React, { Fragment, FunctionComponent, useEffect, useRef, useState } from "react";
import Track from "./Track";
import { useSelector } from "../../store/store";

type Props = {
    name: 'Search' | 'Recommendation',
    isSearching: boolean,
    search: (title: string, isRecommend: boolean) => Promise<void>
}

/**
 * A component to render a slider of spotify tracks.
 * @param name The name of the slider, indicates whether it's showing search results or recommendation results.
 * @param isSearching A state variable representing whether the user is searching. This is to show a loading icon.
 * @param search A function to make a POST request to spotify's servers. This is to be able to get recommendations by clicking a track.
 */
const TrackSlider: FunctionComponent<Props> = (props) => {
    const tracks = useSelector(state => props.name === 'Search' ? state.spotifySearch.searchResults : state.spotifySearch.searchRecommendations);
    
    // Reference to the wrapper div of the results. This will be used to calculate the width of the results.
    const sliderWrapper = useRef<HTMLDivElement>(null);

    // State variable used for styling and sizing the rendered results.
    const [sliderData, setSliderData] = useState({
        slideWidth: 3,
        slideIndex: 0
    });

    // Callback function to set the scroll position based on state data.
    useEffect(setSlider, [sliderData]);

    /**
     * A function that moves the slider to its current position
     */
    function setSlider() {
        if(!sliderWrapper.current) return;
        sliderWrapper.current.scrollTo({
            left: Math.round((sliderWrapper.current.clientWidth / sliderData.slideWidth) * sliderData.slideIndex),
            behavior: 'auto'
        });
    }

    /**
     * Event handler to move the slider's results left one slide.
     */
    function handleMoveSliderLeft() {
        if(sliderData.slideIndex > 0) setSliderData(oldSliderData => {
            return {...oldSliderData,
                slideIndex: oldSliderData.slideIndex - oldSliderData.slideWidth < 0
                    ? 0
                    : oldSliderData.slideIndex - oldSliderData.slideWidth
            }
        });
    }

    /**
     * Event handler to move the slider's results right one slide.
     */
    function handleMoveSliderRight() {
        if(sliderData.slideIndex < tracks.length - 1) setSliderData(oldSliderData => {
            return {...oldSliderData,
                slideIndex: oldSliderData.slideIndex + oldSliderData.slideWidth > tracks.length - oldSliderData.slideWidth
                    ? tracks.length - oldSliderData.slideWidth
                    : oldSliderData.slideIndex + oldSliderData.slideWidth
            }
        });
    }

    // Setting a resize event listener to resize the rendered results based on screen width.
    // This is buffered such that the callback function will only fire if 100ms have passed without an event.
    const resizeBuffer = useRef<NodeJS.Timeout | null>(null);
    useEffect(() => {
        window.addEventListener('resize', () => {
            if(resizeBuffer.current) clearTimeout(resizeBuffer.current);
            resizeBuffer.current = setTimeout(resizeResults, 100);
        });
    }, []);

    // Also firing the resize callback for when a user searches.
    useEffect(() => {setTimeout(() => resizeResults(), 100)}, [tracks]);

    /**
     * A function to set the results state variable based on window width.
     * This is to resize our rendered song results while also making sure the slider stays on the current song when they are resized.
     */
    function resizeResults() {
        if(!sliderWrapper.current) return;

        // Determining how many results should show at once based on screen width.
        const slideWidth = window.innerWidth >= 1600
            ? 4
            : window.innerWidth < 1600 && window.innerWidth >= 1000
                ? 3
                : window.innerWidth < 1000 && window.innerWidth >= 650
                    ? 2
                    : 1;
                    
        // Setting the new dimensions for the results sliders.
        setSliderData(oldSliderData => {
            return {...oldSliderData,
                slideWidth: slideWidth
            }
        });
    }

    /**
     * A buffered callback funciton on every user scroll so that is automatically adjusts the slide index.
     */
    const scrollBuffer = useRef<NodeJS.Timeout | null>(null);
    function handleScroll() {
        if(scrollBuffer.current) clearTimeout(scrollBuffer.current);
        scrollBuffer.current = setTimeout(trackScroll, 500);
    }

    /**
     * A function that converts the scroll position to the slide index.
     */
    function trackScroll() {
        if(!sliderWrapper.current) return;
        // If the slide is already on this index, just return.
        if(Math.round(sliderWrapper.current.scrollLeft) === Math.round((sliderWrapper.current.clientWidth / sliderData.slideWidth) * sliderData.slideIndex)) return;

        // Otherwise find the closest index that the scroll position is on.
        setSliderData(oldSliderData => {
            return {...oldSliderData,
                slideIndex: Math.round(sliderWrapper.current!.scrollLeft / (sliderWrapper.current!.clientWidth / sliderData.slideWidth))
            }
        });
    }

    return <div className={`SpotifyResults ${props.name}`} id={`Spotify${props.name}`}>
        <h3>
            Search Results:
            {tracks.length > 0
                ? <span>{sliderData.slideIndex+1}-{sliderData.slideIndex+sliderData.slideWidth}/{tracks.length}</span>
                : <span>0/0</span>}
        </h3>
        <div className="SliderWrapper">
            {props.isSearching
                ? <i className="fa-solid fa-arrows-rotate"></i>
                : tracks.length > 0 
                    ? <>
                        <button onClick={handleMoveSliderLeft}>
                            <i className="fa-solid fa-arrow-left"></i>
                        </button>
                        <div
                            ref={sliderWrapper}
                            className="ResultsWrapper"
                            onScroll={handleScroll}
                        >
                            <div className="ResultsSlider">
                                {tracks.map((track, i) => {
                                    return <Fragment key={i}>
                                        <Track
                                            searchResult={track}
                                            width={sliderWrapper.current ? (sliderWrapper.current.clientWidth / sliderData.slideWidth) - 24 : 250}
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