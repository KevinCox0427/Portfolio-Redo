import { createSlice } from "@reduxjs/toolkit";

const metaData = createSlice({
    name: 'metaData',
    initialState: {
        hasLoadedFromCache: false
    },
    reducers: {
        setHasLoadedFromCache: (state) => {
            return { hasLoadedFromCache: true };
        }
    }
});

export default metaData.reducer;
export const { setHasLoadedFromCache } = metaData.actions;