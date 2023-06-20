const express = require('express')
const app = express()
const {Server} = require('socket.io')
const http = require('http')
const server = http.createServer(app)
const cors = require('cors')


//middleware
app.use(cors())

const io = new Server(server,{
    cors:{
        origin:'http://localhost:3000',
        methods:["GET","POST"]
    }
})

io.on('connection',(socket) =>{
    socket.on('join_room',(data)=>{
    socket.join(data)        
    })
    socket.on('Message',(data)=>{
    console.log(data)
    socket.to(data.room).emit('receive_Msg',data)
      
    })
})

server.listen(4000,()=>{
    console.log('Connected to server')
})