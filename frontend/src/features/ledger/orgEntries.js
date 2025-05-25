import { createSlice } from "@reduxjs/toolkit";

export const orgEntriesSlice = createSlice({
    name : "orgEntries",
    initialState : {
        value : []
    },

    reducers: {
        changeOrgEntriesState : (state , action) => {
            state.value = action.payload;
        }
    }
});

export const {changeOrgEntriesState} = orgEntriesSlice.actions;

export default orgEntriesSlice.reducer;