import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './pages/Header'
import Login from './pages/Login'
import Footer from './pages/Footer'
import Menu from './pages/Menu'
import Collaborators from './pages/Collaborators'
import Profile from './pages/Profile'
import Products from './pages/Products'
import CategoryProduct from './pages/CategoryProduct'
import UpdatePassword from './pages/UpdatePassword'
import './default.css'


function Rotas() {
    const storage = sessionStorage.getItem('token');
    if (storage !== "eyJpdiI6IlZEbHIwNmRZTU5Yd0Vuck5ZVmlYNVE9PSIsInZhbHVlIjoiS0FidmVnYndjejVzR0kvRUpwM3Z6UzMzdmkydnJ3V0Nac0cxSUdiRmdCTT0iLCJtYWMiOiJhOWViMTRmNzg1Y2VkZWNjMzBmMzVmMDU4Mjk1MDE3NWU1NzczOTllMDI5YWNjN2I4YzY1YjM3ODM1NGM2MzFkIiwidGFnIjoiIn0=") {
        return (
            <Login />
        )
    } else {
        return (
            <Router>
                <div className='BaseContainer'>
                        <Menu />
                        <div className='CenterContainer'>
                            <Header />
                            <Routes>
                                <Route exact element={<Collaborators />} path='/colaboradores' />
                                <Route exact element={<Products />} path='/produtos' />
                                <Route exact element={<CategoryProduct />} path='/categoria-produto' />
                                <Route exact element={<Profile />} path='/perfil' />
                                <Route exact element={<UpdatePassword />} path='/alterar-senha' />
                            </Routes>
                            <Footer />
                        </div>
                </div>
            </Router>
        )
    }
}

export default Rotas