import React from 'react'
import Aside from './Aside'
import Blogs from '../../../Components/Blogs/Blogs'
import InfoAside from './InfoAside'

const FirstSect = () => {
  return (
    <section className='flex justify-between w-[90%] m-auto pt-3'>
      <Aside/>
      <Blogs/>
      <InfoAside/>
    </section>
  )
}

export default FirstSect
