import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import './index.css'
import Root from './routes/root'
import Activities from './components/activities'
import User from './components/User'
import Routines from './components/routines'
import Home from './components/home'
import Register from './components/register'
import MyRoutines from './components/myRoutines'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/user',
        element: <User />,
      },
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/routines',
        element: <Routines />,
      },
      {
        path: '/myroutines',
        element: <MyRoutines />,
      },
      {
        path: '/activities',
        element: <Activities />,
      },
      {
        path: '/register',
        element: <Register />,
      },
    ],
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
