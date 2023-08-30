import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// Loading a default timeStamps object to reset it.
const defaultTimeStamps = {
    start: Date.now(),
    timeStamps: {
        home: 0,
        data: 0,
        authentication: 0,
        integration: 0,
        analytics: 0,
        ui: 0,
        web: 0,
        footer: 0
    }
}

const watchTimeSlice = createSlice({
    name: 'watchTime',
    // Initial state will be the stored watch timestamps for each section as well as an updated start timestamp
    initialState: defaultTimeStamps as Store["watchTime"],
    reducers: {
        setWatchTime: (state, action: PayloadAction<Store["watchTime"]>) => {
            return action.payload;
        },

        setNewTimeStamp: (state, action:PayloadAction<keyof Store["watchTime"]["timeStamps"]>) => {
            return {
                start: Date.now(),
                timeStamps: {...state.timeStamps,
                    [action.payload]: state.timeStamps[action.payload] + (Date.now() - state.start)
                }
            }
        },

        resetWatchTime: (state) => {
            return {...defaultTimeStamps,
                start: Date.now()
            };
        }
    }
});

export default watchTimeSlice.reducer;
export const { setWatchTime, setNewTimeStamp, resetWatchTime } = watchTimeSlice.actions;