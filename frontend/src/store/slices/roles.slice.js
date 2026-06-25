import { createSlice } from '@reduxjs/toolkit';
import { API_URL } from '../../utils/api';
import axios from 'axios';
import { setLoader } from './loader.slice';

export const roleSlice = createSlice({
  name: 'roles',
  initialState: [],
  reducers: {
    setRole: (state, action) => {
      return action.payload;
    }
  }
});

export const getRolesThunk = () => dispatch => {
  dispatch(setLoader(true));
  return axios
    .get(`${API_URL}/api/v1/roles`)
    .then(res => dispatch(setRole(res.data)))
    .finally(() => dispatch(setLoader(false)));
};

export const { setRole } = roleSlice.actions;

export default roleSlice.reducer;
