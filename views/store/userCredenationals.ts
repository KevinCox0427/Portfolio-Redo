import { createSlice } from "@reduxjs/toolkit";
import { initialStore } from "./store";

const fakeUserCredentialsSlice = createSlice({
    name: 'fakeUserCredentials',
    initialState: initialStore ? initialStore.fakeUserCredentials : {
        registerUsername: '',
        registerPassword: '',
        loginUsername: '',
        loginPassword: '',
        hash: '',
        salt: '',
        session: {
            key: '',
            expires: 0
        }
    },
    reducers: {
        
    }
});

export default fakeUserCredentialsSlice.reducer;
export const {  } = fakeUserCredentialsSlice.actions;