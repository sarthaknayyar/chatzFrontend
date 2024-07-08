import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '../components/Navbar';

function ChatPage() {

    const senderName = useParams().sender;
    const receiverName = useParams().receiver;

    const [senderObj, setSenderObj] = useState(null);
    const [receiverObj, setReceiverObj] = useState(null);

    const [messages, setMessages] = useState([]);

    useEffect(()=>{
        fetch(`http://localhost:3000/user/username/${senderName}`).then((res)=>res.json())
        .then((sender)=>{
            setSenderObj(sender);
            console.log("sen " +sender);
        }).catch((err)=>{
            console.log(err);
        }).then(()=>{
            fetch(`http://localhost:3000/user/username/${receiverName}`).then((res)=>res.json())
        .then((receiver)=>{
            setReceiverObj(receiver);
            console.log("r "+receiver);
        }).catch((err)=>{
            console.log(err);
        })
        }).then(()=>{
            fetch(`http://localhost:3000/message/chat/${receiverName}/${senderName}`).then((res)=>res.json())
            .then((messages)=>{
                setMessages(messages);
                console.log(messages);
            }).catch((err)=>{
                console.log(err);
            })
        })
    },[])


  return (
    <div>
      <Navbar user={senderObj}/>
      
      <div className='flex flex-col gap-y-2'>
        <div className='flex justify-center text-2xl font-bold'>Chat</div>
        <div className='flex justify-center'>
          <div className='flex flex-col flex-grow m-2 gap-y-2'>
            {messages.map((message)=>{
              return <div className='flex flex-grow gap-x-2'>
                {message.sender === senderName ? <div className='flex bg-blue-700 w-fit rounded-2xl mr-auto text-white p-2 '>{message.content}</div> : <div className='flex ml-auto bg-rose-200 rounded-2xl p-2'>{message.content}</div>}
              </div>
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatPage
