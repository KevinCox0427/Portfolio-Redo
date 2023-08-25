import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialStore } from "./store";

const currentSectionSlice = createSlice({
    name: 'currentSection',
    initialState: initialStore ? initialStore.currentSection : '' as Store["currentSection"],
    reducers: {
        setCurrentSection: (state, action:PayloadAction<Store["currentSection"]>) => {
            return action.payload
        }
    }
});

export default currentSectionSlice.reducer;
export const { setCurrentSection } = currentSectionSlice.actions;