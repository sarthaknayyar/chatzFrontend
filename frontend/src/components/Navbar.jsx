import React from 'react'
import { Link } from 'react-router-dom';


function Navbar(props) {
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
        {props.user ? <Link to={{pathname: `/profile/${props.user?.username.toLowerCase()}`, state: props.user} }> <span className='mr-2'>Welcome,</span>
          <span>{props.user?.username}</span></Link> : <Link to="/login">Login</Link>}
          </div>
      </div>
  )
}

export default Navbar
