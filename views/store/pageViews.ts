import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialStore } from "./store";
import portfolioConfig from '../portfolioConfig.json';

// Loading the object for an empty pageViews object.
let defaultPageViews: { [pageName: string]: number } = {
    "": 0,
    portfolio: 0,
    resume: 0,
    contact: 0
};
portfolioConfig.forEach(project => {
    defaultPageViews = {...defaultPageViews,
        [`portfolio/${project.route}`]: 0
    }
});

const pageViewsSlice = createSlice({
    name: 'pageViews',
    initialState: initialStore ? initialStore.pageViews : defaultPageViews as Store["pageViews"],
    reducers: {
        incrementPageView: (state, action: PayloadAction<string>) => {
            state[action.payload] += 1;
        },

        resetPageViews: (state) => {
            return defaultPageViews;
        }
    }
});

export default pageViewsSlice.reducer;
export const { incrementPageView, resetPageViews } = pageViewsSlice.actions;