import React from 'react'
import Hero from '../components/Hero'
import LatestWines from '../components/LatestWines'
import BestSeller from '../components/BestSeller'
import OurPolicies from '../components/OurPolicies'
import NewsLetterBox from '../components/NewsLetterBox'

const Inicio = () => {
  return (
    <div>
      <Hero />
      <LatestWines/>
      <BestSeller/>
      <OurPolicies/>
      <NewsLetterBox/>
    </div>
  )
}

export default Inicio