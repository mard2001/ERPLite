import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { PublicRoutes } from './PublicRoutes'
import { ProtectedRoutes } from './protectedRoutes'

const AppRoutes = () => {
  return (
    <Routes>
        {PublicRoutes.map((route, indx) => (
          <Route key={route.key} path={route.path} element={route.element} />
        ))}

        {ProtectedRoutes.map((route, indx) => (
          <Route key={route.key} path={route.path} element={route.element} />
        ))}

        <Route path='*' element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default AppRoutes