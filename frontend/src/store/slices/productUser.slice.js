import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';
import { setLoader } from './loader.slice';

export const productUserSlice = createSlice({
  name: 'productUser',
  initialState: [],
  reducers: {
    setProductUser: (state, action) => {
      return action.payload;
    }
  }
});

export const getProductsUserThunk = id => dispatch => {
  dispatch(setLoader(true));
  return axios
    .get(`https://api-ecommerce.alfauzcat.com/api/v1/product/user/${id}`, getConfig())
    .then(res => dispatch(setProductUser(res.data)))
    .finally(() => dispatch(setLoader(false)));
};

export const { setProductUser } = productUserSlice.actions;

export default productUserSlice.reducer;
