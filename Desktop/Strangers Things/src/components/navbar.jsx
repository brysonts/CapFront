import { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './css/posts.css'

export default function Navbar({ user, setToken, setUser }) {
  const { posts } = useContext
  function handleLogout() {
    localStorage.removeItem('token')
    setToken('')
    setUser({})
  }
  const location = useLocation()

  function handleProfileLinkClick(event) {
    if (location.pathname === '/profile') {
      event.preventDefault()
      alert("You're already on profile!")
    }
  }
  return (
    <div className="navLinkAll">
      <Link className="navLink" to={'/'}>
        Home
      </Link>
      <Link className="navLink" to={'/posts'}>
        Posts
      </Link>
      <Link
        className="navLink"
        to={'/profile'}
        onClick={handleProfileLinkClick}
      >
        profile
      </Link>
      {user._id && (
        <>
          <Link className="navLink" to={'/messages'}>
            Messages
          </Link>
          <Link onClick={handleLogout} className="navLink" to={'/'}>
            Logout
          </Link>
          <span className="welcomeID">
            Welcome,{' '}
            <Link className="navbarProfileLink" to="/profile">
              {user.username}
            </Link>
            .
          </span>
        </>
      )}
      {!user._id && (
        <>
          <Link className="navLink" to={'/register'}>
            Register
          </Link>
        </>
      )}
    </div>
  )
}
