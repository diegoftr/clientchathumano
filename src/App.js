import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import Chat from './Chat'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="">
          <h1 className="App-title">Cliente ChatHumano</h1>
        </header>
        <Chat />
      </div>
    )
  }
}

export default App
