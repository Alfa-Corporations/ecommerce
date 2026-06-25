import { createSlice } from '@reduxjs/toolkit';
import { API_URL } from '../../utils/api';

export const titleModalSlice = createSlice({
    name: 'titleModal',
    initialState: '',
    reducers: {
        setTitleModal: (state, action) => {
            return action.payload
        }
    }
})

export const { setTitleModal } = titleModalSlice.actions;

export default titleModalSlice.reducer;
