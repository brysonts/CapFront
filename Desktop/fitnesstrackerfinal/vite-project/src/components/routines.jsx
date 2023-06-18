import { useState, useEffect } from 'react'
import Root from '../routes/root'
import { BASE_URL } from '../utils'

import RoutineCard from './RoutineCard'

export default function Routines() {
  const [user, setUser] = useState()
  const [error, setError] = useState()
  const [publicRoutines, setPublicRoutines] = useState([])
  const [routineName, setRoutineName] = useState('')
  const [goal, setGoal] = useState('')
  const [activities, setActivites] = useState([])
  // activityId: 7,
  // count: 1,
  // duration: 20,

  const token = localStorage.getItem('token')

  const getPublicRoutines = async () => {
    try {
      const response = await fetch(`${BASE_URL}/routines`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const result = await response.json()
      console.log(result)
      return result
    } catch (err) {
      console.error(err)
    }
  }
  const postRoutine = async () => {
    try {
      setError()
      const response = await fetch(`${BASE_URL}/routines`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: routineName,
          goal: goal,
          isPublic: true,
        }),
      })
      const result = await response.json()
      if (result.error) {
        setError(result.message)
        return
      }
      window.reload()
    } catch (err) {
      console.error(err)
    }
  }

  const postRoutineActivity = async (activityId, count, duration) => {
    try {
      const response = await fetch(`${BASE_URL}/routines/:id/activities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          activityId: { activityId },
          count: { count },
          duration: { duration },
        }),
      })
      const result = await response.json()
      console.log(result)
      return result
    } catch (err) {
      console.error(err)
    }
  }
  const patchRoutineActivity = async (count, duration) => {
    try {
      const response = await fetch(
        `${BASE_URL}/routine_activities/:routineActivity`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            count: { count },
            duration: { duration },
          }),
        },
      )
      const result = await response.json()
      console.log(result)
      return result
      console.log(result)
    } catch (err) {
      console.error(err)
    }
  }
  const deleteRoutineActivity = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/routine_activities/:routineActivity`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )
      const result = await response.json()
      console.log(result)
      return result
      console.log(result)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    async function run() {
      const result = await getPublicRoutines()
      // im setting my public routines to my result
      setPublicRoutines(result)
    }
    run()
  }, [])

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
    const getActivities = async () => {
      try {
        const response = await fetch(`${BASE_URL}/activities`, {
          headers: {
            'Content-Type': 'application/json',
          },
        })

        const result = await response.json()

        setActivites(result)
        return result
      } catch (err) {
        console.error(err)
      }
    }
    getActivities()
  })
  return (
    <div>
      {token && (
        <div>
          <input
            onChange={(ev) => setRoutineName(ev.target.value)}
            value={routineName}
            placeholder="Routine Name"
          />
          <input
            onChange={(ev) => setGoal(ev.target.value)}
            value={goal}
            placeholder="Routine Goal"
          />
          {/* <input
          onChange={(ev) => setDescription(ev.target.value)}
          value={description}
          placeholder="Routine Description"
        /> */}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button onClick={postRoutine}>Add Routine</button>
        </div>
      )}
      <h1>Public Routines</h1>
      {publicRoutines.map((routine) => {
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
