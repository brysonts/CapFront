import { useOutletContext } from 'react-router-dom'

export default function Messages() {
  const { posts, token, user, getPosts } = useOutletContext()
  console.log(user)
  const messagesObj = user.messages
  return (
    <div>
      <h1>{user.username} Messages</h1>

      {user._id && (
        <>
          <h2>Messages</h2>
          {user.messages.map((message) => (
            <p key={message.id}>{message.content}</p>
          ))}
        </>
      )}
    </div>
  )
}
