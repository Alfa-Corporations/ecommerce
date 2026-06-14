import { configureStore } from '@reduxjs/toolkit'
import cartListSlice from './slices/cartList.slice'
import categorySlice from './slices/category.slice'
import handleShowSlice from './slices/handleShow.slice'
import loaderSlice from './slices/loader.slice'
import loggedSlice from './slices/logged.slice'
import productsSlice from './slices/products.slice'
import productUserSlice from './slices/productUser.slice'
import purchasesSlice from './slices/purchases.slice'
import rolesSlice from './slices/roles.slice'
import titleModalSlice from './slices/titleModal.slice'
import usersSlice from './slices/users.slice'


export default configureStore({
    reducer: {
        loader: loaderSlice,
        products: productsSlice,
        category: categorySlice,
        purchases: purchasesSlice,
        cart: cartListSlice,
        handleShow: handleShowSlice,
        titleModal: titleModalSlice,
        roles: rolesSlice,
        productsUser: productUserSlice,
        logged: loggedSlice,
        users: usersSlice
    }
})
