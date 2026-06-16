import { createSlice } from '@reduxjs/toolkit';

export const LoggedSlice = createSlice({
    name: 'logged',
    initialState: false,
    reducers: {
        setLogged: (state, action) => {
            return action.payload;
        }
    }
})

export const { setLogged } = LoggedSlice.actions;

export default LoggedSlice.reducer;
