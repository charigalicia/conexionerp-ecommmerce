import React from 'react'

const NewsLetterBox = () => {

    const onSubmitHandler = (event) => {
        event.preventDefault();

    }
  return (
    <div className= 'text-center'>
        <p className='text-2xl font-medium text-gray-800'>Suscríbete ahora y obtén un 20% de descuento</p>
        <p className='text-gray-400 mt-3'>
        Únete a nuestro club de vinos exclusivo y descubre un mundo de beneficios diseñados para verdaderos amantes del vino:
        </p>
        <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
            <input className='w-full sm:flex-1 outline-none' type="email" placeholder='Ingresa tu correo aquí'/>
            <button type='submit' className='bg-red-700 text-white text-xs px-10 py-4'>SUSCRÍBETE</button>
        </form>

    </div>
  )
}

export default NewsLetterBox