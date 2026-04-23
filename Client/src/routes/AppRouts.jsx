import React from 'react'
import { Routes } from 'react-router-dom'
import { publicRoutes } from './publicRoutes'

const AppRouts = () => {
  return (
    <Routes>
        {publicRoutes}
    </Routes>
  )
}

export default AppRouts