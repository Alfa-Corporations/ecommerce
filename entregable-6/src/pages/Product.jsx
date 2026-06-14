import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getAddToCart, getUpdateToCart, setLoader, getProductsThunk } from '../store/slices';

const Product = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const products = useSelector(state => state.products)
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState(1)
    const cartProducts = useSelector(state => state.cart)
    const token = window.localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('user')) || {}

    const productCurrent = products.find(product => product.id === Number(id))
    const productsCategories = products.filter(product => product.category.id === productCurrent.category.id)
    const cartProductCurrent = cartProducts.find(product => product.productId === Number(id))

    const productSelected = idSelected => {
        navigate(`/product/${idSelected}`)
        window.scroll({
            top: 0,
            behavior: 'smooth'
        });
    }

    const addProductToCart = () => {
        if (token) {
            const item = {
                "productId": Number(id)
            }

            const cartId = user.cart.id

            if (cartProductCurrent !== undefined) {
                item.quantity = quantity + Number(cartProductCurrent.quantity)
                dispatch(getUpdateToCart(item, cartId, user.id))
            } else {
                item.quantity = quantity
                dispatch(getAddToCart(item, cartId, user.id))
            }
            dispatch(getProductsThunk())
        } else {
            navigate('/login')
        }
    }

    return (
        <div className='main-products'>
            <ul className='list-link'>
                <li onClick={() => navigate('/')} className='list-item-home'>Home</li>
                <li className='list-item-title'>{productCurrent?.title}</li>
            </ul>
            <section className='detail-current-product'>
                <article>
                    <Carousel variant='dark'>
                        {
                            productCurrent?.productImgs.map(img => (
                                <Carousel.Item interval={2000} key={img}>
                                    <img className="d-block w-100 img-suggestion" src={img} alt="Photo one of the Product" onLoad={() => dispatch(setLoader(false))} />
                                </Carousel.Item>
                            ))
                        }
                    </Carousel>
                </article>
                <article>
                    <h3>{productCurrent?.title}</h3>
                    <div className='price-quantity'>
                        <div>
                            <p>Price</p>
                            <b>$ {(productCurrent?.price)?.toFixed(2)}</b>
                        </div>
                        <div className='quantity'>
                            <p>Quantity</p>
                            <button disabled={quantity === 1} onClick={() => setQuantity(quantity - 1)} className='material-symbols-outlined'>remove</button>
                            <span>{quantity}</span>
                            <button onClick={() => setQuantity(quantity + 1)} className='material-symbols-outlined'>add</button>
                        </div>
                        <p><b>Stock:</b> {productCurrent?.stock}</p>
                        <button onClick={() => addProductToCart()} className='addToCart-currentProduct'>Add to cart <span className='material-symbols-outlined'>shopping_cart</span></button>
                    </div>
                    <p className='detail-product'>{productCurrent?.description}</p>
                </article>
            </section>
            <h3 className='h3-suggestion'>Suggestions</h3>
            <section className='container-products'>
                {
                    productsCategories.map(product => (
                        <article className='product-card' key={product.id} onClick={() => productSelected(product.id)}>
                            <div className='img-product'>
                                <img src={product.productImgs?.[0]} alt="" onLoad={() => dispatch(setLoader(false))} />
                            </div>
                            <div className='description-product'>
                                <h4>{product.title}</h4>
                                <b>Price</b>
                                <span>$ {(product.price)?.toFixed(2)}</span>
                                <p><span>Stock:</span> {product.stock}</p>
                            </div>
                            <button className='material-symbols-outlined add-to-cart'>shopping_cart</button>
                        </article>
                    ))
                }
            </section>
        </div>
    );
};

export default Product;