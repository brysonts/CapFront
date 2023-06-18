import { BASE_URL } from '../utils'
import { useState } from 'react'
import '../styles/routine-card.css'

function RoutineCard({ routine, user, activities }) {
  const [error, setError] = useState()
  // this is the state for creating an activity for a routine
  const [activityId, setActivityId] = useState()
  const [duration, setDuration] = useState()
  const [count, setCount] = useState()
  const [editDuration, setEditDuration] = useState()
  const [editCount, setEditCount] = useState()
  const [routineName, setRoutineName] = useState(routine.name)
  const [routineGoal, setRoutineGoal] = useState(routine.goal)
  const [showEditForm, setShowEditForm] = useState(false)
  const [showActivityForm, setShowActivityForm] = useState(false)
  const [activityToUpdate, setActivityToUpdate] = useState()

  const token = window.localStorage.getItem('token')
  // check the user state
  // check for a token
  const deleteRoutine = async () => {
    try {
      setError()
      const response = await fetch(`${BASE_URL}/routines/${routine.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      const result = await response.json()
      if (result.error) {
        setError(result.message)
        return
      }
      alert('Successfully deleted routine')
      window.reload()
    } catch (err) {
      console.error(err)
    }
  }

  const patchRoutineId = async () => {
    try {
      setError()
      const response = await fetch(`${BASE_URL}/routines/${routine.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: routineName,
          goal: routineGoal,
        }),
      })
      const result = await response.json()
      if (result.error) {
        setError(result.message)
        return
      }
      alert('Successfully edited routine')

      window.reload()
    } catch (err) {
      console.error(err)
    }
  }

  const postActivity = async (activityName, activityDescription) => {
    try {
      const response = await fetch(`${BASE_URL}/activities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: { activityName },
          description: { activityDescription },
        }),
      })

      const result = await response.json()

      console.log(result)
      return result
    } catch (err) {
      console.error(err)
    }
  }
  const postRoutineActivity = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/routines/${routine.id}/activities`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            activityId: activityId,
            count: count,
            duration: duration,
          }),
        },
      )
      const result = await response.json()
      alert('Activity added successfully')
      return result
    } catch (err) {
      console.error(err)
    }
  }
  const updateActivity = async (routineActivityId) => {
    try {
      const response = await fetch(
        `${BASE_URL}/routine_activities/${routineActivityId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          method: 'PATCH',
          body: JSON.stringify({
            duration: editDuration,
            count: editCount,
          }),
        },
      )

      const result = await response.json()
      console.log(result)
      alert('Activity updated successfully')
      return result
    } catch (err) {
      console.error(err)
    }
  }

  // arrow function =>
  // function() {} // declaring a function
  const deleteRoutineActivity = async (routineActivityId) => {
    try {
      const response = await fetch(
        `${BASE_URL}/routine_activities/${routineActivityId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )
      const result = await response.json()
      console.log(result)
      alert('Activity deleted successfully')
      return result
      console.log(result)
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <div className="routine">
      {user?.id === routine.creatorId && (
        <button
          onClick={() => {
            setShowEditForm(!showEditForm)
          }}
        >
          Edit
        </button>
      )}
      {user?.id === routine.creatorId && (
        <button onClick={deleteRoutine}>Delete</button>
      )}
      {user?.id === routine.creatorId && (
        <button
          onClick={() => {
            setShowActivityForm(!showActivityForm)
          }}
        >
          Add an Activity
        </button>
      )}
      {showActivityForm && (
        <div>
          <select
            value={activityId}
            onChange={(e) => {
              setActivityId(e.target.value)
            }}
          >
            <option value="">Select an Activity</option>
            {activities.map((activity) => {
              return (
                <option key={activity.id} value={activity.id}>
                  {activity.name}
                </option>
              )
            })}
          </select>
          <input
            type="number"
            placeholder="Duration"
            value={duration}
            onChange={(e) => {
              setDuration(e.target.value)
            }}
          />
          <input
            type="number"
            placeholder="Count"
            value={count}
            onChange={(e) => {
              setCount(e.target.value)
            }}
          />
          <button onClick={postRoutineActivity}>Add Activity</button>
        </div>
      )}
      {showEditForm && (
        <div>
          <input
            type="text"
            value={routineName}
            onChange={(e) => setRoutineName(e.target.value)}
            placeholder="Routine Name"
          />
          <input
            type="text"
            value={routineGoal}
            onChange={(e) => setRoutineGoal(e.target.value)}
            placeholder="Routine Goal"
          />
          <button onClick={patchRoutineId}>Edit Routine</button>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h2>{routine.name}</h2>
      <div className="routine__row">
        <label>Goal: </label>
        <span>
          <b>{routine.goal}</b>
        </span>
      </div>
      <div className="routine__row">
        <label>Creator: </label>
        <span>
          <b>{routine.creatorName}</b>
        </span>
      </div>

      <div className="routine__row">
        <h4>Activities</h4>
        <div className="activities">
          {routine.activities.map((activity) => {
            return (
              <div key={activity.id} className="activity">
                {user?.id === routine.creatorId && (
                  <button
                    onClick={() => {
                      if (activityToUpdate === activity.id) {
                        setEditDuration()
                        setEditCount()
                        setActivityToUpdate()
                      } else {
                        setEditDuration(activity.duration)
                        setEditCount(activity.count)
                        setActivityToUpdate(activity.id)
                      }
                    }}
                  >
                    Edit
                  </button>
                )}
                {user?.id === routine.creatorId && (
                  <button
                    onClick={deleteRoutineActivity.bind(
                      this,
                      activity.routineActivityId,
                    )}
                  >
                    Delete
                  </button>
                )}
                {activityToUpdate === activity.id && (
                  <div>
                    <input
                      type="text"
                      placeholder="Duration"
                      value={editDuration}
                      onChange={(e) => {
                        setEditDuration(e.target.value)
                      }}
                    />
                    <input
                      type="text"
                      placeholder="Count"
                      value={editCount}
                      onChange={(e) => {
                        setEditCount(e.target.value)
                      }}
                    />
                    <button
                      onClick={() => {
                        updateActivity(activity.routineActivityId)
                      }}
                    >
                      Update Activity
                    </button>
                  </div>
                )}
                <div>
                  <label>Name: </label>
                  <span>{activity.name}</span>
                </div>
                <div>
                  <label>Description: </label>
                  <span>
                    {activity.description?.length > 0
                      ? activity.description
                      : 'N/A'}
                  </span>
                </div>
                <div>
                  <label>Duration: </label>
                  <span>{activity.duration}</span>
                </div>
                <div>
                  <label>Count: </label>
                  <span>{activity.count}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default RoutineCard
