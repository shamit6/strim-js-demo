import React, {Component} from 'react'
import classnames from 'classnames'
import style from './style.css'
import Router from '../../containers/Router'

class App extends Component {
  render() {
    return (
      <div className={classnames(style.app)}>
        <Router />
      </div>
    )
  }
}

export default App
