import React from 'react';
import SDK, { Component } from './shared/sdk/';

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
