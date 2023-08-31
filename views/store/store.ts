import { configureStore, Middleware } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch as dispatch, useSelector as selector } from "react-redux";

import watchTimeSlice from "./watchTime";
import sectionContentSlice from "./sectionContent";
import currentSectionSlice from "./currentSection";
import heatmapSlice from "./heatmap";
import pageViewsSlice from './pageViews';
import browserDataSlice from "./browserData";
import fakeUserCredentialsSlice from './fakeUserCredentials';
import fakeProductDataSlice from './fakeProductData';
import spotifySearchSlice from "./spotifySearch";
import metaDataSlice from "./storeMetaData";


// Declaring globally the typing of the store.
declare global {
    type Store = {
        watchTime: {
            start: number,
            timeStamps: {
                home: number,
                data: number,
                authentication: number,
                integration: number,
                analytics: number,
                ui: number,
                web: number,
                footer: number
            }
        },
        sectionContent: {
            data: {
                order: number,
                navName: string,
                content: string
            },
            authentication: {
                order: number,
                navName: string,
                content: string
            },
            integration: {
                order: number,
                navName: string,
                content: string
            },
            analytics: {
                order: number,
                navName: string,
                content: string
            },
            ui: {
                order: number,
                navName: string,
                content: string
            },
            web: {
                order: number,
                navName: string,
                content: string
            },
        },
        currentSection: keyof Store["watchTime"]["timeStamps"] | '',
        heatmap: [number, number][],
        pageViews: {
            [pageName: string]: number
        },
        browserData: {
            os: string,
            browser: string
            locationData: {
                ip: string,
                city: string,
                ll: number[]
            }
        },
        fakeUserCredentials: {
            registerUsername: string,
            registerPassword: string,
            loginUsername: string,
            loginPassword: string,
            hash: string,
            salt: string,
            session: {
                key: string,
                expires: number
            }
        },
        fakeProductData: {
            name: string,
            price: string,
            description: string,
            minQuantity: number | null,
            maxQuantity: number | null,
            categories: string[],
            imageUrls: string[],
            sales: {
                type: 'flat' | 'percent',
                amount: string | null,
                expires: {
                    day: number,
                    month: number,
                    year: number
                }
            }[]
        },
        spotifySearch: {
            searchBar: string,
            searchResults: SpotifyResponseSong[],
            searchRecommendations: SpotifyResponseSong[]
        },
        metaData: {
            hasLoadedFromCache: boolean
        }
    }

    // Typing of an API response from Spotify representing a song.
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
}

const cache:Middleware = ({ getState }) => {
    return next => action => {
        const newState = next(action);
        if(getState().metaData.hasLoadedFromCache) localStorage.setItem('DreamStateStore', JSON.stringify(getState()));
        return newState;
    }
}

// Configuring the store with all the slices.
export const store = configureStore({
    reducer: {
        watchTime: watchTimeSlice,
        sectionContent: sectionContentSlice,
        currentSection: currentSectionSlice,
        heatmap: heatmapSlice,
        pageViews: pageViewsSlice,
        browserData: browserDataSlice,
        fakeUserCredentials: fakeUserCredentialsSlice,
        fakeProductData: fakeProductDataSlice,
        spotifySearch: spotifySearchSlice,
        metaData: metaDataSlice
    },
    middleware: [cache]
});

// Typing the useDispatch and useSelector hooks.
export const useDispatch: () => typeof store.dispatch = dispatch;
export const useSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = selector;