import axios from 'axios';
import { FloatingLabel, Form, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setHandleShow, setTitleModal } from '../../store/slices';
import { getCategoryThunk } from '../../store/slices/category.slice';
import getConfig from '../../utils/getConfig';
import { API_URL } from '../../utils/api';

const NewCategory = ({ show, setShowFunction }) => {
  const valid = show === 9;
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  const submit = data => {
    axios
      .post(`${API_URL}/api/v1/category`, data, getConfig())
      .then(() => {
        dispatch(setTitleModal('Categoría creada correctamente'));
        dispatch(setHandleShow(true));
        setTimeout(() => {
          dispatch(setHandleShow(false));
        }, 2000);
        dispatch(getCategoryThunk());
        setShowFunction(0);
      })
      .catch(err => {
        console.error(err);
        dispatch(setTitleModal('Error creating category'));
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
        <Modal.Title>Agregar nueva categoría</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: '1rem' }}>
        <Form onSubmit={handleSubmit(submit)}>
          <Form.Group className='mb-3'>
            <FloatingLabel className='mb-2' label='Nombre'>
              <Form.Control {...register('name')} type='text' placeholder='Nombre' />
            </FloatingLabel>
          </Form.Group>

          <button type='submit' className='btn_admin'>
            Crear categoría
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default NewCategory;
