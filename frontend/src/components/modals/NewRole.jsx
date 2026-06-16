import axios from 'axios';
import { FloatingLabel, Form, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setHandleShow, setTitleModal } from '../../store/slices';
import { getRolesThunk } from '../../store/slices/roles.slice';
import getConfig from '../../utils/getConfig';

const NewRole = ({ show, setShowFunction }) => {
  const valid = show === 7;
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  const submit = data => {
    axios
      .post('https://api-ecommerce.alfauzcat.com/api/v1/role', data, getConfig())
      .then(() => {
        dispatch(setTitleModal('Created role'));
        dispatch(setHandleShow(true));
        setTimeout(() => {
          dispatch(setHandleShow(false));
        }, 2000);
        dispatch(getRolesThunk());
        setShowFunction(0);
      })
      .catch(error => console.log(error));
  };

  return (
    <Modal aria-labelledby='contained-modal-title-vcenter' centered show={valid} onHide={() => setShowFunction(0)} backdrop='static' keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Add new Role</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: '1rem' }}>
        <Form onSubmit={handleSubmit(submit)}>
          <Form.Group className='mb-3'>
            <FloatingLabel className='mb-2' label='Name'>
              <Form.Control {...register('name')} type='text' placeholder='Name' />
            </FloatingLabel>

            <FloatingLabel className='mb-2' label='Description'>
              <Form.Control {...register('description')} type='text' placeholder='Enter Description' />
            </FloatingLabel>
          </Form.Group>

          <button type='submit' className='btn_admin'>
            Create Role
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default NewRole;
