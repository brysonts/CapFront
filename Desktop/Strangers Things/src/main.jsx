// import React from 'react'
// import { ReactDOM } from 'react-dom/client'
// import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import './index.css'
// import Root from './routes/root'
// import Welcome from './components/welcome'

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Root />,
//   },
// ])

// const root = ReactDOM.createRoot(document.getElementById('root'))root.render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>,
// )

import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Root from './routes/root'
import Register from './components/register'
import Posts from './components/posts'
import Profile from './components/profile'
import Post from './components/post'
import Welcome from './components/welcome'
import EditPost from './components/Edit'
import Messages from './components/messages'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Welcome />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/posts',
        element: <Posts />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/messages',
        element: <Messages />,
      },
      {
        path: '/posts/:postId',
        element: <Post />,
        children: [
          {
            // path: '/edit',
            path: '/posts/:postId/edit',
            element: <EditPost></EditPost>,
          },
        ],
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
