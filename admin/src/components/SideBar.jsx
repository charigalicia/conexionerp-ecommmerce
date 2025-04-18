import React from 'react'
import {NavLink} from 'react-router-dom'
import {assets} from '/src/assets/assets'

const SideBar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2'>
        <div className='fle flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
            <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l ' to="/add">
                 <img className='w-5 h-5' src={assets.add_icon} alt="" />
                 <p className='hidden md:block'>Agregar Productos</p>
            </NavLink>
        </div>
        <div className='fle flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
            <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l ' to="/list">
                 <img className='w-5 h-5' src={assets.order_icon} alt="" />
                 <p className='hidden md:block'>Mostrar Productos</p>
            </NavLink>
        </div>
        <div className='fle flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
            <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l ' to="/orders">
                 <img className='w-5 h-5' src={assets.order_icon} alt="" />
                 <p className='hidden md:block'>Pedidos</p>
            </NavLink>
        </div>
    
    
    </div>
  )
}

export default SideBar