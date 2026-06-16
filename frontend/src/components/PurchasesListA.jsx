import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PurchasesListA = ({ product }) => {
    const productsAll = useSelector(state => state.products)

    const navigate = useNavigate()

    const productSelected = () => {
        navigate(`/product/${product.productId}`);
        window.scrollTo(0, 0);
    }


    return (
        <article className="purchases-product" onClick={() => productSelected(product.productId)}>
            <img src={product.product?.productImgs[0]} alt="photo oh the product" />
            <p>{product.product?.title}</p>
            <p className="purchases-product-quantity">{product?.quantity}</p>
            <b>$ {(product?.price).toFixed(2)}</b>
        </article>
    );
};

export default PurchasesListA;