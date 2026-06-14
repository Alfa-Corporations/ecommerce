import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';
import { setHandleShow } from './handleShow.slice';
import { setLoader } from './loader.slice';
import { setTitleModal } from './titleModal.slice';

export const cartListSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    setCart: (state, action) => {
      return action.payload;
    }
  }
});

export const getSetCart = id => dispatch => {
  if (!id) return;
  dispatch(setLoader(true));
  return axios
    .get(`https://api-ecommerce.alfauzcat.com/api/v1/user/${id}/cart`, getConfig())
    .then(res => dispatch(setCart(res.data[0].cartProduct)))
    .finally(() => dispatch(setLoader(false)));
};

export const getAddToCart = (item, cartId, userId) => dispatch => {
  dispatch(setLoader(true));
  return axios
    .post(`https://api-ecommerce.alfauzcat.com/api/v1/user/cart/${cartId}/product`, item, getConfig())
    .then(() => {
      dispatch(getSetCart(userId));
      dispatch(setTitleModal('The produc was added successfully'));
      dispatch(setHandleShow(true));
      setTimeout(() => {
        dispatch(setHandleShow(false));
      }, 2000);
    })
    .catch(error => {
      dispatch(setTitleModal(error.response.data));
      dispatch(setHandleShow(true));
      setTimeout(() => {
        dispatch(setHandleShow(false));
      }, 2000);
    })
    .finally(() => dispatch(setLoader(false)));
};

export const getUpdateToCart = (item, cartId, userId) => dispatch => {
  dispatch(setLoader(true));
  console.log(item, cartId);
  return axios
    .put(`https://api-ecommerce.alfauzcat.com/api/v1/user/cart/${cartId}/product/update`, item, getConfig())
    .then(res => {
      dispatch(getSetCart(userId));
      dispatch(setTitleModal('Successful update'));
      dispatch(setHandleShow(true));
      setTimeout(() => {
        dispatch(setHandleShow(false));
      }, 2000);
    })
    .catch(error => {
      console.log(error);
      dispatch(setTitleModal(error.response.data));
      dispatch(setHandleShow(true));
      setTimeout(() => {
        dispatch(setHandleShow(false));
      }, 2000);
    })
    .finally(() => dispatch(setLoader(false)));
};

export const purchasesCartThunk = userId => dispatch => {
  dispatch(setLoader(true));
  return axios
    .put(`https://api-ecommerce.alfauzcat.com/api/v1/user/${userId}/purchase`, {}, getConfig())
    .then(() => {
      dispatch(setCart([]));
      dispatch(setTitleModal('Successfull purchase'));
      dispatch(setHandleShow(true));
      setTimeout(() => {
        dispatch(setHandleShow(false));
      }, 2000);
      setTimeout(() => {
        dispatch(setHandleShow(false));
      }, 2000);
    })
    .finally(() => dispatch(setLoader(false)));
};

export const { setCart } = cartListSlice.actions;

export default cartListSlice.reducer;
