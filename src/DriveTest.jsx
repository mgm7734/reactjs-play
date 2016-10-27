// https://developers.google.com/api-client-library/javascript/features/authentication
import React, { Component } from 'react';

const CLIENT_ID = '839737567290-7dcb5jb6au3pdhj45d6ppk2hq4jlhu2u.apps.googleusercontent.com'
const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];

export default class DriveTest extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isSignedIn: false,
      tags: []
    }
    this.logError = this.logError.bind(this)
  }
  logError(err) {
    console.log('error', err)
  }
  render() {
    return (
      <div className="DriveTest">
	<button onClick={this.handleSigninClick.bind(this)}
		ref={(btn) => this.signInButton = btn}
		style={{display: this.state.isSignedIn ? 'none' : 'block'}}
        >Sign In</button>
	<ul style={{textAlign: 'left'}}>{
	  this.state.tags.map( (tag, i) => (
	    <li key={i} title={tag.id}> { tag.name } - {tag.parents[0]} </li>
	  ))}</ul>
      </div>
    )
  }
  updateTags() {
    window.gapi.client.load('drive', 'v3').then(() =>
      window.gapi.client.drive.files.get({fileId: 'root', fields: 'id'})
    ).then(({result: {id}}) =>
      window.gapi.client.drive.files.list(
	{ pageSize: 100
	, fields: "nextPageToken, files(id, name, parents)"
	, q: `mimeType = 'application/vnd.google-apps.folder' and '${id}' in parents`
	}
      ), this.logError
    ).then(({result: {files, nextPageToken}}) => {
      this.setState({
	tags: files,
	nextPageToken
      })
    })
  }
  componentDidMount() {
    const element = document.getElementsByTagName('script')[0];
    const js = document.createElement('script');
    js.src = '//apis.google.com/js/client:platform.js';
    element.parentNode.insertBefore(js, element);
    js.onload = this.onGapiLoaded.bind(this)
  }
  onGapiLoaded() {
    window.gapi.load('client:auth2', this.initAuth.bind(this))
  }
  initAuth() {
    const auth2 = window.gapi.auth2
    auth2.init({
      client_id: CLIENT_ID,
      scope: SCOPES[0]
    }).then(() => {
      // Listen for sign-in state changes.
      auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus.bind(this))

      // Handle the initial sign-in state.
      this.updateSigninStatus(auth2.getAuthInstance().isSignedIn.get());
    })
  }
  updateSigninStatus(isSignedIn) {
    this.setState({
      isSignedIn
    })
    if (isSignedIn) this.updateTags()
  }
  handleSigninClick(event) {
    window.gapi.auth2.getAuthInstance().signIn();
  }
}

