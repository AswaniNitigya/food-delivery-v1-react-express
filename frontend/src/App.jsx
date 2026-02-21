import React from 'react'
import { Route, Routes, useRoutes } from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import ForgotPass from './pages/ForgotPass'
import useGetCurrentUser from './hooks/useGetCurrentUser'
function App() {
  useGetCurrentUser()
  return (
    <Routes>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/forgot-password' element={<ForgotPass/>}/>
    </Routes> 
  )
}

export default App