import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const fakeUserCredentialsSlice = createSlice({
    name: 'fakeUserCredentials',
    initialState: {
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
         * A reducer function to overwrite the user crendentials data.
         * @param action The user credentials object to overwrite with.
         */
        setCredentials: (state, action: PayloadAction<Store["fakeUserCredentials"]>) => {
            return action.payload;
        },

        /**
         * A reducer function that checks the user's credentials and creates a session if login is valid.
         * @param action The length of time in minutes that the session is valid for.
         */
        createSession: (state, action: PayloadAction<number>) => {
            // A string of characters to create a base64 string.
            // This isn't really random, but just for demo purposes.
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
         * A reducer function to change the username input value for the register form.
         * @param action the username to replace with.
         */
        setRegisterUsername: (state, action: PayloadAction<string>) => {
            state.registerUsername = action.payload;
        },

        /**
         * A reducer function to change the password input value for the register form.
         * @param action the password to replace with.
         */
        setRegisterPassword: (state, action: PayloadAction<string>) => {
            state.registerPassword = action.payload;
        },

        /**
         * A reducer function to set the hash salt on the encrypted password. 
         * @param action the hash and salt in an object to replace with.
         */
        setEncryptedPassword: (state, action: PayloadAction<{ hash: string, salt: string }>) => {
            state.hash = action.payload.hash;
            state.salt = action.payload.salt;
        },

        /**
         * A reducer function to reset the register fields and current session.
         */
        resetRegister: (state) => {
            state.registerPassword = '';
            state.registerUsername = '';
            state.hash = '';
            state.salt = '';
            state.session = {
                key: '',
                expires: 0
            }
        },

        /**
         * A reducer function to change the username input value for the login field.
         * @param action the new username to overwrite with.
         */
        setLoginUsername: (state, action: PayloadAction<string>) => {
            state.loginUsername = action.payload;
        },

        /**
         * A reducer function to change the password input value for the login field.
         * @param action the new password to overwrite with.
         */
        setLoginPassword: (state, action: PayloadAction<string>) => {
            state.loginPassword = action.payload;
        },

        /**
         * A reducer function to reset the login fields and current session.
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
export const { setCredentials, createSession, setEncryptedPassword, setRegisterUsername, setRegisterPassword, resetRegister, setLoginUsername, setLoginPassword, resetLogin } = fakeUserCredentialsSlice.actions;