import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Home() {
    let navigate = useNavigate()
    let logOut=(e)=>{
        localStorage.removeItem("auth_token");
        navigate('/login')
    }
    return (
        <div>
            <h1>Home page</h1>
            <button onClick={(e)=>{ logOut() }}>logout</button>
        </div>
    )
}
