import axios from 'axios';
import { useEffect, useState } from 'react';
import { Form, FormSelect, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setHandleShow, setTitleModal } from '../../store/slices';
import { getProductsUserThunk } from '../../store/slices/productUser.slice';
import getConfig from '../../utils/getConfig';

const DeleteProduct = ({ show, setShowFunction }) => {
  const valid = show === 4;
  const [productNumber, setProductNumber] = useState(0);
  const dispatch = useDispatch();
  const { id } = JSON.parse(localStorage.getItem('user')) || { id: 0 };
  const products = useSelector(state => state.productsUser);

  useEffect(() => {
    dispatch(getProductsUserThunk(Number(id)));
  }, []);

  const submit = () => {
    if (Number(productNumber) === 0) {
      dispatch(setTitleModal('Select a product'));
      dispatch(setHandleShow(true));
      setTimeout(() => {
        dispatch(setHandleShow(false));
      }, 2000);
      return;
    }

    axios
      .delete(`https://api-ecommerce.alfauzcat.com/api/v1/product/${productNumber}/delete`, getConfig())
      .then(() => {
        dispatch(setTitleModal('Deleted product'));
        dispatch(setHandleShow(true));
        setTimeout(() => {
          dispatch(setHandleShow(false));
        }, 2000);
        dispatch(getProductsUserThunk(id));
        setShowFunction(0);
      })
      .catch(err => {
        console.log(err);
        dispatch(setTitleModal(err.response.data));
        dispatch(setHandleShow(true));
        setTimeout(() => {
          dispatch(setHandleShow(false));
        }, 2000);
      });
  };

  return (
    <Modal aria-labelledby='contained-modal-title-vcenter' centered show={valid} onHide={() => setShowFunction(0)} backdrop='static' keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Are you sure you want to delete a product?</h4>
        <p>Select the role to product:</p>
        <Form onSubmit={submit}>
          <FormSelect className='mb-4' defaultValue={0} onChange={e => setProductNumber(e.target.value)}>
            <option value={0} disabled>
              Select a product
            </option>
            {products.map(product => (
              <option value={product.id} key={product.id}>
                {product.title}
              </option>
            ))}
          </FormSelect>
          <button type='submit' className='btn_admin'>
            Delete Product
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteProduct;
