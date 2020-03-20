import React from 'react'
import logo from './logo.svg'
import Converter from './components/Converter'
import { ExchangeProvider } from './contexts/ExchangeContext'
import Login from './components/Login'
import { AuthProvider } from './contexts/AuthContext'
import store from './store'
import './App.css'

function App() {
  const [isShowConverter, setShowConverter] = React.useState(true)
  return (
    <AuthProvider store={store}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <span>tt-odobrim</span>
          <Login />
        </header>
        <div className="content">
          <button onClick={ () => setShowConverter(isShow => !isShow) }>click</button>
          {isShowConverter ? (
            <ExchangeProvider>
              <Converter />
            </ExchangeProvider>
          ) : (
            <span>Nope</span>
          )}
          
        </div>
      </div>
    </AuthProvider>
  );
}

export default App
