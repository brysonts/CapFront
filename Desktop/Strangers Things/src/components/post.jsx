import {
  Outlet,
  useOutlet,
  useOutletContext,
  useParams,
  useNavigate,
  Link,
} from 'react-router-dom'
import { COHORT_NAME } from '../routes/root'
import { BASE_URL } from '../routes/root'
import { useState, useEffect } from 'react'
import './css/post.css'

export default function Post() {
  const { postId } = useParams()
  const navigate = useNavigate()
  console.log(postId)
  const { posts, token, user, getPosts } = useOutletContext()

  // now we want to find the post with that id in the array of posts
  const [post, setPost] = useState(posts.find((p) => p._id === postId) || null)
  const [messages, setMessages] = useState(post?.messages || [])
  const [messageInput, setMessageInput] = useState()
  console.log(messages)

  const messageAuthor = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}${COHORT_NAME}/posts/${postId}/messages`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            message: {
              content: messageInput,
            },
          }),
        },
      )
      const result = await response.json()
      console.log(result)
      setMessages([...messages, result.data.message])
      return result
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    const post = posts.find((p) => p._id === postId)
    console.log('posts rerender', posts)
    setPost(post)
    console.log('post', post)
    if (post?.messages) {
      setMessages(post?.messages)
    }
  }, [posts])

  if (!post) {
    return <></>
  }

  return (
    <div>
      <Outlet context={{ postId, post, setPost, token }}> </Outlet>
      <div className="containedPost">
        <h1>{post.title}</h1>
        <h3>{post.description}</h3>
        <h4>{post.price}</h4>
      </div>
      {/* conditionally add message array of there if author === author  */}
      {post.author._id === user._id && (
        <Link className="editPostLink" to={`/posts/${postId}/edit`}>
          Edit Post
        </Link>
      )}
      {post.author._id === user._id && (
        <button
          onClick={() => {
            const deletePost = async () => {
              try {
                const response = await fetch(
                  `${BASE_URL}${COHORT_NAME}/posts/${postId}`,
                  {
                    method: 'DELETE',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${token}`,
                    },
                  },
                )
                const result = await response.json()
                if (result.success) {
                  alert('Post deleted')
                  getPosts()
                  navigate('/posts')
                }
                return result
              } catch (err) {
                console.error(err)
              }
            }
            deletePost()
          }}
        >
          Delete Post
        </button>
      )}
      {user._id && post.author._id !== user._id && (
        <>
          <input
            onChange={(e) => {
              setMessageInput(e.target.value)
            }}
            value={messageInput}
            placeholder="Type Message Here"
          />
          <button onClick={messageAuthor}>Message Author</button>
        </>
      )}
      {user._id && (
        <>
          <h2>Messages</h2>
          <div>
            {messages.map((message) => {
              return (
                <div>
                  <p>{message.content}</p>
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
