import React from 'react'
import rapidapi from './api/rapidapi'
import { render, fireEvent, wait } from '@testing-library/react'

import App from './App'
import store from './store'
import { AuthProvider } from './contexts/AuthContext'

afterAll(() => localStorage.setItem('isAuth', ''))

jest.mock('./api/rapidapi')

const setup = () => {
  const rates: { [currency: string]: number } = {
    USD: 1,
    EUR: 1.06938,
    GBP: 1.16207,
    JPY: 0.00905421,
    RUB: 0.0124567,
  }
  const mockedRapidapi = rapidapi as jest.Mock
  mockedRapidapi.mockResolvedValue(rates)

  return render(
    <AuthProvider store={store}>
      <App />
    </AuthProvider>
  )
}

test('renders tt-odobrim app', async () => {
  const { getByText } = setup()
  const linkElement = getByText(/tt-odobrim/i)
  expect(linkElement).toBeInTheDocument()
  await wait()
})

test('should show notify me form after login', async () => {
  const { getByText, findByText } = setup()
  const loginBtn = getByText(/Log in/)
  fireEvent.click(loginBtn)
  expect(loginBtn.innerHTML).toBe('Log out')
  expect(await findByText(/Notify me if/)).toBeInTheDocument()
  await wait()
})

test('should show error notification', async () => {
  const mockedRapidapi = rapidapi as jest.Mock
  mockedRapidapi.mockRejectedValue('Test error: should show error notification')

  const { findByText } = render(
    <AuthProvider store={store}>
      <App />
    </AuthProvider>
  )
  expect(await findByText(/Rapid API currency load error/)).toBeInTheDocument()
})
