import React from 'react'
import Title from '../components/Title'
import {assets} from '/src/assets/assets'
import NewsletterBox from '../components/NewsLetterBox'

const Contacto = () => {
  return (
    <div>
      <div classaName='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACTÁ'} text2={'NOS'}/>
      </div>

        <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
          <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" />
          <div className='flex flex-col justify-center items-start gap-6'>
            <p className='font-semibold text-xl text-gray-600'>Nuestra Tienda</p>
            <p className='text-gray-500'>Av. Tecnm 123 <br/> Puebla, Pue. México</p>
            <p className='text-gray-500'>Tel: (222) 1234567 <br/> email: du_vinmx@gmail.com</p>
            <p className='font-semibold text-xl text-gray-600'>Careras en DuVin México</p>
            <p className='text-gray-500'>Conoce más acerca de nuestro equipo y oportunidades de trabajo</p>
            <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explora empleos</button>

          </div>
          

        </div>      
        
        <NewsletterBox/>
        
    </div>
  )
}

export default Contacto