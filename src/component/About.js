import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../pages/Header'

export default function About() {
    let navigate = useNavigate()
    useEffect(() => {
        const login =localStorage.getItem('auth_token');
        if(login){
            navigate('/about');
        }else{
            navigate('/login');
        }
     }, [])
    return (
        <div>
            <Header />
            <h1>About</h1>
        </div>
    )
}
