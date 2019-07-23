const express = require('express')
const WebSocket = require('ws')
const app = express()
const url = require('url')
const server = app.listen(8899, '127.0.0.1', err => {
    if (err) throw err
    console.log('服务开启成功,访问127.0.0.1:8899')
})
const wss = new WebSocket.Server({
    server
})
let clientArr = []
wss.on('connection', function connection(ws,req) {
    clientArr.push(ws)
    let user = url.parse(req.url,true).query.userName
    ws.on('message', function incoming(message) {
        // console.log(message)
        clientArr.forEach((value,index)=>{
            value.send(`<p>${user}:${message}</p>`)
        })
    })

    // ws.send('something');
});