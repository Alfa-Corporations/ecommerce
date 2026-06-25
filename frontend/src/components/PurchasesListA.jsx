import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../utils/api';

const PurchasesListA = ({ product }) => {
  const productsAll = useSelector(state => state.products);

  const navigate = useNavigate();

  const productSelected = () => {
    navigate(`/product/${product.productId}`);
    window.scrollTo(0, 0);
  };

  const resolveImgUrl = img => {
    if (!img) return '';
    return img.startsWith('/uploads/') ? `${API_URL}${img}` : img;
  };

  return (
    <article className='purchases-product' onClick={() => productSelected(product.productId)}>
      <img src={resolveImgUrl(product.product?.productImgs[0])} alt='photo oh the product' />
      <p>{product.product?.title}</p>
      <p className='purchases-product-quantity'>{product?.quantity}</p>
      <b>$ {(product?.price).toFixed(2)}</b>
    </article>
  );
};

export default PurchasesListA;
