
import './App.css';
import io from 'socket.io-client'
import {useState,memo} from 'react'
import{Button, Form} from 'react-bootstrap'
import Chat from './Chat';

const socket = io.connect('http://localhost:4000')


function App() {
const[input,setinput]=useState(
  {
    username:'',
    room:''
  }
)
const[chat,setChat]=useState(false)
const handelChange = (e)=>{
  setinput({...input, [e.target.name]:e.target.value})
}

const join = () =>{
  if(input.username !== '' && input.room !== '') {
    socket.emit("join_room",input.room)
    setChat(true)
  }
}

  return (
    <div className="App">
      {!chat ?
      (<Form className='mx-auto w-25 border text-center p-5' style={{backgroundColor:'olive'}}>
        <h1>Join Chat</h1>
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="UserName" name="username" value={input.username} onChange={handelChange}/> 
        <Form.Label>Room</Form.Label>
        <Form.Control type="text" placeholder='Room' name="room" value={input.room} onChange={handelChange}/>
        <Button onClick={join}>Join</Button>
      </Form>)
      :
      <Chat  username={input.username} socket={socket} room={input.room}/>
}
    </div>
  );
}

export default memo(App);
