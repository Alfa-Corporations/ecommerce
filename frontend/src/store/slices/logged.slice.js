import { createSlice } from '@reduxjs/toolkit';
import { API_URL } from '../../utils/api';

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
