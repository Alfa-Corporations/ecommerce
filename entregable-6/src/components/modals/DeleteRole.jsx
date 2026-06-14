import axios from 'axios';
import { useState } from 'react';
import { Form, FormSelect, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setHandleShow, setTitleModal } from '../../store/slices';
import { getRolesThunk } from '../../store/slices/roles.slice';
import getConfig from '../../utils/getConfig';

const DeleteRole = ({ show, setShowFunction }) => {
  const valid = show === 8;
  const dispatch = useDispatch();
  const [roleNumber, setRoleNumber] = useState(0);
  const roles = useSelector(state => state.roles);

  const submit = () => {
    if (Number(roleNumber) === 0) {
      dispatch(setTitleModal('Select a role'));
      dispatch(setHandleShow(true));
      setTimeout(() => {
        dispatch(setHandleShow(false));
      }, 2000);
      return;
    }

    axios.delete(`https://api-ecommerce.alfauzcat.com/api/v1/role/${roleNumber}`, getConfig()).then(() => {
      dispatch(setTitleModal('Deleted role'));
      dispatch(setHandleShow(true));
      setTimeout(() => {
        dispatch(setHandleShow(false));
      }, 2000);
      dispatch(getRolesThunk());
      setShowFunction(0);
    });
  };

  return (
    <Modal aria-labelledby='contained-modal-title-vcenter' centered show={valid} onHide={() => setShowFunction(0)} backdrop='static' keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Role</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Are you sure you want to delete a role?</h4>
        <p>Select the role to delete:</p>
        <Form onSubmit={submit}>
          <FormSelect className='mb-4' defaultValue={0} onChange={e => setRoleNumber(e.target.value)}>
            <option value={0} disabled>
              Select a role
            </option>
            {roles.map(role => (
              <option value={role.id} key={role.id}>
                {role.name}
              </option>
            ))}
          </FormSelect>
          <button type='submit' className='btn_admin'>
            Delete Role
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteRole;
