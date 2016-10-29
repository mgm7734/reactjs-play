import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route,IndexRoute, browserHistory } from 'react-router'

import App, {Home, About} from './App';
import './index.css';


ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="about" component={About}/>
    </Route>
 </Router>
), document.getElementById('root'))
