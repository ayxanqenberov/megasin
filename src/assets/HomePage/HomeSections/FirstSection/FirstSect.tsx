import React, { useState } from 'react'
import Aside from './Asides/Aside'
import Blogs from './Blogs/Blogs'
import InfoAside from './Asides/InfoAside'

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
