import React from 'react'
import Title from '../components/Title'
import {assets} from '/src/assets/assets'
import NewsletterBox from '../components/NewsLetterBox'

const Nosotros = () => {
  return (
    <div>
    <div className='text-2xl text-center pt-8 border-t'>
      <Title text1={'ACERCA DE '} text2={'NOSOTROS'}/>
    </div>
    
    <div className='my-10 flex flex-col md:flex-row gap-16'>
      <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
      <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
         <p>Ingresar texto aquí !!!!</p>
         <p>Ingresar texto aquí!!!! </p>
         <b className='text-gray-800'>Nuestra Misión</b>
         <p>Nuestra misión es tal tal tal</p>
      </div>

    </div>

    <div className='text-4xl py-4'>
      <Title text1={'¿POR QUÉ '} text2={'ELEGIRNOS?'}/>
    </div>

    <div className='flex flex-col md:flex-row text-sm mb-20'>
      <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
        <b>Calidad Asegurada:</b>
        <p className='text-gray-600'>Ingresar texto aquí!!!!</p>
      </div>
      <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
        <b>Conveniencia:</b>
        <p className='text-gray-600'>Ingresar texto aquí!!!!</p>
      </div>
      <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
        <b>Atención al cliente excepcional:</b>
        <p className='text-gray-600'>Ingresar texto aquí!!!!</p>
      </div>

    </div>

    <NewsletterBox/>

    </div>
  )
}

export default Nosotros