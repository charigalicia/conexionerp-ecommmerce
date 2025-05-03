import React from 'react'
import {assets} from '/src/assets/assets'

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-400 bg-red-700'>
        {/* Hero Left Side*/}
        <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
            <div className= 'tect-[#414141]'>
                <div className='flex items-center gap-2'>
                    <p className='w-8 md:w-11 h-[2px] bg-[#ffffff]'></p>
                    <p className='font-medium text-sm md:text-base bg-[#ffffff]'>LOS MÁS VENDIDOS</p>
    
                </div>
                <h1 className='prata-regular text-3x1 sm:pu-3 lg:text-5xl leading-relaxed bg-[#ffffff]'>LO NUEVO</h1>
                <div className='flex items-center gap-2'>
                    <p className='font-semibold text-sm md:text-base bg-[#d89f9f]'>COMPRA AHORA</p>
                    <p className='w-8  md:w-11 h-[1px] bg-[#ffffff]'></p>
                </div>
            </div>
        </div>
        {/* Hero Right Side */}
        <img className='w-full sm:w-1/2' src={assets.hero_img} alt="" />
    </div>
  )
}

export default Hero