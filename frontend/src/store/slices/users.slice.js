import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setLoader } from './loader.slice';

export const UserSlice = createSlice({
  name: 'userSlice',
  initialState: [],
  reducers: {
    setUserSlice: (state, action) => {
      return action.payload;
    }
  }
});

export const getUsersThunk = () => dispatch => {
  dispatch(setLoader(true));
  return axios
    .get('https://api-ecommerce.alfauzcat.com/api/v1/user/all')
    .then(res => dispatch(setUserSlice(res.data)))
    .catch(err => console.log(err, 'hi'))
    .finally(() => dispatch(setLoader(false)));
};

export const { setUserSlice } = UserSlice.actions;

export default UserSlice.reducer;
