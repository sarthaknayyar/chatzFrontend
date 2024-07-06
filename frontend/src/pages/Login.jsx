import React from 'react'
import { useNavigate } from 'react-router';

function Login() {
    const navigate = useNavigate();
    async function login(){
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const response = await fetch('http://localhost:3000/user/login',{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify({email,password}),
            credentials : 'include',
        });
        if(response.status === 200){
            const data = await response.json();
            console.log(data);
            navigate('/');
        }

    }

  return (
    <div className='p-4 m-4'>
      <h1 className='flex justify-center text-2xl font-bold'>Login</h1>
      <form className='flex flex-col gap-2' >
        <label htmlFor="email">Email</label>
        <input type="text" id='email' name='email' className='border-2 border-gray-400 w-40'/><br />
        <label htmlFor="password">Password</label>
        <input type="password" id='password' name='password' className='border-2 border-gray-400 w-40' />
      </form>
    <button className='mt-8 bg-blue-600 p-2 rounded-lg' onClick={login}>Login</button>
    </div>
  )
}

export default Login
