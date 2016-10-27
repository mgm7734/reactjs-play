import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import DriveTest from './DriveTest'

class App extends Component {
  render() {
    const CLIENT_ID = "413809978087.apps.googleusercontent.com"
    //const CLIENT_SECRET = "NSlX53kBAmwAnBJmD6e9xlvJ"
   // const REDIRECT_URL = "http://localhost:8080/oauth2callback"
    const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
	<DriveTest
	    clientId={CLIENT_ID}
	    scope={SCOPES[0]}
	/>
      </div>
    );
  }
}

export default App;
