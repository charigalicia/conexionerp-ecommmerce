import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import {assets} from '/src/assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Vinos = () => {

  const {products, search, showSearch}=useContext(ShopContext);
  const [showFilter, setShowFilter]=useState(false);
  const [filterProducts, setFilterProducts]=useState([]);
  const [category, setCategory]=useState([]);
  const [subCategory, setSubCategory]=useState([]);
  const [sortType, setSortType]=useState('relevant')
  
  const toggleCategory=(e)=>{
    if (category.includes(e.target.value)){
      setCategory(prev=>prev.filter(item=> item!== e.target.value))

    }
    else{
      setCategory(prev=> [...prev,e.target.value])
    }
  }

  const toggleSubCategory=(e)=>{
    if (subCategory.includes(e.target.value)){
      setSubCategory(prev=>prev.filter(item=> item!== e.target.value))

    }
    else{
      setSubCategory(prev=> [...prev,e.target.value])
    }

  }

  const applyFilter=()=>{
    let productsCopy= products.slice();

    if (showSearch && search){
      productsCopy=productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))

    }

    if (category.length>0){
      productsCopy=productsCopy.filter(item=>category.includes(item.category))
    }

    if  (subCategory.length>0){
      productsCopy=productsCopy.filter(item=>subCategory.includes(item.subCategory))
    }

    setFilterProducts(productsCopy)
  }

  const sortProduct =()=>{
    let fpCopy=filterProducts.slice();

    switch (sortType){
      case 'low-high':
        setFilterProducts(fpCopy.sort((a,b)=>(a.price -b.price)));
        break;
      case 'high-low':
        setFilterProducts(fpCopy.sort((a,b)=>(b.price -a.price)));
        break;

        default:
          applyFilter();
          break;
    }

  }


  useEffect(()=>{
    applyFilter();
  },[category, subCategory, search, showSearch, products])


  useEffect(()=>{
    sortProduct();
  },[sortType])

  

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

      {/* Opciones Filtro */}
      <div className='min-w-60'>
        <p onClick={()=> setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTROS
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>
        {/* Opciones Categoría */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '':'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>PAÍS</p>
          <div className='flex flex-col gap-2 text-sm font-ligth text-gray-700'>
            <p className='flex-gap-2'>
              <input className='w-3' type="checkbox" value={'Francia'} onChange={toggleCategory}/> Francia
            </p>
            <p className='flex-gap-2'>
              <input className='w-3' type="checkbox" value={'Chile'} onChange={toggleCategory}/> Chile
            </p>
            <p className='flex-gap-2'>
              <input className='w-3' type="checkbox" value={'Italia'} onChange={toggleCategory}/> Italia
            </p>
          </div>

        </div>

        {/* Subcategoria Filtro*/}

        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '':'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TIPO</p>
          <div className='flex flex-col gap-2 text-sm font-ligth text-gray-700'>
            <p className='flex-gap-2'>
              <input className='w-3' type="checkbox" value={'Rojo'} onChange={toggleSubCategory} /> Rojo
            </p>
            <p className='flex-gap-2'>
              <input className='w-3' type="checkbox" value={'Blanco'} onChange={toggleSubCategory}/> Blanco
            </p>
            <p className='flex-gap-2'>
              <input className='w-3' type="checkbox" value={'Rose'} onChange={toggleSubCategory}/> Rosé
            </p>
          </div>

        </div>

      </div>

      {/* Lado Derecho */}
      <div className='flex-1'>
        <div className ='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'TODO'} text2={'  LOS VINOS'}/>
          {/* Ordena Productos */}
          <select onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px2'>
            <option value="relevant">Ordena por: Relevante</option>
            <option value="low-high">Ordena por: Bajo a Alto</option>
            <option value="high-low">Ordena por: Alto a Bajo</option>
          </select>
        </div>

        {/* Map Productos */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterProducts.map((item, index)=>(
              <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
            ))
          }

        </div>

      </div>

    </div>
  )
}

export default Vinos