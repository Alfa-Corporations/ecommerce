import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../utils/api';
import getConfig from '../utils/getConfig';
import { Container, Row, Col, Card, Table, Badge, Button, Collapse, Image } from 'react-bootstrap';

const statusVariant = status => {
  switch (status) {
    case 'Confirmado':
      return 'info';
    case 'Despachando':
      return 'warning';
    case 'Completo':
      return 'success';
    case 'Entregado':
      return 'dark';
    case 'Cancelled':
      return 'danger';
    default:
      return 'light';
  }
};

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [openId, setOpenId] = useState(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')) || {};

  useEffect(() => {
    if (!user.id || user.roleId !== 1) {
      navigate('/');
      return;
    }
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchOrders = () => {
    axios
      .get(`${API_URL}/api/v1/orders`, getConfig())
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  };

  const updateStatus = (orderId, status) => {
    axios
      .put(`${API_URL}/api/v1/orders/${orderId}/status`, { status }, getConfig())
      .then(() => fetchOrders())
      .catch(err => console.error(err));
  };

  return (
    <Container className='my-4'>
      <Row className='mb-3'>
        <Col>
          <h3 className='mb-0'>Gestión de pedidos</h3>
          <small className='text-muted'>Lista de pedidos recibidos por los clientes</small>
        </Col>
      </Row>

      <Row>
        <Col>
          {orders.length === 0 ? (
            <Card body className='text-center'>
              No hay pedidos aún
            </Card>
          ) : (
            <Card>
              <Table responsive hover className='mb-0'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Cliente</th>
                    <th>Total</th>
                    <th>Fecha</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <React.Fragment key={order.id}>
                      <tr>
                        <td>#{order.id}</td>
                        <td>
                          <div>
                            {order.user?.firstName} {order.user?.lastName}
                          </div>
                          <div className='text-muted' style={{ fontSize: 12 }}>
                            {order.user?.email}
                          </div>
                        </td>
                        <td>$ {order.totalPrice?.toFixed(2)}</td>
                        <td>{new Date(order.createdAt).toLocaleString()}</td>
                        <td>
                          <Badge bg={statusVariant(order.status)}>{order.status}</Badge>
                        </td>
                        <td>
                          <Button size='sm' variant='outline-primary' className='me-2' onClick={() => setOpenId(openId === order.id ? null : order.id)}>
                            {openId === order.id ? 'Ocultar' : 'Ver productos'}
                          </Button>
                          <Button size='sm' variant='success' className='me-1' onClick={() => updateStatus(order.id, 'Confirmado')}>
                            Confirmado
                          </Button>
                          <Button size='sm' variant='warning' className='me-1' onClick={() => updateStatus(order.id, 'Despachando')}>
                            Despachando
                          </Button>
                          <Button size='sm' variant='info' className='me-1' onClick={() => updateStatus(order.id, 'Completo')}>
                            Completo
                          </Button>
                          <Button size='sm' variant='dark' onClick={() => updateStatus(order.id, 'Entregado')}>
                            Entregado
                          </Button>
                        </td>
                      </tr>

                      <tr>
                        <td colSpan={6} className='p-0 border-0'>
                          <Collapse in={openId === order.id}>
                            <div style={{ padding: 12, background: '#f8f9fa' }}>
                              <Row>
                                <Col md={8}>
                                  {order.orderProduct.map(item => (
                                    <Card key={item.id} className='mb-2'>
                                      <Card.Body className='d-flex align-items-center p-2'>
                                        <Image
                                          src={item.product?.productImgs?.[0] && (item.product.productImgs[0].startsWith('/uploads/') ? `${API_URL}${item.product.productImgs[0]}` : item.product.productImgs[0])}
                                          rounded
                                          style={{ width: 64, height: 64, objectFit: 'cover', marginRight: 12 }}
                                        />
                                        <div>
                                          <div style={{ fontWeight: 600 }}>{item.product?.title}</div>
                                          <div className='text-muted' style={{ fontSize: 13 }}>
                                            Cantidad: {item.quantity} · Precio: $ {item.price?.toFixed(2)}
                                          </div>
                                        </div>
                                        <div className='ms-auto' style={{ fontWeight: 600 }}>
                                          $ {item.total?.toFixed(2)}
                                        </div>
                                      </Card.Body>
                                    </Card>
                                  ))}
                                </Col>
                                <Col md={4}>
                                  <Card className='p-2'>
                                    <div>
                                      <strong>Resumen</strong>
                                    </div>
                                    <div className='mt-2'>
                                      Subtotal: <span className='float-end'>$ {order.totalPrice?.toFixed(2)}</span>
                                    </div>
                                    <div className='mt-2'>
                                      Estado:{' '}
                                      <span className='float-end'>
                                        <Badge bg={statusVariant(order.status)}>{order.status}</Badge>
                                      </span>
                                    </div>
                                  </Card>
                                </Col>
                              </Row>
                            </div>
                          </Collapse>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </Table>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AdminOrders;
