import React from 'react'
import FirstSect from './HomeSections/FirstSection/FirstSect'
import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'
import UsersSect from './HomeSections/SecSection/UsersSect'

const Home = () => {
  return (
    <>
      <Header />
      <FirstSect/>
      <UsersSect/>
      <Footer/>
    </>
  )
}

export default Home
