import React from 'react'
import {assets} from '/src/assets/assets'

const Footer = () => {
  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            <div>
                <img src={assets.logo} className='mb-5 w-32' alt="" />
                <p className='w-full md:w-2/3 text-gray-600'>
                Empresa mexicana socialmente responsable
                </p>
                
            </div>

            <div>
                <p className='text-xl font-medium'>COMPAÑÍA</p>
                <ul className='flex flex-col gap-1 text-red-700'>
                    <li>Inicio</li>
                    <li>Nosotros</li>
                    <li>Entregas</li>
                    <li>Política de Privacidad</li>
                </ul>
            </div>

            <div>
                <p className='text-xl font-medium mb-5'>CONTÁCTANOS</p>
                <ul className='flex flex-col gap-1 text-red-700'>
                    <li>+52 1234567890</li>
                    <li>du_vinmx@gmail.com</li>
                </ul>
            </div>

        </div>

            <div>
                <hr />
                <p className='py-5 text-sm text-center'> Copyright 2025@ Equipo10 - Todos los derechos reservados</p>
            </div>

        
    </div>
  )
}

export default Footer