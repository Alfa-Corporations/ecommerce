import { setCart, getSetCart, getAddToCart, getUpdateToCart, purchasesCartThunk } from "./cartList.slice";
import { setCategory } from "./category.slice";
import { setHandleShow } from "./handleShow.slice";
import { setLoader } from "./loader.slice";
import { setLogged } from "./logged.slice";
import { setProducts, getProductsThunk } from "./products.slice";
import { getProductsUserThunk } from "./productUser.slice";
import { setPurchases, getPurchasesThunk } from "./purchases.slice";
import { getRolesThunk } from "./roles.slice";
import { setTitleModal } from "./titleModal.slice";
import { getUsersThunk } from "./users.slice";

export {
    setCart, getSetCart, getAddToCart, getUpdateToCart, purchasesCartThunk,
    setCategory,
    setHandleShow,
    setLoader,
    setLogged,
    setProducts, getProductsThunk,
    getProductsUserThunk,
    setPurchases, getPurchasesThunk,
    getRolesThunk,
    setTitleModal,
    getUsersThunk
};