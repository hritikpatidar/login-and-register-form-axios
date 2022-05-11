import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../pages/Header'

export default function Contact() {
    let navigate = useNavigate()
    useEffect(() => {
        const login =localStorage.getItem('auth_token');
        if(login){
            navigate('/contact');
        }else{
            navigate('/login')
        }
     }, [])
    return (
        <div>
            <Header />
            <h1>Contact</h1>
        </div>
    )
}
