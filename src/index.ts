import 'module-alias/register'

import express from 'express'
import bodyParser from "body-parser"
import cors from 'cors'

import socketIo, { Socket } from 'socket.io'

import env from '@core/Environment'
import auth from '@auth_infrastructure/Delivery/API/base'

import Router from '@auth_infrastructure/Delivery/Websockets/Router'

const router = express()

router.use(bodyParser.urlencoded({extended: false}))
router.use(bodyParser.json())
router.use(cors())

router.use('/api/accounts', auth)

router.get('/', function (req, res) {
  res.json({
    message: 'Welcome to MemberArea API v1'
  })
  res.end()
})

const server = router.listen(env.host.port, function () {
  console.log(`Listenning to *:${env.host.port} ...`)
})

// Socket.io
const io = socketIo(server)

io.on('connection', function (socket: Socket) {
  const router = new Router(socket)
  router.run()
})
