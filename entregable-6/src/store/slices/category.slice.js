import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setLoader } from './loader.slice';

export const categorySlice = createSlice({
  name: 'category',
  initialState: [],
  reducers: {
    setCategory: (state, action) => {
      const category = action.payload;
      return category;
    }
  }
});

export const getCategoryThunk = () => dispatch => {
  dispatch(setLoader(true));
  axios.get('https://api-ecommerce.alfauzcat.com/api/v1/categories').then(res => dispatch(setCategory(res.data)));
  //.finally(() => dispatch(setLoader(false)))
};

export const { setCategory } = categorySlice.actions;

export default categorySlice.reducer;
