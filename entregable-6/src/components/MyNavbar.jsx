import { useEffect, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setHandleShow, setTitleModal } from '../store/slices';
import { getSetCart, setCart } from '../store/slices/cartList.slice';
import { setLogged } from '../store/slices/logged.slice';
import Cart from './Cart';

const MyNavbar = () => {
    const [show, setShow] = useState(false)
    const dispatch = useDispatch()
    const logged = useSelector(state => state.logged)

    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    const logout = () => {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('user');
        dispatch(setLogged(false));
        dispatch(setTitleModal('Successful logout'));
        dispatch(setHandleShow(true));
        dispatch(setCart([]));
            setTimeout(() => {
                dispatch(setHandleShow(false))
            }, 2000);
        window.location.reload()
    }

    useEffect(() => {
        dispatch(getSetCart())
    }, [])

    return (
        <header className='nav-bar'>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand to='/' as={Link}>Ecommerce</Navbar.Brand>
                    <Nav>
                        <Nav.Link to='/login' as={Link}><span className={`material-symbols-outlined ${logged && 'login-user'}`}>person</span></Nav.Link>
                        <Nav.Link to='/purchases' as={Link}><span className="material-symbols-outlined">inventory_2</span></Nav.Link>
                        <Nav.Link onClick={handleShow} ><span className="material-symbols-outlined">shopping_cart</span></Nav.Link>
                        {
                            logged && <Nav.Link onClick={logout}><span className="material-symbols-outlined">logout</span></Nav.Link>
                        }
                    </Nav>
                </Container>
            </Navbar>
            <Cart show={show} handleClose={handleClose} />
        </header>
    );
};

export default MyNavbar;