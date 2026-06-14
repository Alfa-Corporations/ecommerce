import axios from 'axios';
import { useState } from 'react';
import { Form, FormSelect, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setHandleShow, setTitleModal } from '../../store/slices';
import { getCategoryThunk } from '../../store/slices/category.slice';
import getConfig from '../../utils/getConfig';

const DeleteCategory = ({ show, setShowFunction }) => {
  const valid = show === 10;
  const [categoryNumber, setCategoryNumber] = useState(0);
  const categories = useSelector(state => state.category);
  const dispatch = useDispatch();

  const submit = () => {
    if (Number(categoryNumber) === 0) {
      dispatch(setTitleModal('Select a category'));
      dispatch(setHandleShow(true));
      setTimeout(() => {
        dispatch(setHandleShow(false));
      }, 2000);
      return;
    }

    axios
      .delete(`https://api-ecommerce.alfauzcat.com/api/v1/category/${categoryNumber}`, getConfig())
      .then(() => {
        dispatch(setTitleModal('Deleted category'));
        dispatch(setHandleShow(true));
        setTimeout(() => {
          dispatch(setHandleShow(false));
        }, 2000);
        dispatch(getCategoryThunk());
        setShowFunction(0);
      })
      .catch(err => {
        dispatch(setTitleModal('Error deleting category'));
        dispatch(setHandleShow(true));
        setTimeout(() => {
          dispatch(setHandleShow(false));
        }, 2000);
        setShowFunction(0);
      });
  };

  return (
    <Modal aria-labelledby='contained-modal-title-vcenter' centered show={valid} onHide={() => setShowFunction(0)} backdrop='static' keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Are you sure you want to delete a category?</h4>
        <p>Select the category you want to delete:</p>
        <Form onSubmit={submit}>
          <FormSelect className='mb-4' defaultValue={0} onChange={e => setCategoryNumber(e.target.value)}>
            <option value={0} disabled>
              Select a category
            </option>
            {categories.map(category => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
          </FormSelect>
          <button type='submit' className='btn_admin'>
            Delete Category
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteCategory;
