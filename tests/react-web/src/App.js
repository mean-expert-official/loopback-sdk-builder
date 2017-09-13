import React from 'react';
import SDK, { Component } from './shared/sdk/';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super({services: ['RoomApi']});
  }
  componentDidMount() {
    this.RoomApi.find().subscribe(data => {
      console.log(data);
    })
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
