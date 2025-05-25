import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name : "auth",
    initialState : {
        value : {authentication : false , authUserData : null}
    },

    reducers: {
        changeAuthState : (state , action) => {
            state.value = action.payload;
        }
    }
});


export const {changeAuthState} = authSlice.actions;

export default authSlice.reducer;