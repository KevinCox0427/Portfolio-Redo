import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const heatmapSlice = createSlice({
    name: 'heatmap',
    initialState: [] as Store["heatmap"],
    reducers: {
        addClick: (state, action: PayloadAction<[number, number]>) => {
            state.push(action.payload)
        },

        setHeatmap: (state, action: PayloadAction<Store["heatmap"]>) => {
            return action.payload;
        },

        resetHeatmap: (state) => {
            return [];
        }
    }
});

export default heatmapSlice.reducer;
export const { setHeatmap, addClick, resetHeatmap } = heatmapSlice.actions;