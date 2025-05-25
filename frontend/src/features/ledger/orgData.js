import { createSlice } from "@reduxjs/toolkit";

export const orgDataSlice = createSlice({
    name : "orgData",
    initialState : {
        value : []
    },

    reducers: {
        changeOrgDataState : (state , action) => {
            state.value = action.payload;
        }
    }
});

export const {changeOrgDataState} = orgDataSlice.actions;

export default orgDataSlice.reducer;