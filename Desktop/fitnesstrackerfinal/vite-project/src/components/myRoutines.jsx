import { useOutletContext } from 'react-router-dom'
import Register from './register'
import { useState, useEffect } from 'react'
import RoutineCard from './RoutineCard'
import { BASE_URL } from '../utils'

export default function MyRoutines() {
  const [myRoutines, setMyRoutines] = useState([])
  const [activities, setActivities] = useState([])
  const [user, setUser] = useState()

  const token = window.localStorage.getItem('token')

  useEffect(() => {
    async function getUser() {
      const response = await fetch(`${BASE_URL}/users/me`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      const result = await response.json()
      if (result?.username) {
        setUser(result)
      }
    }

    getUser()
  }, [])

  useEffect(() => {
    const getMyRoutines = async () => {
      const response = await fetch(
        `${BASE_URL}/users/${user.username}/routines`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )
      const result = await response.json()
      setMyRoutines(result)
    }
    if (user) {
      getMyRoutines()
    }
  }, [user])

  useEffect(() => {
    const getActivities = async () => {
      try {
        const response = await fetch(`${BASE_URL}/activities`, {
          headers: {
            'Content-Type': 'application/json',
          },
        })

        const result = await response.json()

        setActivities(result)
        return result
      } catch (err) {
        console.error(err)
      }
    }
    getActivities()
  })

  return (
    <div>
      {myRoutines.map((routine) => {
        return (
          <RoutineCard
            key={routine.name}
            routine={routine}
            user={user}
            activities={activities}
          />
        )
      })}
    </div>
  )
}
