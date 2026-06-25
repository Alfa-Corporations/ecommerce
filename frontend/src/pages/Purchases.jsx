import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PurchasesList from '../components/PurchasesList';
import { getPurchasesThunk } from '../store/slices/purchases.slice';
import { io } from 'socket.io-client';

const Purchases = () => {
  const dispatch = useDispatch();
  const purchases = useSelector(state => state.purchases);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const cart = useSelector(state => state.cart);

  useEffect(() => {
    dispatch(getPurchasesThunk(user.id));
  }, [cart]);

  useEffect(() => {
    // Connect to socket.io server to receive order status updates
    const socket = io('http://localhost:8000');
    socket.on('orderStatusUpdated', data => {
      if (data && data.userId === user.id) {
        dispatch(getPurchasesThunk(user.id));
      }
    });
    return () => socket.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='purchases-container'>
      <ul className='list-link'>
        <li onClick={() => navigate('/')} className='list-item-home'>
          Home
        </li>
        <li className='list-item-title'>purchases</li>
      </ul>
      <h2>
        <b>My purchases</b>
      </h2>
      {purchases.length < 1 ? (
        <img src='https://cdn4.iconfinder.com/data/icons/ecommerce-outlined/50/Outline_Exports_bag-shopping-sale-purchase-brand-ecommerce-empty-512.png' alt='' style={{ width: '100px', height: 'auto', margin: '0 auto' }} />
      ) : (
        purchases.map(purchase => <PurchasesList key={purchase.id} purchase={purchase} listProducts={purchase.orderProduct} />)
      )}
    </div>
  );
};

export default Purchases;
