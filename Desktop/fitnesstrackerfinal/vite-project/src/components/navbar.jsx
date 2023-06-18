import { Link, useLocation } from 'react-router-dom'
import './css sheets/navbar.css'
export default function Navbar({ user, setToken, setUser }) {
  function handleLogout() {
    localStorage.removeItem('token')
    setToken('')
    setUser({})
  }
  return (
    <div className="navLinkAll">
      <Link className="navLink" to={'/'}>
        Home
      </Link>
      <Link className="navLink" to={'/routines'}>
        Routines
      </Link>
      <Link
        className="navLink"
        to={'/activities'}
        // onClick={handleProfileLinkClick}
      >
        Activities
      </Link>
      {user.id && (
        <>
          <Link className="navLink" to={'/myRoutines'}>
            My Routines
          </Link>
          <Link onClick={handleLogout} className="navLink" to={'/'}>
            Logout
          </Link>
          <span className="welcomeID">
            Hello,{' '}
            <Link className="navbarProfileLink" to="/myroutines">
              {user.username}
            </Link>
            .
          </span>
        </>
      )}
      <></>

      <>
        {!user.id && (
          <Link className="navLink" to={'/register'}>
            Register
          </Link>
        )}
      </>
    </div>
  )
}
