import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

function ChatPage() {
  const senderName = useParams().sender;
  const receiverName = useParams().receiver;

  const [senderObj, setSenderObj] = useState(null);
  const [receiverObj, setReceiverObj] = useState(null);
  const [messages, setMessages] = useState([]);

  function sendMessage() {
    const content = document.getElementById('content').value;
    fetch('http://localhost:3000/message/sendChat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sender: senderName,
        receiver: receiverName,
        content: content
      })
    }).then((res) => res.json()).then((message) => {
      console.log(message);
      setMessages(prevMessages => [...prevMessages, message].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)));
    }).catch((err) => {
      console.log(err);
    }).then(() => {
      document.getElementById('content').value = '';
    });
  }

  useEffect(() => {
    fetch(`http://localhost:3000/user/username/${senderName}`)
      .then((res) => res.json())
      .then((sender) => {
        setSenderObj(sender);
        console.log("sen " + sender);
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        fetch(`http://localhost:3000/user/username/${receiverName}`)
          .then((res) => res.json())
          .then((receiver) => {
            setReceiverObj(receiver);
            console.log("r " + receiver);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .then(() => {
        fetch(`http://localhost:3000/message/chat/${receiverName}/${senderName}`)
          .then((res) => res.json())
          .then((messages) => {
            setMessages(messages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)));
            console.log(messages);
          })
          .catch((err) => {
            console.log(err);
          });
      });
  }, [senderName, receiverName]);

  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar user={senderObj} />
      <div className='flex flex-col flex-grow p-2'>
        <div className='flex justify-center text-xl font-bold mb-2'>Chats With {receiverName.toUpperCase()}</div>
        <div className='flex flex-col flex-grow gap-y-4 overflow-auto mb-2'>
          {messages.map((message, index) => (
            <div key={index} className='flex gap-x-2'>
              {message.sender?.username !== senderName ? (
                <div className='bg-blue-700 w-fit rounded-2xl mr-auto text-white p-2'>
                  {message.content}
                </div>
              ) : (
                <div className='ml-auto bg-rose-200 rounded-2xl p-2'>{message.content}</div>
              )}
            </div>
          ))}
        </div>
        <div className='flex justify-center gap-4 fixed bottom-0 left-0 right-0 p-4 '>
          <input
            type='text' id='content' name='content'
            className='border-2 border-gray-400 w-96 rounded-2xl p-2'
          />
          <button className='bg-blue-600 p-2 rounded-2xl text-white' onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
