import React from 'react'
import logo from './logo.svg'
import Converter from './components/Converter'
import { ExchangeProvider } from './contexts/ExchangeContext'
import Login from './components/Login'
import { useAuth } from './contexts/AuthContext'
import './App.css'
import Notifier from './components/Notifier'

function App() {
  const { isAuth } = useAuth()
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <span>tt-odobrim</span>
      </header>
      <div className="content">
        <Login />
          <ExchangeProvider>
            <Converter
              afterConverter={(getConverterData) => (
                isAuth && (<Notifier getConvertionData={getConverterData} />)
              )}
            />
          </ExchangeProvider>
      </div>
    </div>
  );
}

export default App
