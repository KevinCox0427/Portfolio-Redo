import { PayloadAction, createSlice } from "@reduxjs/toolkit";

/**
 * A Redux slice that stores what section of the homepage the user is currently viewing.
 */
const currentSectionSlice = createSlice({
    name: 'currentSection',
    initialState: '' as Store["currentSection"],
    reducers: {
        /**
         * A reducer function to set the current section on the Homepage that's being viewed.
         * @param action
         */
        setCurrentSection: (state, action:PayloadAction<Store["currentSection"]>) => {
            return action.payload
        }
    }
});

export default currentSectionSlice.reducer;
export const { setCurrentSection } = currentSectionSlice.actions;