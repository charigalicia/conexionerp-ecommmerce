import React from 'react'
import {assets} from '/src/assets/assets'

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-400'>
        {/* Hero Left Side*/}
        <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
            <div className= 'tect-[#414141]'>
                <div className='flex items-center gap-2'>
                    <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                    <p className='font-medium text-sm md:text-base'>LOS MÁS VENDIDOS</p>
    
                </div>
                <h1 className='prata-regular text-3x1 sm:pu-3 lg:text-5xl leading-relaxed'>LO NUEVO</h1>
                <div className='flex items-center gap-2'>
                    <p className='font-semibold text-sm md:text-base'>COMPRA AHORA</p>
                    <p className='w-8  md:w-11 h-[1px] bg-[#414141]'></p>
                </div>
            </div>
        </div>
        {/* Hero Right Side */}
        <img className='w-full sm:w-1/2' src={assets.hero_img} alt="" />
    </div>
  )
}

export default Hero