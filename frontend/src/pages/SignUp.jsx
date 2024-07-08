import React from 'react'
import { useNavigate } from 'react-router';


function SignUp() {
    const navigate = useNavigate();
    async function signup(){
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const response = await fetch('http://localhost:3000/user/signup',{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify({username,email,password}),
        }).then((res)=>res.json())
        .then((data)=>{
            console.log("hi");
            console.log(data);
        }).catch((err)=>{
            console.log(err);
        })

        if(response.status === 200){
            navigate('/login');
        }
    }

  return (
    <div className='p-2 m-2'>
        <h1 className='text-2xl font-bold flex justify-center'>SignUp</h1>
      <form className='flex flex-col gap-2'>
        <label htmlFor="username">Username</label>
        <input type="text" id='username' name='username' className='border-2 border-gray-400 w-40'/><br />
        <label htmlFor="email">Email</label>
        <input type="text" id='email' name='email' className='border-2 border-gray-400 w-40'/><br />
        <label htmlFor="password">Password</label>
        <input type="password" id='password' name='password' className='border-2 border-gray-400 w-40' />
      </form>
      <button className='bg-blue-600 mt-4 p-2 rounded-xl' onClick={signup}>SignUp</button>
    </div>
  )
}

export default SignUp
