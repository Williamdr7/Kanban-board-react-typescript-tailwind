import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'

import App from './App'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import Header from './components/Header/Header'

const routing = (
  <Router>
    <Header />
    <div className="page">
      <Switch>
        <Route exact path="/" component={App} />
      </Switch>
    </div>
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'))
