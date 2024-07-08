import React from 'react'
import { getCookie } from '../utilities/cookie';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';


function Home() {

    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);

    useEffect( ()=>{
        const token = getCookie('token');
        // console.log("hi" +token);
        if(token){
             fetch(`http://localhost:3000/user/token/${token}`).then((res)=>res.json())
            .then((user)=>{
                setUser(user);
                // user.username = user.username.charAt(0).toUpperCase() + user.username.slice(1);
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

      <Navbar user={user}/>
      <div className='flex flex-col m-2 mt-8'>
        {/* <div className='flex justify-center text-2xl font-bold'>Users</div> */}
        <div className='flex justify-center'>

          <div className='flex flex-col gap-2'>
            {users.map((u)=>{
              if(u.username !== user.username.toLowerCase()){

                return <Link to={`/chat/${u.username}/${user.username}`} className='flex justify-center border-2 border-gray-500 w-96 rounded-2xl'>
                {/* <div className='flex flex-col items-start gap-2 p-4'> */}
                  <div className='flex text-xl p-4'><p>{u.username}</p></div>
                  
                {/* </div> */}
              </Link>
              }
            })}
          </div>
        </div>
      </div>
    </div>

    

  )
}

export default Home
