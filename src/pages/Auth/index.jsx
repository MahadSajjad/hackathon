import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NoPage from '../Misc/NoPage'
import Register from './Register'
import Login from './Login'

const index = () => {
  return (
    <Routes>
        <Route path='login' element={<Login/>}/>
        <Route path='register' element={<Register/>}/>
        <Route path='forgot-password' element={<></>}/>
        <Route path='reset-password' element={<></>}/>
        <Route path='*' element={<NoPage/>}/>
    </Routes>
  )
}

export default index
