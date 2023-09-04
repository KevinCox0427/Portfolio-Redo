import { PayloadAction, createSlice } from "@reduxjs/toolkit";

/**
 * A Redux slice that store where the user has clicked on the homepage.
 * The data is an array of coordinates with percentages as their units [vw, vh].
 */
const heatmapSlice = createSlice({
    name: 'heatmap',
    initialState: [] as Store["heatmap"],
    reducers: {
        /**
         * A reducer function to add a click to the user interaction heatmap.
         * @param action a coordinate of where the user clicked. The unit is a percentage.
         */
        addClick: (state, action: PayloadAction<[number, number]>) => {
            state.push(action.payload)
        },

        /**
         * A reducer funcction to overwrite the heatmap.
         * @param action The heatmap 2-D array to overwrite with.
         */
        setHeatmap: (state, action: PayloadAction<Store["heatmap"]>) => {
            return action.payload;
        },

        /**
         * A reducer function to reset the heatmap to an empty array.
         */
        resetHeatmap: (state) => {
            return [];
        }
    }
});

export default heatmapSlice.reducer;
export const { setHeatmap, addClick, resetHeatmap } = heatmapSlice.actions;