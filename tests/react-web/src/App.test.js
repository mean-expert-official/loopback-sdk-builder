import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { RoomApi } from './shared/sdk/services/custom/Room';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('service RoomApi should be singleton', () => {
  const roomApi = new RoomApi();
  const roomApi2 = new RoomApi();
  roomApi2.test = 'Hello World';
  // Todo assert if property test is equal to HelloWorld 
})