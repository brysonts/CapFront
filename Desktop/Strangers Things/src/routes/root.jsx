import { Outlet } from 'react-router-dom'
import Navbar from '../components/navbar'
export const COHORT_NAME = '2301-ftb-mt-web-pt'
export const BASE_URL = 'https://strangers-things.herokuapp.com/api/'
import { useState } from 'react'
import { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'

// export const { token } = useOutletContext()

export default function Root() {
  const [posts, setPosts] = useState([])
  const [user, setUser] = useState({})
  const [token, setToken] = useState('')

  async function getPosts() {
    const res = await fetch(`${BASE_URL}${COHORT_NAME}/posts`)

    const info = await res.json()
    console.log(info)
    setPosts(info.data.posts)
  }
  useEffect(() => {
    // if theres a token in local storage, go ahead and request user information from server
    async function fetchUser() {
      const localToken = localStorage.getItem('token')
      if (localToken) {
        setToken(localToken)
        try {
          const response = await fetch(`${BASE_URL}${COHORT_NAME}/users/me`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localToken}`,
            },
          })
          const result = await response.json()
          if (result.success) {
            setUser(result.data)
          }
        } catch (error) {
          console.error(error)
        }
      }
    }

    fetchUser()
  }, [token])

  useEffect(() => {
    getPosts()
  }, [])
  return (
    <div>
      <Navbar
        context={{ posts }}
        user={user}
        setUser={setUser}
        setToken={setToken}
      />
      <Outlet context={{ posts, token, setPosts, setToken, getPosts, user }} />
    </div>
  )
}
