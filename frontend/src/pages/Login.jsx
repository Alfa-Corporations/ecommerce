import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoader, setHandleShow, setTitleModal, setLogged, setCart } from '../store/slices';
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
      .post('https://api-ecommerce.alfauzcat.com/api/v1/login', userData)
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
      .post('https://api-ecommerce.alfauzcat.com/api/v1/user', newUser)
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
              Hi! {firstName} {lastName} welcome
            </h4>
            <a href='#' onClick={logout}>
              Log out
            </a>
          </div>
        ) : (
          <article className='login-successful'>
            <section>
              <h4>
                Hi! {firstName} {lastName} welcome
              </h4>
              <p>Here you can manage the products and users</p>
            </section>
            <section className='admin-section__buttons'>
              <Accordion>
                <Accordion.Item eventKey='0'>
                  <Accordion.Header>User Management</Accordion.Header>
                  <Accordion.Body className='btn_admin_management'>
                    <button className='btn_admin' onClick={() => setShow(1)}>
                      <b className='material-symbols-outlined'>add</b> Users
                    </button>
                    <button className='btn_admin' onClick={() => setShow(2)}>
                      <b className='material-symbols-outlined'>remove</b> Users
                    </button>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey='1'>
                  <Accordion.Header>Product Management</Accordion.Header>
                  <Accordion.Body className='btn_admin_management'>
                    <button className='btn_admin' onClick={() => setShow(3)}>
                      <b className='material-symbols-outlined'>add</b> Products
                    </button>
                    <button className='btn_admin' onClick={() => setShow(4)}>
                      <b className='material-symbols-outlined'>remove</b> Products
                    </button>
                    <button className='btn_admin' onClick={() => setShow(5)}>
                      <b className='material-symbols-outlined'>update</b> Products
                    </button>
                    <button className='btn_admin' onClick={() => setShow(6)}>
                      <b className='material-symbols-outlined'>update</b> Stock
                    </button>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey='2'>
                  <Accordion.Header>Roles Management</Accordion.Header>
                  <Accordion.Body className='btn_admin_management'>
                    <button className='btn_admin' onClick={() => setShow(7)}>
                      <b className='material-symbols-outlined'>add</b> Role
                    </button>
                    <button className='btn_admin' onClick={() => setShow(8)}>
                      <b className='material-symbols-outlined'>remove</b> Role
                    </button>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey='3'>
                  <Accordion.Header>Category Management</Accordion.Header>
                  <Accordion.Body className='btn_admin_management'>
                    <button className='btn_admin' onClick={() => setShow(9)}>
                      <b className='material-symbols-outlined'>add</b> Category
                    </button>
                    <button className='btn_admin' onClick={() => setShow(10)}>
                      <b className='material-symbols-outlined'>remove</b> Category
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
              <h2>Welcome! enter you email and password to continue</h2>
              <article className='test-data'>
                <b>Test data</b>
                <p>john@gmail.com</p>
                <p>john1234</p>
              </article>
              <input type='email' placeholder='Email' {...register('email')} />
              <div className='input-password'>
                <input type={typeInput} placeholder='Password' {...register('password')} />
                <span onClick={() => isVisible()} className='material-symbols-outlined is-visible'>
                  {visibility}
                </span>
              </div>
              <button>Login</button>
              <p>
                Don't have an account? <span onClick={() => changeSection()}>Sign up</span>
              </p>
            </form>
          ) : (
            <form onSubmit={handleSubmit(userRegister)}>
              <h2>Sign up</h2>
              <input type='email' placeholder='Email' {...register('email')} />
              <input type='text' placeholder='Fisrt Name' {...register('firstName')} />
              <input type='text' placeholder='Last Name' {...register('lastName')} />
              <div className='input-password'>
                <input type={typeInput} placeholder='Password' {...register('password')} />
                <span onClick={() => isVisible()} className='material-symbols-outlined is-visible'>
                  {visibility}
                </span>
              </div>
              <input type='text' placeholder='Phone Number' {...register('phoneNumber')} />
              <button>Sign up</button>
              <p>
                Already have an account? <span onClick={() => changeSection()}>Login</span>
              </p>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default Login;
