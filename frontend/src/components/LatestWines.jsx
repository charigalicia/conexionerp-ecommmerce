import React, {useContext, useState, useEffect} from 'react'
import { ShopContext } from '/src/context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';



const LatestWines = () => {

    const {products}=useContext(ShopContext);
    const [LatestWines,setLatestProducts]=useState([]);

    useEffect(()=>{
        setLatestProducts(products.slice(0,10));

    },[products])
 

  return (
    <div className= 'my-10'>
        <div className='text-center text-3xl py-8'>
            <Title text1={'LO'} text2={' NUEVO'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            Ingresar texto necesario
            </p>

        </div>

        {/* Mostrar productos */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 gap-y-6'>
           {
               LatestWines.map((item,index)=>(
   
                   <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
               ))
           }
        </div>

    </div>
  )
}

export default LatestWines