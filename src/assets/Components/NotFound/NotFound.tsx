import React from 'react'
import notFound from '../../images/notFound.jpg'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='w-full px-2 max-[600px]:justify-start max-[600px]:mt-6 h-[100vh] flex gap-3 flex-col items-center justify-center'>
      <img src={notFound} alt="" />
      <button className='border-purple-600 p-2  rounded-md hover:bg-purple-300 hover:text-purple-500 duration-200 border'>
        <Link to={`/`}>Go to Home</Link>
      </button>
    </div>
  )
}

export default NotFound
