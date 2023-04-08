import React, { FunctionComponent, useState } from "react";
import { cacheLocalStorage } from "../../Home";
import Track from "./Track";

type SearchResponse = {
    type: string,
    name: string,
    url: string,
    image: string,
    length: number,
    release: string,
    artists: {
        name: string,
        url:string
    }[],
    album?: {
        name: string,
        url:string,
        length: number,
        discNumber: number
    }
}[]

const IntegrationSection:FunctionComponent = () => {
    const [searchData, setSearchData] = useState<{
        searchBar: string,
        searchResults: SearchResponse,
        searchRecommendations: any[]
    }>({
        searchBar: '',
        searchResults: [],
        searchRecommendations: []
    });
    cacheLocalStorage('DreamStateSearchData', searchData, setSearchData);


    const [isSearching, setIsSearching] = useState(false);

    async function search(title:string, recommend: boolean) {
        setIsSearching(true);

        const result = await (await fetch('/spotify', {
            method: 'POST',
            body: JSON.stringify({
                search: title,
                recommend: recommend
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

        setSearchData({...searchData,
            searchResults: result as SearchResponse
        });

        setIsSearching(false);
    }


    const [searchSlider, setSearchSlider] = useState(0);
    const [resultWidth, setResultWidth] = useState({
        amount: 250,
        count: 3
    });

    if(typeof window != 'undefined') {
        window.addEventListener('load', () => {
            setTimeout(resizeResults, 100)
        });

        let timeoutBuffer:NodeJS.Timeout;
        window.addEventListener('resize', () => {
            if(timeoutBuffer) clearTimeout(timeoutBuffer);
            timeoutBuffer = setTimeout(resizeResults, 100);
        });
    }

    function resizeResults() {
        const wrapper = document.getElementsByClassName('ResultsWrapper')[0] as HTMLDivElement;
        const count = window.innerWidth >= 1600 ? 4 : window.innerWidth < 1600 && window.innerWidth >= 1000 ? 3 : window.innerWidth < 1000 && window.innerWidth >= 650 ? 2 : 1;
        
        setResultWidth({
            amount: Math.round((wrapper.clientWidth - ((count-1)*24)) / count),
            count: count
        });
    }

    const bruh = ((100/searchData.searchResults.length)) * resultWidth.count * searchSlider;

    return <div id='integrations' className='Section'>
        <h3 className='Title'>Integrations give more power to your applications...</h3>
        <p className='Description'>Integrations have been instrumental in translating collected user data into real-world action items. This is responsible for many aspects of the web, such as online payments, automated emails, analytics, cloud storage, CMS tools, or any resource managment software. I can assess and integrate any software that your technology stack needs, whether it uses an SDK, an API, or an RPC.<span>Let's use an integration with Spotify together to find you some new music!</span></p>
        <div className="Example">
            <div className="InputWrapper">
                <i className="fa-solid fa-arrow-turn-down EnterButton" onClick={() => {
                    if(searchData.searchBar) search(searchData.searchBar, false);
                }}></i>
                <input placeholder=" " id="spotifySearch" value={searchData.searchBar} onChange={e => {
                    setSearchData({... searchData,
                        searchBar: e.target.value,
                        searchResults: [],
                        searchRecommendations: []
                    });
                }} onKeyDown={e => {
                    if(e.code === 'Enter') search(searchData.searchBar, false);
                }}></input>
                <label htmlFor="spotifySearch">Search your favorite song or album:</label>
            </div>
            <div className="SpotifySearchResults">
                <h3>Search Results:</h3>
                <div className="SearchWrapper">
                    {isSearching ? 
                        <i className="fa-solid fa-arrows-rotate"></i>
                    :<>
                        <button onClick={() => {
                            if(searchSlider != 0) setSearchSlider(searchSlider-1);
                        }}><i className="fa-solid fa-arrow-left"></i></button>
                        <div className="ResultsWrapper">
                            <div className="ResultsSlider" style={{
                                transform: `translateX(-${bruh}%)`
                            }}>
                                {searchData.searchResults.map((searchResult, i) => {
                                    return <Track searchResult={searchResult} index={i} width={resultWidth.amount}></Track>
                                })}
                            </div>
                        </div>
                        <button onClick={() => {
                            setSearchSlider(searchSlider+1);
                        }}><i className="fa-solid fa-arrow-right"></i></button>
                    </>}
                </div>
                <div className="SpotifySearchPagination">

                </div>
            </div>
            <div className="SpotifyRecommendationResults">
                <h3>Recommendation Results:</h3>
            </div>
        </div>
    </div>
}

export default IntegrationSection;