import { Link, Outlet, useOutletContext } from 'react-router-dom'
import Register from './register'

export default function Profile() {
  const { user } = useOutletContext()

  return (
    <div>
      {!user._id && (
        <>
          <h1>Oops, you're not signed in! Sign in or Register Below</h1>
          <Register />
        </>
      )}
      {user._id && (
        <>
          <h1>{user.username}'s Profile</h1>
          <h2>Messages</h2>
          {user.messages.map((message) => (
            <p key={message.id}>{message.content}</p>
          ))}
        </>
      )}
    </div>
  )
}
