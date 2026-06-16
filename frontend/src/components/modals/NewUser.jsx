import axios from 'axios';
import { useState } from 'react';
import { FloatingLabel, Form, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { setTitleModal } from '../../store/slices';

const NewUser = ({ show, setShowFunction }) => {
  const { register, handleSubmit, reset } = useForm();
  const [role, setRole] = useState(0);
  const valid = show === 1;

  const roles = useSelector(state => state.roles) || [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'User' }
  ];

  const submit = data => {
    data.role = Number(role);
    axios
      .post('https://api-ecommerce.alfauzcat.com/api/v1/user', data)
      .then(res => {
        console.log(res.data);
        reset();
        dispatch(setTitleModal('Successfully added user'));
        dispatch(setHandleShow(true));
        setTimeout(() => {
          dispatch(setHandleShow(false));
        }, 2000);
        setShowFunction(0);
      })
      .catch(err => console.log(err));
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
