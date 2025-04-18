import React, { useState } from 'react'
import {assets} from '/src/assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import {toast} from 'react-toastify'


const Add = ({token}) => {

  const [image1,setImage1]=useState(false)

  const [name, setName]=useState("");
  const [description,setDescription]=useState("");
  const [price,setPrice]=useState("");
  const [category,setCategory]=useState("Francia");
  const [subCategory,setSubCategory]=useState("Rojo");
  const [bestseller,setBestseller]=useState(false);
  const [sizes, setSizes]=useState([]);

  const onSubmitHandler=async(e)=>{
    e.preventDefault ();
    try {
      const formData=new FormData()

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller)
      formData.append("sizes",JSON.stringify(sizes))


      formData.append("image1",image1)

      const response =await axios.post(backendUrl+"/api/product/add",formData,{headers:{token}})

      if (response.data.success) {
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setImage1(false)
        setPrice('')
      }else{
        toast.error(response.data.message)

      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      
      
    }

  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <div>
        <p className='mb-2'>Subir Image</p>

        <div className='flex gap-2'>
          <label htmlFor="image1">
            <img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
            <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id="image1" hidden />
          </label>
        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Nombre Proucto</p>
        <input onChange={(e)=>setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2'  type="text" placeholder='Escribe aquí' required />
      </div>


      <div className='w-full'>
        <p className='mb-2'>Descripción producto</p>
        <textarea onChange={(e)=>setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2'  type="text" placeholder='Escribe contenido aquí' required />
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>

        <div>
          <p className='mb-2'>Categoría Producto</p>
          <select onChange={(e)=>setCategory(e.target.value)} value={category} className='w-full px-3 py-2'>
            <option value="Francia">Francia</option>
            <option value="Chile">Chile</option>
            <option value="Italia">Italia</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Subcategoría Producto</p>
          <select onChange={(e)=>setSubCategory(e.target.value)} value={subCategory} className='w-full px-3 py-2'>
            <option value="Rojo">Rojo</option>
            <option value="Blanco">Blanco</option>
            <option value="Rose">Rosé</option>
          </select>
        </div>


        <div>
          <p className='mb-2'>Precio producto</p>
          <input onChange={(e)=>setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="Number" placeholder='25'/>
        </div>

      
      </div>

      <div>
        <p className='mb-2 '>Tamaño producto</p>
        <div className='flex gap-3'>
          <div onClick={()=> setSizes (prev => prev.includes("750ml") ? prev.filter(item=>item !== "750ml"):[...prev,"750ml"])}>
            <p className={`${sizes.includes ("750ml") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>750ml</p>
          </div>
        </div>
      </div>

      <div className='flex gap-2 mt2'>
        <input onChange={()=>setBestseller (prev=>!prev)} checked={bestseller} type="checkbox" id='bestseller' />
        <label className=' cursor-pointer' htmlFor="bestseller">Agregar a bestseller</label>
      </div>

      <button type="submit" className='w-28 py-3 mt-4 bg-black text-white'> Agregar</button>



    </form>
  )
}

export default Add