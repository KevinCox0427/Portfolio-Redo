import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const spotifySearchSlice = createSlice({
    name: 'spotifySearch',
    initialState: {
        searchBar: '',
        searchResults: [],
        searchRecommendations: []
    } as Store["spotifySearch"],
    reducers: {
        setSpotifySearch: (state, action: PayloadAction<Store["spotifySearch"]>) => {
            return action.payload;
        },

        /**
         * Reducer for when the user inputs a search for a spotify song.
         * We'll also reset the current results as they need to change.
         * @param action The current HTML input's value.
         */
        setSpotifySearchBar: (state, action: PayloadAction<string>) => {
            return {
                searchBar: action.payload,
                searchResults: [],
                searchRecommendations: []
            }
        },

        /**
         * Reducer to set the spotify search results
         * @param action The new results to overwrite with.
         */
        setSpotifySearchResults: (state, action: PayloadAction<SpotifyResponseSong[]>) => {
            state.searchResults = action.payload;
            state.searchRecommendations = [];
        },

        /**
         * Reducer to set the spotify recommendation results
         * @param action The new recommendations to overwrite with.
         */
        setSpotifyRecommendationResults: (state, action: PayloadAction<SpotifyResponseSong[]>) => {
            state.searchRecommendations = action.payload;
        },

        /**
         * Reducer to reset all the spotify search data.
         */
        resetSpotifyResults: (state) => {
            return {
                searchBar: '',
                searchResults: [],
                searchRecommendations: []
            }
        }
    }
});

export default spotifySearchSlice.reducer;
export const { setSpotifySearch, setSpotifySearchBar, setSpotifySearchResults, setSpotifyRecommendationResults, resetSpotifyResults } = spotifySearchSlice.actions;