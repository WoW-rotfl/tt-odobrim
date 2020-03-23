import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import App from './App'
import store from './store'
import { AuthProvider } from './contexts/AuthContext'

afterAll(() => localStorage.setItem('isAuth', ''))

const setup = () => (
  render(
    <AuthProvider store={store}>
      <App />
    </AuthProvider>
  )
)

test('renders tt-odobrim app', () => {
  const { getByText } = setup()
  const linkElement = getByText(/tt-odobrim/i)
  expect(linkElement).toBeInTheDocument()
})

test('should show notify me form after login', () => {
  const { getByText } = setup()
  const loginBtn = getByText(/Log in/)
  fireEvent.click(loginBtn)
  expect(loginBtn.innerHTML).toBe('Log out')
  expect(getByText(/Notify me if/)).toBeInTheDocument()
})
