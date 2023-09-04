import { PayloadAction, createSlice } from "@reduxjs/toolkit";

/**
 * A Redux slice that stores the user's browser and location data for the analytics section on the homepage.
 * It stores the user's operating system, browser version, their ip, general city location, and general latitude and longitude.
 */
const browserDataSlice = createSlice({
    name: 'browserData',
    initialState: {
        os: '',
        browser: '',
        locationData: {
            ip: '',
            city: '',
            ll: []
        }
    } as Store["browserData"],
    reducers: {
        /**
         *  A reducer function to save the user's browser and location data.
         * @param action An object representing the location data of a user based on the ip address.
         */
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