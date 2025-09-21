import React from 'react'
import Home from './Home'
import About from './About'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Route, Routes } from 'react-router-dom'
import NoPage from '../Misc/NoPage'
import Contact from './Contact'


const Frontend = () => {
  return (
    <>
    <Header/>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='about/*' element={<About />} />
        <Route path='contact' element={<Contact/>}/>
        <Route path='*' element={<NoPage/>}/>
      </Routes>
    <Footer/>
    </>
)
}

export default Frontend