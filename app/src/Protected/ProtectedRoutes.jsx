import React, { useEffect } from 'react'
import {useSelector} from 'react-redux'
import { useNavigate,Navigate } from 'react-router-dom';
function ProtectedRoutes({children}) {
    const navigate = useNavigate();
    const auth= useSelector((state) => state.app.isLoggedIn);
    // useEffect(()=>{
    //     if(!auth){
    //         navigate('/login');
    //     }

    // },[auth])
let isLoggedIn = localStorage.getItem("isLoggedIn");
    if(!isLoggedIn){
        return <Navigate to="/" replace />;
    }
    
    return children;
  
 
}

export default ProtectedRoutes