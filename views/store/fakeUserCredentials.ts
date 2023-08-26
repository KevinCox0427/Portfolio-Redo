import { PayloadAction, createSlice } from "@reduxjs/toolkit";
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
        /**
         * A function that checks the user's credentials and creates a session if login is valid.
         * @returns A boolean representing whether the login and session creation was sucessful.
         */
        createSession: (state, action: PayloadAction<number>) => {
            // A string of characters to create a base64 string.
            // Ik this isn't how it's actually how it's done, but just for demo purposes.
            const base64Characters = 'abcdefghijklmnopqrxtuvwxyzABCDEFGHIJKLMNOPQRXTUVWXYZ0123456789+/';

            // Generating a base64 key for the session.
            const key = Array.from(Array(64)).map(() => base64Characters.charAt(Math.random()*64)).join('');
            
            state.loginUsername = '';
            state.loginPassword = '';
            state.session = {
                key: key,
                expires: Date.now() + (action.payload*1000*60)
            }
        },

        /**
         * A function to change the username input value for the register form.
         */
        setRegisterUsername: (state, action: PayloadAction<string>) => {
            state.registerUsername = action.payload;
        },

        /**
         * A function to change the password input value for the register form.
         */
        setRegisterPassword: (state, action: PayloadAction<string>) => {
            state.registerPassword = action.payload;
        },

        /**
         * A function to set the hash salt on the encrypted password. 
         */
        setEncryptedPassword: (state, action: PayloadAction<{ hash: string, salt: string }>) => {
            state.hash = action.payload.hash;
            state.salt = action.payload.salt;
        },

        /**
         * A function to reset the register fields and current session.
         */
        resetRegister: (state) => {
            state.registerPassword = '';
            state.registerUsername = '';
            state.session = {
                key: '',
                expires: 0
            }
        },

        /**
         * A function to change the username input value for the login field.
         */
        setLoginUsername: (state, action: PayloadAction<string>) => {
            state.loginUsername = action.payload;
        },

        /**
         * A function to change the password input value for the login field.
         */
        setLoginPassword: (state, action: PayloadAction<string>) => {
            state.loginPassword = action.payload;
        },

        /**
         * A function to reset the login fields and current session.
         */
        resetLogin: (state) => {
            state.loginUsername = '';
            state.loginPassword = '';
            state.session = {
                key: '',
                expires: 0
            }
        }
    }
});

export default fakeUserCredentialsSlice.reducer;
export const { createSession, setEncryptedPassword, setRegisterUsername, setRegisterPassword, resetRegister, setLoginUsername, setLoginPassword, resetLogin } = fakeUserCredentialsSlice.actions;