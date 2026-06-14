import axios from 'axios';
import { useState } from 'react';
import { FloatingLabel, Form, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setHandleShow, setTitleModal, getProductsThunk, getProductsUserThunk } from '../../store/slices';
import getConfig from '../../utils/getConfig';

const NewProduct = ({ show, setShowFunction }) => {
  const valid = show === 3;
  const dispatch = useDispatch();
  const categories = useSelector(state => state.category);
  const [categorySelected, setCategorySelected] = useState(0);
  const { id } = JSON.parse(localStorage.getItem('user')) || { id: 0 };
  const { register, handleSubmit, reset } = useForm();

  const submit = data => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('price', data.price);
    formData.append('description', data.description);
    formData.append('stock', data.stock);
    formData.append('categoryId', categorySelected);
    formData.append('userId', id);
    let i = 1;
    for (const file of data.productImgs) {
      i++;
      formData.append(`img${i}`, file);
    }

    axios
      .post('https://api-ecommerce.alfauzcat.com/api/v1/product', formData, getConfig())
      .then(res => {
        console.log(res);
        reset();
        dispatch(setTitleModal('Successfully added product'));
        dispatch(setHandleShow(true));
        setTimeout(() => {
          dispatch(setHandleShow(false));
        }, 2000);
        dispatch(getProductsThunk());
        dispatch(getProductsUserThunk(id));
        setShowFunction(0);
      })
      .catch(err => {
        console.log(err);
        dispatch(setTitleModal(err.response.data.message));
        dispatch(setHandleShow(true));
        setTimeout(() => {
          dispatch(setHandleShow(false));
        }, 2000);
      });
  };

  return (
    <Modal aria-labelledby='contained-modal-title-vcenter' centered show={valid} onHide={() => setShowFunction(0)} backdrop='static' keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Add new Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ padding: '0 1.5rem' }}>
          <Form onSubmit={handleSubmit(submit)}>
            <Form.Group className='mb-3'>
              <FloatingLabel className='mb-2' label='Title'>
                <Form.Control {...register('title')} type='text' placeholder='Title' />
              </FloatingLabel>

              <FloatingLabel className='mb-2' label='Price'>
                <Form.Control {...register('price')} type='text' placeholder='Enter Price' />
              </FloatingLabel>

              <FloatingLabel className='mb-2' label='Description'>
                <Form.Control {...register('description')} as='textarea' placeholder='Leave a comment here' style={{ height: '100px' }} />
              </FloatingLabel>

              <Form.Select className='mb-2' defaultValue={0} onChange={e => setCategorySelected(Number(e.target.value))}>
                <option value={0} disabled>
                  Select Category
                </option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Form.Select>

              <FloatingLabel className='mb-2' label='Stock'>
                <Form.Control {...register('stock')} type='number' placeholder='Enter Stock' />
              </FloatingLabel>

              <Form.Label>Images</Form.Label>
              <Form.Control type='file' {...register('productImgs')} multiple />
            </Form.Group>
            <button type='submit' className='btn_admin'>
              Add Product
            </button>
          </Form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default NewProduct;
