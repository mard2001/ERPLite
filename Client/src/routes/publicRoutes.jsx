import React from 'react'
import { Route } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'

export const PublicRoutes = [
    {
        key: "loginPage",
        path: "/login",
        element: <LoginPage />
    }
]
