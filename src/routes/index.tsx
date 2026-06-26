/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { lazy } from 'react'
import ProtectedRoute from '@/routes/ProtectedRoute'
import AdminGuard from '@/routes/AdminGuard'
import AppLayout from '@/routes/AppLayout'

const LoginPage = lazy(() => import('@/pages/login'))
const PlanPage = lazy(() => import('@/pages/plan'))
const DishPage = lazy(() => import('@/pages/dish'))
const CookPage = lazy(() => import('@/pages/cook'))
const DishesPage = lazy(() => import('@/pages/dishes'))
const CatalogPage = lazy(() => import('@/pages/catalog'))
const ShoppingPage = lazy(() => import('@/pages/shopping'))
const SettingsPage = lazy(() => import('@/pages/settings'))
const AdminIngredientsPage = lazy(() => import('@/pages/admin/ingredients'))

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: '/plan',
            element: <PlanPage />,
          },
          {
            path: '/dish/:id',
            element: <DishPage />,
          },
          {
            path: '/cook/:planEntryId',
            element: <CookPage />,
          },
          {
            path: '/dishes',
            element: <DishesPage />,
          },
          {
            path: '/catalog',
            element: <CatalogPage />,
          },
          {
            path: '/shopping',
            element: <ShoppingPage />,
          },
          {
            path: '/settings',
            element: <SettingsPage />,
          },
          {
            element: <AdminGuard />,
            children: [
              {
                path: '/admin/ingredients',
                element: <AdminIngredientsPage />,
              },
            ],
          },
        ],
      },
      {
        path: '/',
        element: <Navigate to="/plan" replace />,
      },
      {
        path: '*',
        element: <Navigate to="/plan" replace />,
      },
    ],
  },
])
