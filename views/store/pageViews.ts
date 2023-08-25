import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialStore } from "./store";
import portfolioConfig from '../portfolioConfig.json';

// Loading the object for an empty pageViews object.
let defaultPageViews = {
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

// Getting the current page to increment it.
const domain = window.location.href.split('/');
domain.shift();
const page = domain.join('/');

const pageViewsSlice = createSlice({
    name: 'pageViews',
    // loading intial state while incrementing whatever url was currently loaded
    initialState: initialStore ? {...initialStore.pageViews,
        [page]: initialStore.pageViews[page] + 1
    } : {...defaultPageViews,
        [page]: defaultPageViews[page as keyof typeof defaultPageViews] + 1
    } as Store["pageViews"],
    reducers: {
        resetPageViews: (state) => {
            return defaultPageViews;
        }
    }
});

export default pageViewsSlice.reducer;
export const { resetPageViews } = pageViewsSlice.actions;