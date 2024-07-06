import React from 'react'
import { getCookie } from '../utilities/cookie';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


function Home() {

    const [user, setUser] = useState(null);

    useEffect(()=>{
        const token = getCookie('token');
        // console.log("hi" +token);
        if(token){
            fetch(`http://localhost:3000/user/${token}`).then((res)=>res.json())
            .then((user)=>{
                setUser(user);
                console.log(user);
            }).catch((error)=>{
                console.log(error);
            })
        }
    },[])

  return (
    <div className='p-2 px-4 m-2 flex border-2 border-black bg-blue-400 rounded-2xl '>
      <div className='flex gap-x-96 flex-grow'>

      <div className='text-xl'>ChatKro</div>
      <div className='flex justify-evenly flex-grow'>
        <div>Blog</div>
        <div>Contact</div>
        <div>About Us</div>
      </div>
      </div>
      <div className='font-bold ml-auto'>
      {user ? <h1 > <span className='mr-2'>Welcome,</span>
        <span>{user?.username}</span></h1> : <Link to="/login">Login</Link>}
        </div>
    </div>
  )
}

export default Home
