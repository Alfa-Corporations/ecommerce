import axios from 'axios';
import { Form, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setHandleShow, setTitleModal } from '../../store/slices';
import getConfig from '../../utils/getConfig';

const Verify = ({ show, user }) => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const { id } = user;
  const token = window.localStorage.getItem('token');
  show = token && show;

  const submit = data => {
    data.codeVerify = Number(data.codeVerify);
    axios
      .put(`${API_URL}/api/v1/user/${id}/verify`, data, getConfig())
      .then(() => {
        dispatch(setTitleModal('Verificación exitosa'));
        dispatch(setHandleShow(true));
        setTimeout(() => {
          dispatch(setHandleShow(false));
        }, 2000);
        user.isVerify = true;
        window.localStorage.setItem('user', JSON.stringify(user));
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch(error => {
        console.log(error);
        dispatch(setTitleModal('Error en la verificación'));
        dispatch(setHandleShow(true));
        setTimeout(() => {
          dispatch(setHandleShow(false));
        }, 2000);
      });
  };
  return (
    <Modal aria-labelledby='contained-modal-title-vcenter' centered show={show} backdrop='static' keyboard={false}>
      <Modal.Header>
        <Modal.Title>Verificar usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>¡No has verificado tu correo electrónico!</h4>
        <p>Te enviamos un código de verificación al correo registrado.</p>
        <Form onSubmit={handleSubmit(submit)}>
          <Form.FloatingLabel label='Código' className='mb-4'>
            <Form.Control type='number' placeholder='Ingresa el código' {...register('codeVerify', { required: true })} />
          </Form.FloatingLabel>
          <button type='submit' className='btn_admin'>
            Verificar
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Verify;
