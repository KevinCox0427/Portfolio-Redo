import React, { FunctionComponent, useState } from "react";
import WindowCache from "../../components/windowCache";
import Title from "../components/Title";
import TrackSlider from "./TrackSlider";

export type { SpotifyResponseSong };
/**
 * Typing of an API response from Spotify representing a song.
 */
type SpotifyResponseSong = {
    type: string,
    id: string,
    name: string,
    url: string,
    image: string,
    length: number,
    release: string,
    artists: {
        name: string,
        url:string
    }[],
    album: {
        name: string,
        url:string,
        length: number,
        discNumber: number
    }
}

type Props = {
    windowCache: WindowCache,
    sectionContent: SectionContent,
    style: React.CSSProperties
}

/**
 * The component for the integration section on the home page.
 * 
 * @param windowCache The utility class that saves state variables into local storage upon state change.
 * @param sectionContent The title and description for this section. Can be changed.
 * @param style Any additional styling for the wrapper div
 */
const IntegrationSection:FunctionComponent<Props> = (props) => {
    /**
     * State variable to represent what was entered in the search bar, and both results from the spotify API.
     * This is also saved to local storage upon every state change.
     */
    const [searchData, setSearchData] = useState<{
        searchBar: string,
        searchResults: SpotifyResponseSong[],
        searchRecommendations: SpotifyResponseSong[]
    }>({
        searchBar: '',
        searchResults: [],
        searchRecommendations: []
    });
    props.windowCache.registerCache('searchData', searchData, setSearchData);

    /**
     * Event handler for when the user searches for a song.
     * We'll also reset the current results as they will change.
     */
    function handleSearchInput(e:React.ChangeEvent<HTMLInputElement>) {
        setSearchData({...searchData,
            searchBar: e.target.value,
            searchResults: [],
            searchRecommendations: []
        });
    }

    /**
     * Event handler to enter search and make a POST call to spotify.
     */
    function handleEnterSearch(e:React.MouseEvent | React.KeyboardEvent) {
        /**
         * Making sure that the user hit "enter" if it's a keyboard event.
         */
        if(e.nativeEvent instanceof KeyboardEvent) {
            if(e.nativeEvent.code === 'Enter') search(searchData.searchBar, false);
        }
        else {
            search(searchData.searchBar, false);
        }
    }

    /**
     * Event handler to reset all the search data.
     */
    function handleReset() {
        setSearchData({
            searchBar: '',
            searchResults: [],
            searchRecommendations: []
        });
    }

    /**
     * State variable used to rendered loading icons.
     */
    const [isSearching, setIsSearching] = useState({
        search: false,
        recommendations: false
    });

    /**
     * A function to make a POST request to Spotify for song searches and recommendations.
     * 
     * @param title The title of the song being searched or recommmended.
     * @param isRecommend Whether the request is to search for a song or make a recommendation for one.
     */
    async function search(title:string, isRecommend:boolean) {
        if(!searchData.searchBar || isSearching.search || isSearching.recommendations) return;

        /**
         * Setting that we're searching.
         */
        setIsSearching({
            recommendations: isRecommend,
            search: !isRecommend
        });

        /**
         * Making the request.
         */
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

        /**
         * Setting state data if request was successful.
         */
        if(isRecommend) setSearchData({...searchData,
            searchRecommendations: result as SpotifyResponseSong[]
        });
        else setSearchData({...searchData,
            searchResults: result as SpotifyResponseSong[],
            searchRecommendations: []
        });

        /**
         * Setting that we aren't searching anymore.
         */
        setIsSearching({
            search: false,
            recommendations: false
        });
    }

    return <div id="integration" className='Section' style={props.style}>
        <Title content={props.sectionContent.content}></Title>
        <div className="Example">
            <div className="InputWrapper">
                <i className="fa-solid fa-rotate-left Reset" onClick={handleReset}></i>
                <i className="fa-solid fa-arrow-turn-down EnterButton" onClick={handleEnterSearch}></i>
                <input placeholder=" " id="spotifySearch" value={searchData.searchBar} onChange={handleSearchInput} onKeyDown={handleEnterSearch}></input>
                <label htmlFor="spotifySearch">Search your favorite song:</label>
            </div>
            <TrackSlider name="Search" searchResults={searchData.searchResults} isSearching={isSearching.search} search={search}></TrackSlider>
            <TrackSlider name="Recommendation" searchResults={searchData.searchRecommendations} isSearching={isSearching.recommendations} search={search}></TrackSlider>
        </div>
    </div>
}

export default IntegrationSection;