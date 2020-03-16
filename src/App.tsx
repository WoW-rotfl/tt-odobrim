import React from 'react'
import logo from './logo.svg'
import Converter from './components/Converter'
import { ExchangeProvider } from './ExchangeContext'
import './App.css'

function App() {
  console.log('app:render');
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <span>tt-odobrim</span>
      </header>
      <div className="content">
        <ExchangeProvider>
          <Converter />
        </ExchangeProvider>
      </div>
    </div>
  );
}

export default App
