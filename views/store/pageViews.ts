import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import portfolioConfig from '../portfolioConfig.json';

// Loading the object for an empty pageViews object.
let defaultPageViews: { [pageName: string]: number } = {
    "": 0,
    portfolio: 0,
    about: 0,
    contact: 0
};
portfolioConfig.forEach(project => {
    defaultPageViews = {...defaultPageViews,
        [`portfolio/${project.route}`]: 0
    }
});

const pageViewsSlice = createSlice({
    name: 'pageViews',
    initialState: defaultPageViews as Store["pageViews"],
    reducers: {
        setPageViews: (state, action: PayloadAction<{ [pageName: string]: number }>) => {
            return action.payload;
        },

        incrementPageView: (state, action: PayloadAction<string>) => {
            state[action.payload] = state[action.payload] + 1;
        },

        resetPageViews: (state) => {
            return defaultPageViews;
        }
    }
});

export default pageViewsSlice.reducer;
export const { setPageViews, incrementPageView, resetPageViews } = pageViewsSlice.actions;