import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../pages/Header'

export default function Home() {
    let navigate = useNavigate()
    useEffect(() => {
       const login =localStorage.getItem('auth_token');
       if(login){
           navigate('/home');
       }else{
           navigate('/login')
       }
    }, [])

    return (
        <> 
            <Header />
            <h1>Home</h1>
        </>
        
        
    )
}
