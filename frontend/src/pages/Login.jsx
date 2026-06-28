import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoader, setHandleShow, setTitleModal, setLogged, setCart } from '../store/slices';
import { API_URL } from '../utils/api';
import { Accordion } from 'react-bootstrap';
import NewUser from '../components/modals/NewUser';
import NewProduct from '../components/modals/NewProduct';
import NewRole from '../components/modals/NewRole';
import NewCategory from '../components/modals/NewCategory';
import DeleteRole from '../components/modals/DeleteRole';
import DeleteCategory from '../components/modals/DeleteCategory';
import DeleteProduct from '../components/modals/DeleteProduct';
import DeleteUser from '../components/modals/DeleteUser';
import Verify from '../components/modals/Verify';

const Login = () => {
  const [loginSignup, setLoginSignup] = useState(true);
  const [typeInput, setTypeInput] = useState('password');
  const [visibility, setVisibility] = useState('visibility');
  const [show, setShow] = useState(0);
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  dispatch(setLoader(false));

  const user = JSON.parse(window.localStorage.getItem('user')) || {};
  const login = useSelector(state => state.logged);
  const { firstName, lastName, roleId, isVerify } = user;

  const resetData = () => {
    reset();
  };

  const submit = userData => {
    axios
      .post(`${API_URL}/api/v1/login`, userData)
      .then(res => {
        window.localStorage.setItem('token', res.data.token);
        window.localStorage.setItem('user', JSON.stringify(res.data.user));
        resetData();
        dispatch(setLogged(true));
        dispatch(setTitleModal('Successful login'));
        dispatch(setHandleShow(true));
        setTimeout(() => {
          dispatch(setHandleShow(false));
        }, 2000);
        navigate('/');
      })
      .catch(error => {
        dispatch(setTitleModal(error.response.data.message));
        dispatch(setHandleShow(true));
      });
  };

  const userRegister = newUser => {
    axios
      .post(`${API_URL}/api/v1/user`, newUser)
      .then(() => {
        dispatch(setTitleModal('Successful registration'));
        dispatch(setHandleShow(true));
        setTimeout(() => {
          dispatch(setHandleShow(false));
        }, 2000);
        resetData();
        changeSection();
      })
      .catch(error => console.log(error));
  };

  const changeSection = () => {
    setLoginSignup(!loginSignup);
  };

  const isVisible = () => {
    if (typeInput === 'password' && visibility === 'visibility') {
      setTypeInput('text');
      setVisibility('visibility_off');
    } else {
      setTypeInput('password');
      setVisibility('visibility');
    }
  };

  const logout = () => {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('user');
    dispatch(setLogged(false));
    dispatch(setTitleModal('Successful logout'));
    dispatch(setHandleShow(true));
    dispatch(setCart([]));
    setTimeout(() => {
      dispatch(setHandleShow(false));
    }, 2000);
    window.location.reload();
  };

  const setShowFunction = data => {
    setShow(data);
  };

  return (
    <div className='login-container'>
      <Verify show={!isVerify} user={user} />
      <NewUser show={show} setShowFunction={setShowFunction} />
      <DeleteUser show={show} setShowFunction={setShowFunction} />
      <NewProduct show={show} setShowFunction={setShowFunction} />
      <DeleteProduct show={show} setShowFunction={setShowFunction} />
      <NewRole show={show} setShowFunction={setShowFunction} />
      <DeleteRole show={show} setShowFunction={setShowFunction} />
      <NewCategory show={show} setShowFunction={setShowFunction} />
      <DeleteCategory show={show} setShowFunction={setShowFunction} />
      {login ? (
        roleId !== 1 ? (
          <div className='login-successful'>
            <h4>
              ¡Hola! {firstName} {lastName}
            </h4>
            <a href='#' onClick={logout}>
              Cerrar sesión
            </a>
          </div>
        ) : (
          <article className='login-successful'>
            <section>
              <h4>
                ¡Hola! {firstName} {lastName}
              </h4>
              <p>A continuación puedes gestionar productos, usuarios, roles y categorías de la ferretería.</p>
            </section>
            <section className='admin-section__buttons'>
              <Accordion>
                <Accordion.Item eventKey='0'>
                  <Accordion.Header>Gestión de usuarios</Accordion.Header>
                  <Accordion.Body className='btn_admin_management'>
                    <button className='btn_admin' onClick={() => setShow(1)}>
                      <b className='material-symbols-outlined'>add</b> Agregar usuario
                    </button>
                    <button className='btn_admin' onClick={() => setShow(2)}>
                      <b className='material-symbols-outlined'>remove</b> Eliminar usuario
                    </button>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey='4'>
                  <Accordion.Header>Gestión de pedidos</Accordion.Header>
                  <Accordion.Body className='btn_admin_management'>
                    <button className='btn_admin' onClick={() => navigate('/admin/orders')}>
                      <b className='material-symbols-outlined'>inventory_2</b> Gestionar pedidos
                    </button>
                  </Accordion.Body>
                </Accordion.Item>{' '}
                <Accordion.Item eventKey='5'>
                  <Accordion.Header>Gestión de usuarios</Accordion.Header>
                  <Accordion.Body className='btn_admin_management'>
                    <button className='btn_admin' onClick={() => navigate('/admin/users')}>
                      <b className='material-symbols-outlined'>people</b> Gestionar usuarios
                    </button>
                  </Accordion.Body>
                </Accordion.Item>{' '}
                <Accordion.Item eventKey='1'>
                  <Accordion.Header>Gestión de productos</Accordion.Header>
                  <Accordion.Body className='btn_admin_management'>
                    <button className='btn_admin' onClick={() => setShow(3)}>
                      <b className='material-symbols-outlined'>add</b> Agregar producto
                    </button>
                    <button className='btn_admin' onClick={() => setShow(4)}>
                      <b className='material-symbols-outlined'>remove</b> Eliminar producto
                    </button>
                    <button className='btn_admin' onClick={() => setShow(5)}>
                      <b className='material-symbols-outlined'>update</b> Actualizar producto
                    </button>
                    <button className='btn_admin' onClick={() => setShow(6)}>
                      <b className='material-symbols-outlined'>update</b> Actualizar stock
                    </button>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey='2'>
                  <Accordion.Header>Gestión de roles</Accordion.Header>
                  <Accordion.Body className='btn_admin_management'>
                    <button className='btn_admin' onClick={() => setShow(7)}>
                      <b className='material-symbols-outlined'>add</b> Agregar rol
                    </button>
                    <button className='btn_admin' onClick={() => setShow(8)}>
                      <b className='material-symbols-outlined'>remove</b> Eliminar rol
                    </button>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey='3'>
                  <Accordion.Header>Gestión de categorías</Accordion.Header>
                  <Accordion.Body className='btn_admin_management'>
                    <button className='btn_admin' onClick={() => setShow(9)}>
                      <b className='material-symbols-outlined'>add</b> Agregar categoría
                    </button>
                    <button className='btn_admin' onClick={() => setShow(10)}>
                      <b className='material-symbols-outlined'>remove</b> Eliminar categoría
                    </button>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </section>
            <a style={{ marginTop: '1.5rem' }} href='#' onClick={logout}>
              Log out
            </a>
          </article>
        )
      ) : (
        <div className='form-container'>
          {loginSignup ? (
            <form onSubmit={handleSubmit(submit)}>
              <h2>¡Bienvenido! Ingresa tu correo y contraseña para continuar</h2>
              <article className='test-data'>
                <b>Datos de prueba</b>
                <p>john@gmail.com</p>
                <p>john1234</p>
              </article>
              <input type='email' placeholder='Correo electrónico' {...register('email')} />
              <div className='input-password'>
                <input type={typeInput} placeholder='Password' {...register('password')} />
                <span onClick={() => isVisible()} className='material-symbols-outlined is-visible'>
                  {visibility}
                </span>
              </div>
              <button>Iniciar sesión</button>
              <p>
                ¿No tienes cuenta? <span onClick={() => changeSection()}>Regístrate</span>
              </p>
            </form>
          ) : (
            <form onSubmit={handleSubmit(userRegister)}>
              <h2>Crear cuenta</h2>
              <input type='email' placeholder='Correo electrónico' {...register('email')} />
              <input type='text' placeholder='Nombre' {...register('firstName')} />
              <input type='text' placeholder='Apellido' {...register('lastName')} />
              <div className='input-password'>
                <input type={typeInput} placeholder='Contraseña' {...register('password')} />
                <span onClick={() => isVisible()} className='material-symbols-outlined is-visible'>
                  {visibility}
                </span>
              </div>
              <input type='text' placeholder='Teléfono' {...register('phoneNumber')} />
              <input type='text' placeholder='Cédula' {...register('identification')} />
              <button>Crear cuenta</button>
              <p>
                ¿Ya tienes cuenta? <span onClick={() => changeSection()}>Inicia sesión</span>
              </p>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default Login;
