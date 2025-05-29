import React, { useEffect } from 'react'
import { login,logout } from '../Redux/Reducer';
import {useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
     const handleLogin = () => {
    dispatch(login(true));
   
    localStorage.setItem('isLoggedIn', 'true');
    navigate('/home');
  };

     useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
      navigate('/home');
    }
  }, [navigate]);
  return (
    <>
    <button onClick={handleLogin} className='btn btn-primary'>Login</button>
    {/* <button className='btn btn-primary' onClick={()=>dispatch(logout())}>Logout</button> */}

    </>
  )
}
