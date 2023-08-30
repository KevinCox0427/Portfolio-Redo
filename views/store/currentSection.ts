import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const currentSectionSlice = createSlice({
    name: 'currentSection',
    initialState: '' as Store["currentSection"],
    reducers: {
        setCurrentSection: (state, action:PayloadAction<Store["currentSection"]>) => {
            return action.payload
        }
    }
});

export default currentSectionSlice.reducer;
export const { setCurrentSection } = currentSectionSlice.actions;