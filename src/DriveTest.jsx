// https://developers.google.com/api-client-library/javascript/features/authentication
import React, { Component } from 'react';

const CLIENT_ID = '839737567290-7dcb5jb6au3pdhj45d6ppk2hq4jlhu2u.apps.googleusercontent.com'
const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];

export default class DriveTest extends Component {
  constructor(props) {
    super(props)
    this.state = {isSignedIn: true}
  }
  render() {
    return (
      <button onClick={this.handleSigninClick.bind(this)}
	      ref={(btn) => this.signInButton = btn}
	      style={{display: this.state.isSignedIn ? 'none' : 'block'}}
      >Sign In</button>
    )
  }
  componentDidMount() {
    const element = document.getElementsByTagName('script')[0];
    const js = document.createElement('script');
    js.src = '//apis.google.com/js/client:platform.js';
    element.parentNode.insertBefore(js, element);
    js.onload = this.onGapiLoaded.bind(this)
  }
  onGapiLoaded() {
    console.log('onGapiLoaded')
    window.gapi.load('client:auth2', this.initAuth.bind(this))
  }
  initAuth() {
    const auth2 = window.gapi.auth2
    auth2.init({
      client_id: CLIENT_ID,
      scope: SCOPES[0]
    }).then(() => {
      console.log("step 2")
      // Listen for sign-in state changes.
      auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus.bind(this))

      // Handle the initial sign-in state.
      this.updateSigninStatus(auth2.getAuthInstance().isSignedIn.get());

      //signInButton.addEventListener("click", handleSigninClick);
      //signoutButton.addEventListener("click", handleSignoutClick);
    })
  }
  updateSigninStatus(isSignedIn) {
    console.log("updateSigninStatus:" + isSignedIn)
    this.setState({
      isSignedIn
    })
  }
  handleSigninClick(event) {
    window.gapi.auth2.getAuthInstance().signIn();
  }
}

