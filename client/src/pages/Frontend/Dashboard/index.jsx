import React from 'react'
import DashboardDonor from './DashboardDonor'
import DashboardNGO from './DashboardNGO'
import Campaigns from './Campaigns'
import { Route, Routes } from 'react-router-dom'

const Dashboard = () => {
  return (
    <Routes>
      <Route path='/' element={<DashboardDonor/>}/>
      <Route path='ngo' element={<DashboardNGO/>}/>
      <Route path='compaigns' element={<Campaigns/>}/>
    </Routes>
  )
}

export default Dashboard;