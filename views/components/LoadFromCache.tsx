import React, { FunctionComponent, useEffect, useRef } from "react";
import { setHasLoadedFromCache, useDispatch } from "../store/store";
import { incrementPageView } from "../store/pageViews";
import { setBrowserData } from '../store/browserData';
import { setSections } from '../store/sectionContent';
import { setProduct } from '../store/fakeProductData';
import { setCredentials } from '../store/fakeUserCredentials';
import { setHeatmap } from '../store/heatmap';
import { setPageViews } from '../store/pageViews';
import { setSpotifySearch } from '../store/spotifySearch';
import { setWatchTime } from "../store/watchTime";

type Props = {
    currentPage: string
}

/**
 * React Component that will increment the page count for the current page.
 */
const AddPageView: FunctionComponent<Props> = (props) => {
    const dispatch = useDispatch();
    const hasLoaded = useRef(false);

    useEffect(() => {
        if(hasLoaded.current) return;

        // Loading the intial store from local storage if it exists.
        const cachedStore = localStorage.getItem('DreamStateStore');
        if(!cachedStore) return;
        const initialStore:Store = JSON.parse(cachedStore);

        // Setting all the store data to what was found in cache.
        if(typeof initialStore.browserData.locationData !== 'undefined') dispatch(setBrowserData(initialStore.browserData.locationData));
        if(typeof initialStore.sectionContent !== 'undefined') dispatch(setSections(initialStore.sectionContent));
        if(typeof initialStore.fakeProductData !== 'undefined') dispatch(setProduct(initialStore.fakeProductData));
        if(typeof initialStore.fakeUserCredentials !== 'undefined') dispatch(setCredentials(initialStore.fakeUserCredentials));
        if(typeof initialStore.heatmap !== 'undefined') dispatch(setHeatmap(initialStore.heatmap));
        if(typeof initialStore.pageViews !== 'undefined') dispatch(setPageViews(initialStore.pageViews));
        if(typeof initialStore.spotifySearch !== 'undefined') dispatch(setSpotifySearch(initialStore.spotifySearch));
        if(typeof initialStore.watchTime !== 'undefined') dispatch(setWatchTime(initialStore.watchTime));
        
        // Setting that the loading is done so now future updates can be saved to cache.
        setHasLoadedFromCache();

        dispatch(incrementPageView(props.currentPage));
        hasLoaded.current = true;
    }, []);

    return <></>;
}

export default AddPageView;