import React from 'react'
import {assets} from '/src/assets/assets'

const OurPolicies = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20  text-xs sm:text-sm md:text-base text-gray-700'>

        <div>
            <img src={assets.exchange_icon}  className='w-12 m-auto mb-5' alt="" />
            <p className='font-semibold'>Política de Cambio</p>
            <p className='text-gray-400'>Ofrecemos política de cambio si aplica</p>
        </div>

        <div>
            <img src={assets.quality_icon}  className='w-12 m-auto mb-5' alt="" />
            <p className='font-semibold'>Política de Devolucion</p>
            <p className='text-gray-400'>Proveemos una política de devolución gratuita de 7 días</p>
        </div>

        <div>
            <img src={assets.support_img}  className='w-12 m-auto mb-5' alt="" />
            <p className='font-semibold'>Excelente Soporte a Cliente</p>
            <p className='text-gray-400'>Proveemos atención al cliente 24/7</p>
        </div>
    </div>
  )
}

export default OurPolicies