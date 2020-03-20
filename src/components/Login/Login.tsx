import React, { useCallback } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import './Login.css'

function Login() {
  const { isAuth, login, logout } = useAuth()

  const handleLogin = useCallback(() => {
    login()
  }, [login])

  const handleLogout = useCallback(() => {
    logout()
  }, [logout])

  return !isAuth ? (
    <button className="login" type="button" onClick={handleLogin}>Log in</button>
  ) : (
    <button className="login" type="button" onClick={handleLogout}>Log out</button>
  )
}

export default Login
