import http from 'http'
import express from 'express'
import bodyParser from 'body-parser'
import {devMiddleware, hotMiddleware} from './webpack.js'
import path from 'path'

const {setStrimModules, setWs} = require('strim-js/dist/strimModules')

const app = express()

app.use(bodyParser.json())

if (process.env.NODE_ENV === 'development') {
  app.use(devMiddleware())
  app.use(hotMiddleware())
}

const STATIC_FILES_DIRECTORY = path.join(__dirname, '../client/static')

app.use(express.static(STATIC_FILES_DIRECTORY))

const httpServer = http.createServer(app)

setWs(httpServer)
setStrimModules(app, {modulesPath: './myModules'})

httpServer.listen(3000, () => {
  console.log('Joe app listening on port 3000!')
})
