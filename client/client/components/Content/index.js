/* eslint-disable no-unused-vars */
import React, {Component} from 'react'
import classnames from 'classnames'
import style from './style.css'
import Strim from 'strim-js/dist/strim'

const timeIntervalForUpdate = 1000

export default class Content extends Component {
  constructor(props) {
    super(props)

    this.state = {instructions: [], completed: false}
  }

  componentDidMount() {
    this.strim = new Strim({modulesDir: '../../myModules/', wsUrl: 'ws://localhost:3000/strim/ws'})
      .pipe({
        module: 'players-data',
        func: 'samplePlayersEvery',
        args: timeIntervalForUpdate,
      })
      .toServer()
      .pipe({
        module: 'players-data',
        func: 'getPlayersDistances',
      })
      .pipe({
        module: 'players-data',
        func: 'getPlayersTurnovers',
      })
      .toClient(true)
      .pipe({
        module: 'players-data',
        func: 'calcScore',
        args: {distance: 0.3, turnovers: 0.7},
      })
      .pipe({
        module: 'players-data',
        func: 'getWorstPlayer',
      })
  }

  startGame() {
    this.setState({instructions: [], startDate: performance.now()})
    this.strim.subscribe({
      next: val => {
        const {instructions} = this.state
        const minute = ((instructions.length + 1) * 10000) / timeIntervalForUpdate
        const newInstruction = `Minute ${minute}: the weakest player is player number ${val}`
        this.setState({instructions: [...instructions, newInstruction]})
      },
      error: err => {
        throw new Error(err)
      },
      complete: () => {
        const {instructions} = this.state
        // this.setState({instructions: [...instructions, 'The game is over']})
        // this.setState({completed: true, endDate: performance.now()})
        console.timeEnd('total time')
      },
    })
  }

  render() {
    const {instructions, completed, startDate, endDate} = this.state
    return (
      <div className={classnames(style.content)} onClick={() => this.startGame()}>
        <button className={classnames(style.startGameButton)}>Start</button>
        {instructions.map((instruction, key) => (
          <div className={classnames(style.instruction)} key={key}>
            {instruction}
          </div>
        ))}
        {completed && (
          <div className={classnames(style.instruction)} key={-1}>
            {`Total time: ${endDate - startDate}`}
          </div>
        )}
      </div>
    )
  }
}
