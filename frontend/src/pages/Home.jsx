import React from 'react'
import { getCookie } from '../utilities/cookie';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


function Home() {

    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);

    useEffect( ()=>{
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
            .then(()=>{
              fetch('http://localhost:3000/user/allusers/contact').then((res)=>res.json()).then((users)=>{
                setUsers(users);
                
                console.log(users);
              }).catch((error)=>{
                console.log(error);
              })
            
            })
            
        }


    },[])

  return (
    <div>

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
        {user ? <Link to={{pathname: `/profile/${user?.username.toLowerCase()}`, state: user} }> <span className='mr-2'>Welcome,</span>
          <span>{user?.username}</span></Link> : <Link to="/login">Login</Link>}
          </div>
      </div>
      <div className='flex flex-col m-2 mt-8'>
        {/* <div className='flex justify-center text-2xl font-bold'>Users</div> */}
        <div className='flex justify-center'>

          <div className='flex flex-col gap-2'>
            {users.map((u)=>{
              if(u.username !== user.username.toLowerCase()){

                return <div className='flex justify-center border-2 border-gray-500 w-96 rounded-2xl'>
                <div className='flex flex-col items-start gap-2 p-4'>
                  <div className='flex'><p>{u.username}</p></div>
                  
                </div>
              </div>
              }
            })}
          </div>
        </div>
      </div>
    </div>

    

  )
}

export default Home
