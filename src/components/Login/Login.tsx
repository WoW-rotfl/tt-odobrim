import React, { useCallback } from 'react'
import Button from '@material-ui/core/Button'
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

  return (
    <Button
      onClick={isAuth ? handleLogout : handleLogin}
    >
      {isAuth ? 'Log out' : 'Log in'}
    </Button>
  )
}

export default Login
