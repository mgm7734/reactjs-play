import React from 'react';
import './App.css';
import DriveTest from './DriveTest'

const App = (props) => (
  <div className="App">
    <ul>
      <li><a href="/"     >Home</a></li>
      <li><a href="/about">About</a></li>
      <li>Contact</li>
    </ul>
    
    {props.children}
    
  </div>
)

const Home = (props) => (
  <DriveTest />
)

const About = (props) => (
  <p>This is a ReactJS play project abou Tags</p>
)
export {Home, About}
export default App


