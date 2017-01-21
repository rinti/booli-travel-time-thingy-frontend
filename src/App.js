import React, { Component } from 'react'
import List from './List'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Listings</h2>
        </div>
        <div className="App-list">
          <div className="List-wrapper">
            <div className="List-half">
              <List />
            </div>
            <div className="List-half">
              <div className="Selected-item">
                lorem ipsum
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
