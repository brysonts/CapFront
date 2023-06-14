import { useState } from 'react'
import { useOutlet, useOutletContext, Link } from 'react-router-dom'
import Navbar from './navbar'

import { COHORT_NAME } from '../routes/root'
import { BASE_URL } from '../routes/root'
import './css/post.css'

export default function EditPost() {
  const { postId, post, setPost, token } = useOutletContext()
  const [title, setTitle] = useState(post.title)
  const [description, setDescription] = useState(post.description)
  const [price, setPrice] = useState(post.price)

  const edit = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}${COHORT_NAME}/posts/${postId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            post: {
              title,
              description,
              price,
            },
          }),
        },
      )
      const result = await response.json()
      console.log(result)
      if (result.success) {
        setPost(result.data.post)
        alert('Post edited successfully')
      } else {
        alert('Edit failed')
      }

      return result
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <div>
      <h2>Edit</h2>
      <Link to={`/posts/${postId}`}>Go Back</Link>
      <div>
        <input
          className="editInput"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="editInput"
          placeholder="Enter Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          className="editInput"
          placeholder="Enter Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button onClick={edit}>Submit Edit</button>
      </div>
    </div>
  )
}
