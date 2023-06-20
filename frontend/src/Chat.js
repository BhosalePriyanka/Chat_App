import React, { useState ,memo,useMemo} from 'react';
import {Form} from 'react-bootstrap';
import ScrollToBottom from 'react-scroll-to-bottom';

function Chat({username,socket,room}) {
    const[currentMsg,setcurrentMsg] = useState('')
    const[msg,setMsg]=useState([])
   

    const joinChat = async() =>{
        const msg = {
            username:username,
            message:currentMsg,
            time:new Date().getHours() + ':' + new Date().getMinutes(),
            room:room
        }
        await socket.emit("Message",msg)
        setMsg((list) => [...list, msg]);
        setcurrentMsg('')
    }

    useMemo(() =>  socket.on('receive_Msg',(data)=>{
      
        setMsg((list)=>[...list,data])     
    }) , [socket])


    
    

  return (
    <>
    <div className='mx-auto border border-dark' style={{width:'300px',backgroundColor:'orange',}}>
    <div className='border border-dark p-1' style ={{backgroundColor:'black',color:'white',textAlign:'center'}}>Live chat</div>
   <ScrollToBottom>
    <div style={{width:'300px',height: '350px'}}>
    {msg.map((data)=>

    <>
     <p  style = { username === data.username ? {fontWeight:'bold',fontStyle:'italic'} : 
     {fontWeight:'bold',display:'flex',marginLeft:'160px',fontStyle:'italic'}}>
    {data.username}  
    </p>    
    <p  style = { username === data.username ? {color:'white',fontStyle:'italic',} : 
     {color:'white',marginLeft:'100px',fontStyle:'italic'}}>
    {data.message} <br/> {data.time} 
    </p>    
 
    
    </>
   
    
    )}

    </div>
    </ScrollToBottom>
    
    
    <div className='text-center'>
        <input className='p-1 rounded' value={currentMsg} type ="text" placeholder='Hey' onChange={(e)=>{setcurrentMsg(e.target.value)}} />
        <button onClick={joinChat} className=' btn btn-success'>Send</button>
    </div>
    </div>
   
    </>
  )
}

export default memo(Chat)