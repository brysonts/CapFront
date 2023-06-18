import { BASE_URL } from '../utils'
import { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'

export default function Register() {
  const [loginError, setLoginError] = useState('')
  const [registerError, setRegisterError] = useState('')
  const [registerUsername, setRegisterUsername] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [user, setUser] = useState({})
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const { setToken, token } = useOutletContext()
  const navigate = useNavigate()
  const register = (ev) => {
    ev.preventDefault()

    const registerUser = async () => {
      // clearing the previous error
      setRegisterError('')
      try {
        const response = await fetch(`${BASE_URL}/users/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            // user: {
            username: registerUsername,
            password: registerPassword,
            // },
          }),
        })
        const result = await response.json()

        if (result.error) {
          setRegisterError(result.error)
          return
        }
        if (result.token) {
          setToken(result.token)
          localStorage.setItem('token', result.token)
          navigate('/')
        }
        return result
      } catch (err) {
        console.error(err)
      }
    }
    registerUser()
  }
  const login = async (ev) => {
    ev.preventDefault()
    console.log(loginUsername, loginPassword)

    const loginUser = async () => {
      setLoginError('')
      try {
        const response = await fetch(`${BASE_URL}/users/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            // user: {
            username: loginUsername,
            password: loginPassword,
            // },
          }),
        })
        const result = await response.json()
        if (result.error) {
          setLoginError(result.error)
          return
        }
        if (result.token) {
          const token = result.token
          localStorage.setItem('token', token)
          setUser(result.user)
          setToken(token)
          navigate('/')
        }
        return result
      } catch (err) {
        console.error(err)
      }
    }

    await loginUser()
  }
  //---------------------CLICK HANDLER--------------------------------
  const handleClick = () => {
    setShowForm(!showForm)
  }
  //----------------------RETURNED COMPONENT---------------------------
  return (
    <div>
      {/* <Navbar></Navbar> */}
      <h1>Register</h1>
      {/* if there is a user ID we welcome the username, if not, it is null */}
      {user._id ? <h1> Welcome {user.username}</h1> : null}
      <form onSubmit={register}>
        <input
          placeholder="username"
          value={registerUsername}
          onChange={(ev) => setRegisterUsername(ev.target.value)}
        ></input>
        <input
          placeholder="password"
          type="password"
          value={registerPassword}
          onChange={(ev) => setRegisterPassword(ev.target.value)}
        ></input>
        {registerError && <p style={{ color: 'red' }}>{registerError}</p>}
        <button>Register </button>
      </form>
      <div className="alreadySigned">
        <p className="alreadySignedText">Already Signed up? Login Here</p>
        <button onClick={handleClick}>
          {/* if show form is false, show login, if it is true, show "hide login form" */}
          {showForm ? 'Hide' : 'Sign in'}
        </button>
        {showForm && (
          <form onSubmit={login}>
            <input
              placeholder="username"
              value={loginUsername}
              onChange={(ev) => setLoginUsername(ev.target.value)}
            ></input>
            <input
              placeholder="password"
              type="password"
              value={loginPassword}
              onChange={(ev) => setLoginPassword(ev.target.value)}
            ></input>
            {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
            <button>Login</button>
          </form>
        )}
      </div>
    </div>
  )
}
