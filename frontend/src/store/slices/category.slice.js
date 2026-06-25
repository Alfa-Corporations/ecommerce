import { createSlice } from '@reduxjs/toolkit';
import { API_URL } from '../../utils/api';
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
  axios.get(`${API_URL}/api/v1/categories`)
    .then(res => dispatch(setCategory(res.data)))
    .catch(error => console.error('Category fetch failed:', error))
    .finally(() => dispatch(setLoader(false)));
};

export const { setCategory } = categorySlice.actions;

export default categorySlice.reducer;
