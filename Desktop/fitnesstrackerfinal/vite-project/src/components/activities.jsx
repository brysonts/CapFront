import { BASE_URL } from '../utils'
import ActivityCard from './ActivityCard'
import { useState, useEffect } from 'react'
export default function Activities({ user }) {
  const [publicActivities, setPublicActivities] = useState([])
  const [createActivity, setCreateActivity] = useState('')
  const [error, setError] = useState()
  const [activityName, setActivityName] = useState('')
  const [activityDescription, setActivityDescription] = useState('')

  const token = localStorage.getItem('token')
  const getActivities = async () => {
    try {
      const response = await fetch(`${BASE_URL}/activities`, {
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
  const postActivity = async () => {
    try {
      const response = await fetch(`${BASE_URL}/activities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: activityName,
          description: activityDescription,
        }),
      })

      const result = await response.json()
      alert('Successfully created activity')
      console.log(result)
      return result
    } catch (err) {
      console.error(err)
    }
  }

  const getActivityIdRoutines = async () => {
    try {
      const response = await fetch(`${BASE_URL}/activities/3/routines`, {
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
  useEffect(() => {
    async function run() {
      const result = await getActivities()
      // im setting my public routines to my result
      setPublicActivities(result)
    }
    run()
  }, [])

  return (
    <div>
      {token && (
        <div>
          <input
            onChange={(ev) => setActivityName(ev.target.value)}
            value={activityName}
            placeholder="Activity Name"
          />
          <input
            onChange={(ev) => setActivityDescription(ev.target.value)}
            value={activityDescription}
            placeholder="Activity Description"
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button onClick={postActivity}>Add Activity</button>
        </div>
      )}
      <>
        <h1>Public Activities</h1>
        {publicActivities.map((activity) => {
          return (
            <ActivityCard key={activity.id} activity={activity} user={user} />
          )
        })}
      </>
      {/* )} */}
    </div>
  )
}
