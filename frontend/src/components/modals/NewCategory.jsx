import axios from 'axios';
import { FloatingLabel, Form, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setHandleShow, setTitleModal } from '../../store/slices';
import { getCategoryThunk } from '../../store/slices/category.slice';
import getConfig from '../../utils/getConfig';

const NewCategory = ({ show, setShowFunction }) => {
  const valid = show === 9;
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  const submit = data => {
    axios
      .post('https://api-ecommerce.alfauzcat.com/api/v1/category', data, getConfig())
      .then(res => {
        dispatch(setTitleModal('Category created successfully'));
        dispatch(setHandleShow(true));
        setTimeout(() => {
          dispatch(setHandleShow(false));
        }, 2000);
        dispatch(getCategoryThunk());
        setShowFunction(0);
      })
      .catch(err => {
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
        <Modal.Title>Add new Category</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: '1rem' }}>
        <Form onSubmit={handleSubmit(submit)}>
          <Form.Group className='mb-3'>
            <FloatingLabel className='mb-2' label='Name'>
              <Form.Control {...register('name')} type='text' placeholder='Name' />
            </FloatingLabel>
          </Form.Group>

          <button type='submit' className='btn_admin'>
            Create Category
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default NewCategory;
