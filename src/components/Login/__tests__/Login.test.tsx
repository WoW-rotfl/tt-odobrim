import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { AuthProvider } from '../../../contexts/AuthContext'
import store from '../../../store'
import Login from '../Login'

function setup() {
  return {...render(
    <AuthProvider store={store}>
      <Login />
    </AuthProvider>
  )}
}

test('should handle login', () => {
  const { getByText } = setup()
  const button = getByText(/Log in/) as HTMLButtonElement
  expect(button.innerHTML).toBe('Log in')
  fireEvent.click(button)
  expect(button.innerHTML).toBe('Log out')
})

test('should handle logout', () => {
  const { getByText } = setup()
  const button = getByText(/Log out/) as HTMLButtonElement
  fireEvent.click(button)
  expect(button.innerHTML).toBe('Log in')
})
