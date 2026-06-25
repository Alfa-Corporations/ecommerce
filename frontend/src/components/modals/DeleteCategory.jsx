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
      dispatch(setTitleModal('Seleccione una categoría'));
      dispatch(setHandleShow(true));
      setTimeout(() => {
        dispatch(setHandleShow(false));
      }, 2000);
      return;
    }

    axios
      .delete(`${API_URL}/api/v1/category/${categoryNumber}`, getConfig())
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
        <Modal.Title>Eliminar categoría</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>¿Seguro que deseas eliminar una categoría?</h4>
        <p>Selecciona la categoría que deseas eliminar:</p>
        <Form onSubmit={submit}>
          <FormSelect className='mb-4' defaultValue={0} onChange={e => setCategoryNumber(e.target.value)}>
            <option value={0} disabled>
              Seleccione una categoría
            </option>
            {categories.map(category => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
          </FormSelect>
          <button type='submit' className='btn_admin'>
            Eliminar categoría
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteCategory;
