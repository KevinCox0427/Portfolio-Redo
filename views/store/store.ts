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
            [name: string]: {
                order: number,
                navName: string,
                content: string
            }
        },
        currentSection: keyof Store["watchTime"]["timeStamps"] | '',
        heatMap: [number, number][],
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
        }
    }
}

// A middleware function to cache the store data into local storage.
const cache:Middleware = ({ getState }) => {
    return next => action => {
        const newState = next(action);
        localStorage.setItem('DreamStateStore', JSON.stringify(getState()));
        return newState;
    }
}

// Loading the intial store from local storage if it exists.
export let initialStore: Store | null = null;
try {
    const cachedStore = localStorage.getItem('DreamStateStore');
    if(typeof cachedStore === 'string') initialStore = JSON.parse(cachedStore) as Store;
}
catch(e) {}

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
        fakeProductData: fakeProductDataSlice
    },
    middleware: [cache]
});

// Typing the useDispatch and useSelector hooks.
export const useDispatch: () => typeof store.dispatch = dispatch;
export const useSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = selector;