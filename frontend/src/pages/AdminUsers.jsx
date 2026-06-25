import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Table, Button, Badge } from 'react-bootstrap';
import { API_URL } from '../utils/api';
import getConfig from '../utils/getConfig';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    axios
      .get(`${API_URL}/api/v1/user/all`, getConfig())
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const approve = (id, approved) => {
    axios
      .put(`${API_URL}/api/v1/user/${id}/approve`, { approved }, getConfig())
      .then(() => fetchUsers())
      .catch(err => console.error(err));
  };

  const setActive = (id, active) => {
    axios
      .put(`${API_URL}/api/v1/user/${id}/active`, { active }, getConfig())
      .then(() => fetchUsers())
      .catch(err => console.error(err));
  };

  return (
    <Container className='my-4'>
      <Row className='mb-3'>
        <Col>
          <h3 className='mb-0'>Gestión de usuarios</h3>
          <small className='text-muted'>Aprobar, activar o desactivar cuentas</small>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Table responsive hover className='mb-0'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Teléfono</th>
                  <th>Cédula</th>
                  <th>Aprobado</th>
                  <th>Activo</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id}>
                    <td>#{u.id}</td>
                    <td>
                      {u.firstName} {u.lastName}
                    </td>
                    <td>{u.email}</td>
                    <td>{u.phoneNumber || '-'}</td>
                    <td>{u.cedula || '-'}</td>
                    <td>{u.isApproved ? <Badge bg='success'>Aprobado</Badge> : <Badge bg='secondary'>Pendiente</Badge>}</td>
                    <td>{u.isActive ? <Badge bg='info'>Activo</Badge> : <Badge bg='danger'>Desactivado</Badge>}</td>
                    <td>
                      <Button size='sm' variant='outline-success' className='me-1' onClick={() => approve(u.id, true)}>
                        Aprobar
                      </Button>
                      <Button size='sm' variant='outline-danger' className='me-1' onClick={() => approve(u.id, false)}>
                        Rechazar
                      </Button>
                      {u.isActive ? (
                        <Button size='sm' variant='warning' onClick={() => setActive(u.id, false)}>
                          Desactivar
                        </Button>
                      ) : (
                        <Button size='sm' variant='success' onClick={() => setActive(u.id, true)}>
                          Activar
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminUsers;
