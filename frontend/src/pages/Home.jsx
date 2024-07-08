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
                user.username = user.username.charAt(0).toUpperCase() + user.username.slice(1);
                // console.log(user);
            }).catch((error)=>{
                console.log(error);
            })
        }
    },[])

  return (
    <div className='p-2 px-4 m-2 flex justify-around border-2 border-black bg-blue-400 rounded-2xl '>
      <div className='flex lg:gap-x-96 md:gap-x-48 sm:gap-x-16 flex-grow'>

      <div className='text-xl mr-auto'>ChatKro</div>
      <div className='flex w-fit px-2 justify-evenly flex-grow'>
        <div>Blog</div>
        <div>Contact</div>
        <div>About Us</div>
      </div>
      </div>
      <div className='font-bold '>
      {user ? <Link to={{pathname: `/profile/${user?.username}`, state: user} }> <span className='mr-2'>Welcome,</span>
        <span>{user?.username}</span></Link> : <Link to="/login">Login</Link>}
        </div>
    </div>
  )
}

export default Home
