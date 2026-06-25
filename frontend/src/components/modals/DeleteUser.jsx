import axios from 'axios';
import { useState } from 'react';
import { Form, FormSelect, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setHandleShow, setTitleModal } from '../../store/slices';
import { getUsersThunk } from '../../store/slices/users.slice';
import getConfig from '../../utils/getConfig';

const DeleteUser = ({ show, setShowFunction }) => {
  const valid = show === 2;
  const dispatch = useDispatch();
  const [userSelected, setUserSelected] = useState(0);
  const users = useSelector(state => state.users) || [];

  const submit = () => {
    if (Number(userSelected) === 0) {
      dispatch(setTitleModal('Seleccione un usuario'));
      dispatch(setHandleShow(true));
      setTimeout(() => {
        dispatch(setHandleShow(false));
      }, 2000);
      return;
    }

    axios.delete(`${API_URL}/api/v1/user/${userSelected}`, getConfig()).then(() => {
      dispatch(setTitleModal('Deleted user'));
      dispatch(setHandleShow(true));
      setTimeout(() => {
        dispatch(setHandleShow(false));
      }, 2000);
      dispatch(getUsersThunk());
      setShowFunction(0);
    });
  };

  return (
    <Modal aria-labelledby='contained-modal-title-vcenter' centered show={valid} onHide={() => setShowFunction(0)} backdrop='static' keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Eliminar usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>¿Seguro que deseas eliminar un usuario?</h4>
        <p>Selecciona el usuario que deseas eliminar:</p>
        <Form onSubmit={submit}>
          <FormSelect className='mb-4' defaultValue={0} onChange={e => setUserSelected(e.target.value)}>
            <option value={0} disabled>
              Seleccione un usuario
            </option>
            {users.map(user => (
              <option value={user.id} key={user.id}>
                {user.firstName} {user.lastName}
              </option>
            ))}
          </FormSelect>
          <button type='submit' className='btn_admin'>
            Eliminar usuario
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteUser;
