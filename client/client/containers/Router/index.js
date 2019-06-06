import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Loadable from 'react-loadable'
import Header from '../../components/Header'
import Loader from '../../components/Loader'

const LoadableContent = Loadable({
  loader: () => import('../../components/Content'),
  loading: Loader,
})

export default class RouterContent extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <Route component={Header} exact path="/" />
          <Switch>
            <Route component={LoadableContent} exact path="/" />
          </Switch>
        </React.Fragment>
      </Router>
    )
  }
}
