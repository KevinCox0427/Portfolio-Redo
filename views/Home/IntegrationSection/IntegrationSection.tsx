import React, { FunctionComponent, useState } from "react";
import Title from "../components/Title";
import TrackSlider from "./TrackSlider";
import { useDispatch, useSelector } from "../../store/store";
import { resetSpotifyResults, setSpotifyRecommendationResults, setSpotifySearchBar, setSpotifySearchResults } from "../../store/spotifySearch";

/**
 * The component for the integration section on the home page.
 */
const IntegrationSection:FunctionComponent = () => {
    const dispatch = useDispatch();
    // State variable to represent what was entered in the search bar, and both results from the spotify API.
    const searchData = useSelector(state => state.spotifySearch);
    const sectionContent = useSelector(state => state.sectionContent.integration);

    // State variable used to rendered loading icons.
    const [isSearching, setIsSearching] = useState({
        search: false,
        recommendations: false
    });

    /**
     * Event handler to enter search and make a POST call to spotify.
     */
    function handleEnterSearch(e:React.MouseEvent | React.KeyboardEvent) {
        // Making sure that the user hit "enter" if it's a keyboard event.
        if(e.nativeEvent instanceof KeyboardEvent) {
            if(e.nativeEvent.code === 'Enter') search(searchData.searchBar, false);
        }
        else {
            search(searchData.searchBar, false);
        }
    }

    /**
     * A function to make a POST request to Spotify for song searches and recommendations.
     * @param title The title of the song being searched or recommmended.
     * @param isRecommend Whether the request is to search for a song or make a recommendation for one.
     */
    async function search(title:string, isRecommend:boolean) {
        if(!searchData.searchBar || isSearching.search || isSearching.recommendations) return;

        // Setting that we're searching.
        setIsSearching({
            recommendations: isRecommend,
            search: !isRecommend
        });

        // Making the request.
        const result = await (await fetch('/spotify', {
            method: 'POST',
            body: JSON.stringify(isRecommend ? {
                id: title
            } : {
                search: title
            }),
            headers: {
                Accepts: "application/json",
                "Content-Type": "application/json"
            }
        })).json();
        
        if(typeof result.error === 'string') {
            console.log(result.error)
            return;
        }

        // Setting state data if request was successful.
        if(isRecommend) dispatch(setSpotifyRecommendationResults(result as SpotifyResponseSong[]));
        else dispatch(setSpotifySearchResults(result as SpotifyResponseSong[]));

        // Setting that we aren't searching anymore.
        setIsSearching({
            search: false,
            recommendations: false
        });
    }

    return <div id="integration" className='Section' style={{
        order: sectionContent.order,
        zIndex: 6 - sectionContent.order
    }}>
        <Title
            content={sectionContent.content}
        ></Title>
        <div className="Example">
            <div className="InputWrapper">
                <button className="Reset" onClick={() => dispatch(resetSpotifyResults())}>
                    <i className="fa-solid fa-rotate-left"></i>
                </button>
                <button className="EnterButton" onClick={e => handleEnterSearch(e)}>
                    <i className="fa-solid fa-arrow-turn-down"></i>
                </button>
                <input
                    placeholder=" "
                    id="spotifySearch" 
                    value={searchData.searchBar}
                    onChange={e => dispatch(setSpotifySearchBar(e.target.value))}
                    onKeyDown={e => handleEnterSearch(e)}
                ></input>
                <label htmlFor="spotifySearch">Search your favorite song:</label>
            </div>
            <TrackSlider
                name="Search"
                isSearching={isSearching.search}
                search={search}
            ></TrackSlider>
            <TrackSlider 
                name="Recommendation"
                isSearching={isSearching.recommendations}
                search={search}
            ></TrackSlider>
        </div>
    </div>
}

export default IntegrationSection;