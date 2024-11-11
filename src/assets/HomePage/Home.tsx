import React from 'react'
import FirstSect from './HomeSections/FirstSection/FirstSect'
import Header from '../Components/Header/Header'
import SecSect from './HomeSections/SecSection/SecSect'
import Footer from '../Components/Footer/Footer'

const Home = () => {
  return (
    <>
      <Header />
      <FirstSect/>
      <SecSect/>
      <Footer/>
    </>
  )
}

export default Home
