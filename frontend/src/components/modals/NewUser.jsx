import axios from 'axios';
import { useState } from 'react';
import { FloatingLabel, Form, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setHandleShow, setTitleModal } from '../../store/slices';
import { API_URL } from '../../utils/api';

const NewUser = ({ show, setShowFunction }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();
  const [role, setRole] = useState(0);
  const valid = show === 1;

  const roles = useSelector(state => state.roles);
  const roleOptions = Array.isArray(roles)
    ? roles
    : [
        { id: 1, name: 'Administrador' },
        { id: 2, name: 'Cliente' }
      ];

  const submit = data => {
    data.role = Number(role);
    axios
      .post(`${API_URL}/api/v1/user`, data)
      .then(() => {
        reset();
        dispatch(setTitleModal('Usuario agregado correctamente'));
        dispatch(setHandleShow(true));
        setTimeout(() => {
          dispatch(setHandleShow(false));
        }, 2000);
        setShowFunction(0);
      })
      .catch(err => {
        console.error(err);
        dispatch(setTitleModal('Error al crear el usuario'));
        dispatch(setHandleShow(true));
        setTimeout(() => {
          dispatch(setHandleShow(false));
        }, 2000);
      });
  };

  return (
    <Modal aria-labelledby='contained-modal-title-vcenter' centered show={valid} onHide={() => setShowFunction(0)} backdrop='static' keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Add new User</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: '1rem' }}>
        <Form onSubmit={handleSubmit(submit)}>
          <Form.Group className='mb-3'>
            <FloatingLabel className='mb-2' label='Email'>
              <Form.Control {...register('email')} type='email' placeholder='Email' />
            </FloatingLabel>

            <FloatingLabel className='mb-2' label='First Name'>
              <Form.Control {...register('firstName')} type='text' placeholder='Enter First Name' />
            </FloatingLabel>

            <FloatingLabel className='mb-2' label='Last Name'>
              <Form.Control {...register('lastName')} type='text' placeholder='Enter Last Name' />
            </FloatingLabel>

            <FloatingLabel className='mb-2' label='Password'>
              <Form.Control {...register('password')} type='password' placeholder='Enter Password' />
            </FloatingLabel>

            <FloatingLabel className='mb-2' label='Phone'>
              <Form.Control {...register('phoneNumber')} type='text' placeholder='Enter Phone' />
            </FloatingLabel>

            <Form.Select defaultValue={0} onChange={e => setRole(e.target.value)}>
              <option value={0} disabled>
                Select Role
              </option>
              {roles.map(role => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <button type='submit' className='btn_admin'>
            Add User
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default NewUser;
