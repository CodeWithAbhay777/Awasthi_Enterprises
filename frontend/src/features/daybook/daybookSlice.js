import { createSlice } from "@reduxjs/toolkit";

export const daybookSlice = createSlice({
    name : "daybook",
    initialState : {
        value : []
    },

    reducers: {
        changeDaybookState : (state , action) => {
            state.value = action.payload;
        }
    }
});

export const {changeDaybookState} = daybookSlice.actions;

export default daybookSlice.reducer;