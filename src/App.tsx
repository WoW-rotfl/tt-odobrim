import React from 'react'
import logo from './logo.svg'

import { useAuth } from './contexts/AuthContext'
import { ExchangeProvider, ExchangeConsumer } from './contexts/ExchangeContext'

import Converter from './components/Converter'
import Login from './components/Login'
import Notifier from './components/Notifier'

import './App.css'
import ErrorModal from './ErrorModal'

function App() {
  const { isAuth } = useAuth()
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <span>tt-odobrim</span>
        <a className="App-github" href="https://github.com/WoW-rotfl/tt-odobrim">GitHub</a>
      </header>
      <div className="content">
        <Login />
          <ExchangeProvider>
            <ExchangeConsumer>
              {(context) => (
                !context!.error ? (
                  <Converter
                    afterConverter={(getConverterData) => (
                      isAuth && (<Notifier getConvertionData={getConverterData} />)
                    )}
                  />
                ) : <ErrorModal title="Rapid API currency load error" />
              )}
            </ExchangeConsumer>
          </ExchangeProvider>
      </div>
    </div>
  );
}

export default App
