import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialStore } from "./store";

const heatmapSlice = createSlice({
    name: 'heatmap',
    initialState: initialStore ? initialStore.heatMap : [],
    reducers: {
        addClick: (state, action: PayloadAction<[number, number]>) => {
            state.push(action.payload)
        },

        resetHeatmap: (state) => {
            return [];
        }
    }
});

export default heatmapSlice.reducer;
export const { addClick, resetHeatmap } = heatmapSlice.actions;