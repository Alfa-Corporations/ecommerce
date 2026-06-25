import { createSlice } from '@reduxjs/toolkit';
import { API_URL } from '../../utils/api';
import axios from 'axios';
import getConfig from '../../utils/getConfig';
import { setLoader } from './loader.slice';

export const purchasesSlice = createSlice({
  name: 'purchases',
  initialState: [],
  reducers: {
    setPurchases: (state, action) => {
      return action.payload;
    }
  }
});

export const getPurchasesThunk = userId => dispatch => {
  dispatch(setLoader(true));
  return axios
    .get(`${API_URL}/api/v1/user/${userId}/purchases`, getConfig())
    .then(res => dispatch(setPurchases(res.data)))
    .finally(() => dispatch(setLoader(false)));
};

export const { setPurchases } = purchasesSlice.actions;

export default purchasesSlice.reducer;
