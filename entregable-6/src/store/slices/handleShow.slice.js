import { createSlice } from '@reduxjs/toolkit';

export const handleShowSlice = createSlice({
    name: 'handleShow',
    initialState: false,
    reducers: {
        setHandleShow: (state, action) => {
            return action.payload
        }
    }
})

export const { setHandleShow } = handleShowSlice.actions;

export default handleShowSlice.reducer;
