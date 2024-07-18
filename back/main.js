const express = require('express')
const WebSocket = require('ws')
const cors = require('cors')

const WS_PORT = 8080, EXPRESS_PORT = 8000

const app = express()
app.use(express.json())
app.use(cors())

const wsServer = new WebSocket.Server({ port: WS_PORT })

let messages = []
const maxMessageCount = 9


const broadcast = (type, message) => {
    wsServer.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type, ...message }))
        }
    })
}

const addMessage = (message) => {
    if (messages.length >= maxMessageCount) {
        messages.shift()
        broadcast('delete', message)
    }
    messages.push(message)
    broadcast('add', message)
}

app.get('/api/messages', (req, res) => {
    res.json(messages)
})

app.post('/api/messages', (req, res) => {
    addMessage({
        text: req.body.message,
        id: Math.random().toString()
    })
    res.status(200).send()
})

wsServer.on('connection', (ws) => {
    ws.on('message', (data) => {
        const message = JSON.parse(data)
        addMessage(message)
    })
})

app.listen(EXPRESS_PORT, () => {
    console.log(`Server listening on port ${EXPRESS_PORT}`)
})