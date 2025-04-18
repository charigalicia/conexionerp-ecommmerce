import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Vinos from './pages/Vinos'
import Nosotros from './pages/Nosotros'
import Contacto from './pages/Contacto'
import Product from './pages/Product'
import Carro from './pages/Carro'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Navbar from './components/Navbar'
import Inicio from './pages/Inicio'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify'

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer/>
      <Navbar />
      <SearchBar/>
      <Routes>
        <Route path='/' element={<Inicio/>} />
        <Route path='/vinos' element={<Vinos/>} />
        <Route path='/nosotros' element={<Nosotros/>} />
        <Route path='/contacto' element={<Contacto/>} />
        <Route path='/product/:productId' element={<Product/>} />
        <Route path='/carro' element={<Carro/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/place-order' element={<PlaceOrder/>} />
        <Route path='/orders' element={<Orders/>} />
        <Route path='/verify' element={<Verify/>} />

      </Routes>
      <Footer/>
     
    </div>
  )
}

export default App