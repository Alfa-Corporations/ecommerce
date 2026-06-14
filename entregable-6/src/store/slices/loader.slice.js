import { createSlice } from '@reduxjs/toolkit';

export const loaderSlice = createSlice({
    name: 'loader',
    initialState: false ,
    reducers: {
        setLoader: (state, action) => {
            const loader = action.payload
            return loader
        }
    }
})

export const { setLoader } = loaderSlice.actions;

export default loaderSlice.reducer;
