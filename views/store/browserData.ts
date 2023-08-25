import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialStore } from "./store";

const browserDataSlice = createSlice({
    name: 'browserData',
    initialState: initialStore ? initialStore.browserData : {
        os: window.navigator.userAgent.split(')')[0].split('(')[1].split(';')[1],
        browser: window.navigator.userAgent.split(')')[1],
        locationData: {
            ip: '',
            city: '',
            ll: []
        }
    } as Store["browserData"],
    reducers: {
        setLocation: (state, action:PayloadAction<Store["browserData"]["locationData"]>) => {
            state.locationData = action.payload;
        }
    }
});

export default browserDataSlice.reducer;
export const { setLocation } = browserDataSlice.actions;