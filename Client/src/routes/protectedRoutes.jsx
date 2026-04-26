import React from 'react'
import DashboardPage from '../pages/DashboardPage'
import ProtectedRouteChecker from '../utils/ProtectedRouteChecker'

export const ProtectedRoutes = [
    {
        key:"dashboardPage",
        path: "/dashboard",
        element:<ProtectedRouteChecker>
            <DashboardPage />
        </ProtectedRouteChecker>
    }
]