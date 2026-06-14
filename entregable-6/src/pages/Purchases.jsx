import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PurchasesList from '../components/PurchasesList';
import { getPurchasesThunk } from '../store/slices/purchases.slice';

const Purchases = () => {
    const dispatch = useDispatch()
    const purchases = useSelector(state => state.purchases)
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'))
    const cart = useSelector(state => state.cart)

    useEffect(() => {
        dispatch(getPurchasesThunk(user.id));
      }, [cart]);

    return (
        <div className='purchases-container'>
            <ul className='list-link'>
                <li onClick={() => navigate('/')} className='list-item-home'>Home</li>
                <li className='list-item-title'>purchases</li>
            </ul>
            <h2><b>My purchases</b></h2>
            {
                purchases.length < 1 ? (
                    <img
                        src="https://cdn4.iconfinder.com/data/icons/ecommerce-outlined/50/Outline_Exports_bag-shopping-sale-purchase-brand-ecommerce-empty-512.png"
                        alt=""
                        style={{ width: '100px', height: 'auto', margin: '0 auto' }}
                    />
                ) : (
                    purchases.map(purchase => (
                        <PurchasesList key={purchase.id} purchase={purchase} listProducts={purchase.orderProduct}/>
                    ))
                )
            }
        </div>
    );
};

export default Purchases;