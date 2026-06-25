import axios from 'axios';
import { FloatingLabel, Form, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setHandleShow, setTitleModal } from '../../store/slices';
import { getRolesThunk } from '../../store/slices/roles.slice';
import getConfig from '../../utils/getConfig';
import { API_URL } from '../../utils/api';

const NewRole = ({ show, setShowFunction }) => {
  const valid = show === 7;
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  const submit = data => {
    axios
      .post(`${API_URL}/api/v1/role`, data, getConfig())
      .then(() => {
        dispatch(setTitleModal('Rol creado correctamente'));
        dispatch(setHandleShow(true));
        setTimeout(() => {
          dispatch(setHandleShow(false));
        }, 2000);
        dispatch(getRolesThunk());
        setShowFunction(0);
      })
      .catch(error => {
        console.error(error);
        dispatch(setTitleModal('Error al crear el rol'));
        dispatch(setHandleShow(true));
        setTimeout(() => {
          dispatch(setHandleShow(false));
        }, 2000);
      });
  };

  return (
    <Modal aria-labelledby='contained-modal-title-vcenter' centered show={valid} onHide={() => setShowFunction(0)} backdrop='static' keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar nuevo rol</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: '1rem' }}>
        <Form onSubmit={handleSubmit(submit)}>
          <Form.Group className='mb-3'>
            <FloatingLabel className='mb-2' label='Nombre'>
              <Form.Control {...register('name')} type='text' placeholder='Nombre' />
            </FloatingLabel>

            <FloatingLabel className='mb-2' label='Descripción'>
              <Form.Control {...register('description')} type='text' placeholder='Descripción' />
            </FloatingLabel>
          </Form.Group>

          <button type='submit' className='btn_admin'>
            Crear rol
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default NewRole;
