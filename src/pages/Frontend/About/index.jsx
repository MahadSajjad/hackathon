import React from 'react'
import Team from './Team'
import Company from './Company'
import { Route, Routes } from 'react-router-dom'
const About = () => {
  return (
    <>
      <Routes>
        <Route path='/company' element={<Company />} />
        <Route path='/team' element={<Team />} />
      </Routes>
    </>
  )
}

export default About
