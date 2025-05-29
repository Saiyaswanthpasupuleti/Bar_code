import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import LoginPage from './UiComponents/LoginPage'
import LandingPage from './UiComponents/LandingPage'
import ProtectedRoutesuse from './Protected/ProtectedRoutes'
import ProtectedRoutes from './Protected/ProtectedRoutes'
import BillPage from './UiComponents/BillPage'
function App() {
  

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/home" element={
<ProtectedRoutes>
  <LandingPage/>
</ProtectedRoutes>
        

          } />

           <Route path="/bill" element={
<ProtectedRoutes>
  <BillPage/>
</ProtectedRoutes>
        

          } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
