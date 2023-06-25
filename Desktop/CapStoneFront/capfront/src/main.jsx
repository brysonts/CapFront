import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import './index.css'
import Root from './root'
import Featured from './RouteComponents/featured'
import Home from './RouteComponents/home'
import Womens from './RouteComponents/Womens'
import Mens from './RouteComponents/Mens'
import Kids from './RouteComponents/kids'
import Register from './RouteComponents/Register'
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/featured',
        element: <Featured />,
      },
      {
        path: '/womens',
        element: <Womens />,
      },
      {
        path: '/Mens',
        element: <Mens />,
      },
      {
        path: '/kids',
        element: <Kids />,
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
