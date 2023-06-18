import { useState } from 'react'
import { useOutletContext, Link } from 'react-router-dom'

import { BASE_URL } from '../utils'
import './css/post.css'

export default function EditRoutine() {
  const { user, token } = useOutletContext()
  const [name, setName] = useState(routine.name)
  const [goal, setGoal] = useState(routine.description)

  const EditRoutine = async (name, goal) => {
    try {
      const response = await fetch(`${BASE_URL}/routines/:routineId`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        method: 'PATCH',
        body: JSON.stringify({
          name: { name },
          goal: { goal },
        }),
      })

      const result = await response.json()
      console.log(result)
      return result
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <h2>Edit</h2>
      <Link to={`/routines/${routineId}`}>Go Back</Link>
      <div>
        <input
          className="editInput"
          placeholder="Enter Title"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="editInput"
          placeholder="Enter Description"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />
        <button onClick={EditRoutine}>Submit Edit</button>
      </div>
    </div>
  )
}
