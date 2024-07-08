import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import SignUp from './pages/SignUp'
import ChatPage from './pages/ChatPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path='profile/:username' element={<Profile/>}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path='/chat/:receiver/:sender' element={<ChatPage />}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
