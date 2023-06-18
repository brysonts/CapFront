import { BASE_URL } from '../utils'
import { Outlet } from 'react-router-dom'

import { useState } from 'react'
import { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import Navbar from '../components/navbar'

// export const { token } = useOutletContext()

export default function Root() {
  const [user, setUser] = useState({})
  const [token, setToken] = useState('')
  useEffect(() => {
    // if theres a token in local storage, go ahead and request user information from server
    async function fetchUser() {
      const localToken = localStorage.getItem('token')
      if (localToken) {
        setToken(localToken)
        try {
          const response = await fetch(`${BASE_URL}/users/me`, {
            headers: {
              Authorization: `Bearer ${localToken}`,
            },
          })
          const result = await response.json()
          console.log(result)
          if (result.id) {
            setUser(result)
            console.log(result)
          }
        } catch (error) {
          console.error(error)
        }
      }
    }
    const getUserMe = async () => {
      const localToken = localStorage.getItem('token')
      if (localToken) {
        setToken(localToken)
        try {
          const response = await fetch(`${BASE_URL}/users/me`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localToken}`,
            },
          })
          const result = await response.json()
          console.log(result)
          return result
        } catch (err) {
          console.error(err)
        }
      }
    }

    fetchUser()
    getUserMe()
  }, [token])
  return (
    <div>
      <Navbar user={user} setUser={setUser} setToken={setToken} />
      <Outlet context={{ token, setToken, user, setUser }} />
    </div>
  )
}
