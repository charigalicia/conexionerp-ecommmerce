import React from 'react'
import Title from '../components/Title'
import {assets} from '/src/assets/assets'
import NewsletterBox from '../components/NewsLetterBox'

const Nosotros = () => {
  return (
    <div>
    <div className='text-2xl text-center pt-8 border-t'>
      <Title text1={'ACERCA DE '} text2={'NOSOTROS'}/>
    </div>
    
    <div className='my-10 flex flex-col md:flex-row gap-16'>
      <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
      <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
         <p>En DuVin nacimos de una pasión compartida por la cultura vinícola y el deseo de acercar los mejores vinos a los hogares mexicanos. </p>
         <p>Fundada en 2025 por un grupo apasionado del vino, nuestra tienda comenzó como un pequeño proyecto en Puebla y hoy se ha convertido en un referente nacional en la distribución de vinos de calidad.</p>
         <b className='text-gray-800'>Nuestra Misión</b>
         <p>Nuestra misión en DuVin es democratizar la cultura del vino, ofreciendo una cuidadosa selección de los mejores vinos nacionales e internacionales a precios justos, mientras educamos y compartimos nuestra pasión por la enología. En DuVin no solo vendemos vino; cultivamos experiencias y construimos una comunidad unida por la apreciación de los placeres que una buena copa de vino puede brindar.</p>
      </div>

    </div>

    <div className='text-4xl py-4'>
      <Title text1={'¿POR QUÉ '} text2={'ELEGIRNOS?'}/>
    </div>

    <div className='flex flex-col md:flex-row text-sm mb-20'>
      <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
        <b>Calidad Asegurada:</b>
        <p className='text-gray-600'>Nos comprometemos con la excelencia en cada botella. Mantenemos condiciones óptimas de almacenamiento con temperatura y humedad controladas para preservar las características organolépticas de cada variedad. Además, trabajamos exclusivamente con bodegas que comparten nuestra pasión por la calidad y la autenticidad, estableciendo relaciones directas con productores que mantienen los más altos estándares en sus procesos de elaboración.</p>
      </div>
      <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
        <b>Atención al cliente excepcional:</b>
        <p className='text-gray-600'>Tu satisfacción es nuestra prioridad. Contamos con un equipo de especialistas certificados disponibles para asesorarte en tus selecciones, responder tus consultas sobre regiones vinícolas o recomendar el maridaje perfecto para cada ocasión. Ofrecemos garantía de satisfacción en cada compra, con política de devolución sin complicaciones si algún vino no cumple tus expectativas.</p>
      </div>
      <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
        <b>Conveniencia:</b>
        <p className='text-gray-600'>Diseñamos nuestra plataforma pensando en tu comodidad. Navega por nuestro catálogo intuitivo, filtrando por región, variedad de uva, maridaje o precio para encontrar exactamente lo que buscas en pocos clics. Ofrecemos envíos rápidos y seguros a todo México con embalajes especializados que protegen tus vinos durante el transporte.</p>
      </div>

    </div>

    <NewsletterBox/>

    </div>
  )
}

export default Nosotros