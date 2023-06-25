import { Outlet } from 'react-router-dom'

import { useState } from 'react'
import { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import Navbar from './FeatComponents/Navbar'

// export const { token } = useOutletContext()

export default function Root() {
  useEffect(() => {}, [])
  return (
    <div>
      <Navbar />
      <Outlet></Outlet>
    </div>
  )
}
