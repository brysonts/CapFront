import { useEffect } from 'react'
import { useState } from 'react'
import { Link, Outlet, useOutletContext } from 'react-router-dom'
import './css/posts.css'
import { BASE_URL } from '../routes/root'
import { COHORT_NAME } from '../routes/root'

export default function Posts() {
  const { posts, token, setPosts, user } = useOutletContext()
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')

  const handleClick = (e) => {
    e.preventDefault()
    setShowForm(!showForm)
  }

  const handleAddPost = async (e) => {
    e.preventDefault()
    // make a POST request to the server to create a new post
    try {
      const response = await fetch(`${BASE_URL}${COHORT_NAME}/posts`, {
        method: 'POST',
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
      })
      const result = await response.json()
      console.log(result)

      // update the posts context with the newly created post
      setPosts([...posts, result.data.post])
    } catch (err) {
      console.error(err)
    }
    setTitle('')
    setDescription('')
    setPrice('')
    alert('Post Added, See @ Bottom!')
  }
  return (
    <div>
      <Outlet context={useOutletContext()}></Outlet>

      <div>
        <Outlet context={useOutletContext()}></Outlet>

        {user._id && (
          <button className="showHideNewPost" onClick={handleClick}>
            {showForm ? 'hide' : 'Post your item here'}{' '}
          </button>
        )}
        {showForm && (
          <form>
            <input
              onChange={(ev) => setTitle(ev.target.value)}
              value={title}
              placeholder="Title"
            />
            <input
              onChange={(ev) => setDescription(ev.target.value)}
              value={description}
              placeholder="Description"
            />
            <input
              onChange={(ev) => setPrice(ev.target.value)}
              value={price}
              placeholder="Price"
            />
            <button onClick={handleAddPost} type="submit">
              Post
            </button>
          </form>
        )}
      </div>
      {!user._id && (
        <>
          <Link className="sortp" to={'/register'}>
            Sign in or Register to post
          </Link>
        </>
      )}
      <h1 className="postTitle">Posts</h1>
      <div>
        {posts &&
          posts.map((post) => {
            return (
              <Link key={post._id} to={`/posts/${post._id}`}>
                <div className="postsContainer">
                  <h3>{post.title}</h3>
                  <p>{post.price}</p>
                </div>
              </Link>
            )
          })}
      </div>
    </div>
  )
}

// {/* <button onClick={handleClick}>
// {/* if show form is false, show login, if it is true, show "hide login form" */}
// {showForm ? 'Hide' : 'Sign in'}
// </button>
// {showForm && (
// <form onSubmit={login}>
//   <input
//     placeholder="username"
//     value={loginUsername}
//     onChange={(ev) => setLoginUsername(ev.target.value)}
//   ></input>
//   <input
//     placeholder="password"
//     type="p"
//     value={loginPassword}
//     onChange={(ev) => setLoginPassword(ev.target.value)}
//   ></input>
//   <button>Login</button>
// </form>
// )}
// </div> */}
