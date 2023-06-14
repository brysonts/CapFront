import Navbar from './navbar'
import './css/navbar.css'
import './css/posts.css'
import { useState } from 'react'
import { COHORT_NAME } from '../routes/root'
import { BASE_URL } from '../routes/root'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
export const TOKEN_STRING_HERE =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQxYWRkZTcyMGJmNDAwMTQ2ODE4MDkiLCJ1c2VybmFtZSI6ImhlbGxvIiwiaWF0IjoxNjgyMDI2Mjc2fQ.0qGO87DDDT3wxnW5nI6X2UlUQO2xNkJH5_YVprFUSN4'
// export const COHORT_NAME = '2301-ftb-mt-web-pt'
// export const BASE_URL = 'https:/ /strangers-things.herokuapp.com/api/'

export default function Register() {
  const [showForm, setShowForm] = useState(false)
  const [registerUsername, setRegisterUsername] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const { setToken, token } = useOutletContext()
  const [user, setUser] = useState({})
  const navigate = useNavigate()
  const register = (ev) => {
    ev.preventDefault()

    const registerUser = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}${COHORT_NAME}/users/register`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user: {
                username: registerUsername,
                password: registerPassword,
              },
            }),
          },
        )
        const result = await response.json()
        console.log(result)

        if (result.success) {
          setToken(result.data.token)
          localStorage.setItem('token', result.data.token)
          navigate('/posts')
        }
        return result
      } catch (err) {
        console.error(err)
      }
    }
    registerUser()
  }
  //----------------------------------------------------
  const login = async (ev) => {
    ev.preventDefault()
    console.log(loginUsername, loginPassword)

    const loginUser = async () => {
      try {
        const response = await fetch(`${BASE_URL}${COHORT_NAME}/users/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: {
              username: loginUsername,
              password: loginPassword,
            },
          }),
        })
        const result = await response.json()
        if (result.success) {
          const token = result.data.token
          localStorage.setItem('token', token)
          setUser(result.data.user)
          setToken(token)
          navigate('/posts')
        }
        return result
      } catch (err) {
        console.error(err)
      }
    }

    await loginUser()
  }

  //---------------LOGIN--------------------------------
  //   const login = async (ev) => {
  //     ev.preventDefault()
  //     console.log(loginUsername, loginPassword)
  //     const loginUser = async () => {
  //       try {
  //         const response = await fetch(`${BASE_URL}${COHORT_NAME}/users/login`, {
  //           method: 'POST',
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //           body: JSON.stringify({
  //             user: {
  //               username: loginUsername,
  //               password: loginPassword,
  //             },
  //           }),
  //         })
  //         const result = await response.json()
  //         if (result.success) {
  //           setToken(result.data.token)
  //           localStorage.setItem('token', result.data.token)
  //           navigate('/profile')
  //         }
  //         // You can log ▲▲▲ the result
  //         // here ▼▼▼ to view the json object before returning it
  //         const token = result.data.token
  //         console.log(token)
  //         try {
  //           const response = await fetch(`${BASE_URL}${COHORT_NAME}/users/me`, {
  //             headers: {
  //               'Content-Type': 'application/json',
  //               Authorization: `Bearer ${token}`,
  //             },
  //           })
  //           const user = result.data
  //           setUser(user)
  //           const result = await response.json()
  //           console.log(result)
  //           if (result.success) {
  //             setToken(result.data.token)
  //             localStorage.setItem('token', result.data.token)
  //             navigate('/profile')
  //           }
  //           return result
  //         } catch (err) {
  //           console.error(err)
  //         }
  //         console.log(result)
  //         return result
  //       } catch (err) {
  //         console.error(err)
  //       }
  //       loginUser()
  //       console.log('jeffery')
  //     }
  //     login()
  //   }
  //--------------------------------------------------------

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
        <button>Register </button>
      </form>
      <div className="alreadySigned">
        <p className="alreadySignedText">Already a Stranger?</p>
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
            <button>Login</button>
          </form>
        )}
      </div>
    </div>
  )
}
