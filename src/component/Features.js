import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../pages/Header'

export default function Features() {
    let navigate = useNavigate()
    useEffect(() => {
        const login =localStorage.getItem('auth_token');
        if(login){
            navigate('/features');
        }else{
            navigate('/login')
        }
     }, [])
    return (
        <div>
            <Header />
            <h1>features</h1>
        </div>
    )
}
