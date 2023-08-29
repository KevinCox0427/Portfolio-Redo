import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import initialStore from "./cachedstore";

const browserDataSlice = createSlice({
    name: 'browserData',
    initialState: initialStore ? initialStore.browserData : {
        os: '',
        browser: '',
        locationData: {
            ip: '',
            city: '',
            ll: []
        }
    } as Store["browserData"],
    reducers: {
        setBrowserData: (state, action:PayloadAction<Store["browserData"]["locationData"]>) => {
            return {
                os: window.navigator.userAgent.split(')')[0].split('(')[1].split(';')[1],
                browser: window.navigator.userAgent.split(')')[1],
                locationData: action.payload
            }
        }
    }
});

export default browserDataSlice.reducer;
export const { setBrowserData } = browserDataSlice.actions;