import React, { Fragment, FunctionComponent, useRef, useState } from "react";
import { cacheLocalStorage } from "../../Home";
import Track from "./Track";

type SearchResponse = {
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


    const [isSearching, setIsSearching] = useState({
        search: false,
        recommendations: false
    });

    async function search(title:string, isRecommend: boolean) {
        if(isSearching.search || isSearching.recommendations) return;
        setIsSearching({
            recommendations: isRecommend,
            search: !isRecommend
        });

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

        if(isRecommend) setSearchData({...searchData,
            searchRecommendations: result as SearchResponse
        });
        else setSearchData({...searchData,
            searchResults: result as SearchResponse,
            searchRecommendations: []
        })

        setIsSearching({
            search: false,
            recommendations: false
        });

        resizeResults();
    }


    const [results, setResults] = useState({
        amount: 250,
        count: 3,
        searchSlider: 0,
        recommendSlider: 0
    });
    
    const timeoutBuffer = useRef<NodeJS.Timeout | null>(null);
    if(typeof window != 'undefined') {
        window.addEventListener('load', () => {
            setTimeout(resizeResults, 100)
        });
        window.addEventListener('resize', () => {
            if(timeoutBuffer.current) clearTimeout(timeoutBuffer.current);
            timeoutBuffer.current = setTimeout(resizeResults, 100);
        });
    }

    function resizeResults() {
        const wrapper = document.getElementsByClassName('ResultsWrapper')[0] as HTMLDivElement;
        const count = window.innerWidth >= 1600 ? 4 : window.innerWidth < 1600 && window.innerWidth >= 1000 ? 3 : window.innerWidth < 1000 && window.innerWidth >= 650 ? 2 : 1;
        const newTranslateAmount = searchData.searchResults.length != 0 ? (100/searchData.searchResults.length) * count : 0;

        let searchSliderAdjust = results.searchSlider - Math.floor((count - results.count) * (results.searchSlider/count));
        if(newTranslateAmount * searchSliderAdjust >= 100) searchSliderAdjust = searchSliderAdjust - 1;

        let recommendSliderAdjust = results.recommendSlider - Math.floor((count - results.count) * (results.recommendSlider/count));
        if(newTranslateAmount * recommendSliderAdjust >= 100) recommendSliderAdjust = recommendSliderAdjust - 1;
        
        setResults({
            amount: Math.round((wrapper.clientWidth - ((count-1)*24)) / count),
            count: count,
            searchSlider: count != results.count ? searchSliderAdjust : results.searchSlider,
            recommendSlider: count != results.count ? recommendSliderAdjust : results.searchSlider
        });
    }

    const translateAmount = searchData.searchResults.length != 0 ? (100/searchData.searchResults.length) *  results.count : 0;

    return <div id='integrations' className='Section'>
        <h3 className='Title'>
            Integrations give more power to your applications...
        </h3>
        <p className='Description'>
            Integrations have been instrumental in translating collected user data into real-world action items. This is responsible for many aspects of the web, such as online payments, automated emails, analytics, cloud storage, CMS tools, or any resource managment software. I can assess and integrate any software that your technology stack needs, whether it uses an SDK, an API, or an RPC.
            <span>Let's use an integration with Spotify together to find you some new music!</span>
        </p>
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
                <label htmlFor="spotifySearch">Search your favorite song:</label>
            </div>
            <div className="SpotifyResults Search">
                <h3>
                    Search Results:
                    <span>{`${searchData.searchResults.length > 0 ? results.searchSlider+1 : 0} / ${Math.ceil(searchData.searchResults.length / results.count)}`}</span>
                </h3>
                <div className="SliderWrapper">
                    {isSearching.search ? 
                        <i className="fa-solid fa-arrows-rotate"></i>
                    : <>
                        {searchData.searchResults.length > 0 ? <button onClick={() => {
                            if(results.searchSlider != 0) setResults({...results,
                                searchSlider: results.searchSlider-1
                            });
                        }}><i className="fa-solid fa-arrow-left"></i></button> : <></>}
                        <div className="ResultsWrapper">
                            <div className="ResultsSlider" style={{
                                transform: `translateX(calc(-${translateAmount * results.searchSlider}% - ${Math.round(24*((translateAmount * results.searchSlider)/100))}px))`
                            }}>
                                {searchData.searchResults.map((searchResult, i) => {
                                    return <Fragment key={i}><Track searchResult={searchResult} width={results.amount} isRecommend={false} search={search}></Track></Fragment>
                                })}
                            </div>
                        </div>
                        {searchData.searchResults.length > 0 ? <button onClick={() => {
                            if((translateAmount * (results.searchSlider+1)) < 100) setResults({...results,
                                searchSlider: results.searchSlider+1
                            });
                        }}><i className="fa-solid fa-arrow-right"></i></button> : <></>}
                    </>}
                </div>
            </div>
            <div className="SpotifyResults Recommendation">
                <h3>
                    Recommendation Results:
                    <span>{`${searchData.searchRecommendations.length > 0 ? results.recommendSlider+1 : 0} / ${Math.ceil(searchData.searchRecommendations.length / results.count)}`}</span>
                </h3>
                <div className="SliderWrapper">
                    {isSearching.recommendations ? 
                        <i className="fa-solid fa-arrows-rotate"></i>
                    :<>
                        {searchData.searchRecommendations.length > 0 ? <button onClick={() => {
                            if(results.recommendSlider != 0) setResults({...results,
                                recommendSlider: results.recommendSlider-1
                            });
                        }}><i className="fa-solid fa-arrow-left"></i></button> : <></>}
                        <div className="ResultsWrapper">
                            <div className="ResultsSlider" style={{
                                transform: `translateX(calc(-${translateAmount * results.recommendSlider}% - ${Math.round(24*((translateAmount * results.recommendSlider)/100))}px))`
                            }}>
                                {searchData.searchRecommendations.map((searchRecommendation, i) => {
                                    return <Fragment key={i}><Track searchResult={searchRecommendation} width={results.amount} isRecommend={true} search={search}></Track></Fragment>
                                })}
                            </div>
                        </div>
                        {searchData.searchRecommendations.length > 0 ? <button onClick={() => {
                            if((translateAmount * (results.recommendSlider+1)) < 100) setResults({...results,
                                recommendSlider: results.recommendSlider+1
                            });
                        }}><i className="fa-solid fa-arrow-right"></i></button> : <></>}
                    </>}
                </div>
            </div>
        </div>
    </div>
}

export default IntegrationSection;