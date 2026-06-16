import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import MyNavbar from './components/MyNavbar'
import LoadingScreen from './components/LoadingScreen'
import Home from './pages/Home'
import Login from './pages/Login'
import Product from './pages/Product'
import ProtectedRoutes from './components/ProtectedRoutes'
import Purchases from './pages/Purchases'
import { getCategoryThunk } from './store/slices/category.slice'
import { getProductsThunk } from './store/slices/products.slice';
import Footer from './components/Footer'
import ModalAlert from './components/ModalAlert'
import { getRolesThunk } from './store/slices/roles.slice'
import { setLogged } from './store/slices/logged.slice'
import { getUsersThunk } from './store/slices/users.slice'
import LoaderMain from './components/LoaderMain'

function App() {
  const loader = useSelector(state => state.loader)
  const dispatch = useDispatch()
  const token = window.localStorage.getItem('token') ? true : false
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    dispatch(getProductsThunk())
    dispatch(getCategoryThunk())
    dispatch(getRolesThunk())
    dispatch(getUsersThunk())
    dispatch(setLogged(token))
    handleLoading()
  }, [token])

  const handleLoading = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }

  return (
    <HashRouter>
      {
        loading && <LoaderMain />
      }
      <ModalAlert />
      {
        loader && <LoadingScreen />
      }
      <MyNavbar token={token} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/product/:id' element={<Product />} />
        <Route element={<ProtectedRoutes />}>
          <Route path='/purchases' element={<Purchases />} />
        </Route>
      </Routes>
      <Footer />
    </HashRouter>
  )
}

export default App
