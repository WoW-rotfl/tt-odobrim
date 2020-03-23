import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import ErrorBoundary from './ErrorBoundary'
import { AuthProvider } from './contexts/AuthContext'
import store from './store'
import * as serviceWorker from './serviceWorker'
import './index.css'

ReactDOM.render(
  <ErrorBoundary>
    <AuthProvider store={store}>
      <App />
    </AuthProvider>
  </ErrorBoundary>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
