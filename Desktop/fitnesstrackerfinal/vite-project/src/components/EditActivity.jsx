import { useState } from 'react'
import { useOutlet, useOutletContext, Link } from 'react-router-dom'
import { BASE_URL } from '../utils'
import './css/post.css'

export default function editActivity() {
  const { token } = useOutletContext()
  const [name, setName] = useState(activity.title)
  const [description, setDescription] = useState(activity.description)

  const editActivity = async () => {
    try {
      const response = await fetch(`${BASE_URL}/activities/:activityId`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        method: 'PATCH',
        body: JSON.stringify({
          name: { name },
          description: { description },
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
      <Link to={`/activities/${activityId}`}>Go Back</Link>
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
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={editActivity}>Submit Edit</button>
      </div>
    </div>
  )
}
