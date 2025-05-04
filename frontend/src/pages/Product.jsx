import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext'
import {assets} from '/src/assets/assets'
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  
  const {productId} = useParams();
  const {products,currency,addToCart}=useContext(ShopContext);
  const [productData, setProductData]=useState(false);
  const [image,setImage]=useState('')
  const [size,setSize]=useState('')

  const fetchProductData = async ()=>{

    products.map((item)=>{
      if(item._id===productId){
        setProductData(item)
        setImage(item.image[0])
        return null;
      }
    })

  }

  useEffect(()=>{
    fetchProductData();
  },[productId, products])
  

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* -------------Datos Producto */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        {/* ----------------Imagenes producto */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          
            <img className='w-full h-auto' src={productData.image[0]} alt="" />

        </div>
        {/* ----------- Info producto */}
        <div className='flex-1' >
          <h1 className='font-medium text-2xl mt-2' >{productData.name}</h1>

          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            <p className='pl-2'>(122)</p>

          </div>
          <p  className='mt-5 text-3xl font-medium' > {currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Elige tamaño</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item,index)=>(
                <button onClick={()=>setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item===size ? 'border-orange-500':''} `} key={index}>{item}</button>
              ))}
            </div>
          </div>
          <button onClick={()=>addToCart(productData._id,size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>Agregar al carrito</button>
          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Importación de calidad</p>
            <p>Pago en efectivo se encuentra disponible en este producto</p>
            <p>Política de cambio hasta 7 días</p>


          </div>
        </div>
      </div>

      {/* Sección de Descripción y reviews */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Descripción</b>
          <p className='border px-5 py-3 text-sm'>Reseñas (122)</p>
        </div>
        <div className='flex flex-col gap-4border px-6 py-6 text-sm teext-gray.500'>
          <p>Vino de calidad</p>
          <p>Vinos Internacionales</p>

          {/* ---------mostrar productos relacionados */}
          <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>

        </div>
      </div>
      

    </div>
  ): <div className='opacity-0'></div>
}

export default Product