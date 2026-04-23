import React from 'react'
import { Route } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'

export const publicRoutes = [
    <Route key="loginPage" path="/login" element={<LoginPage />} />
]