import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
    const token = window.localStorage.getItem('token')
    const { isVerify } = window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')) : {}
    console.log(token, isVerify)

	if(token && isVerify) return <Outlet />;

    return <Navigate to='/login' />;
}

export default ProtectedRoutes;