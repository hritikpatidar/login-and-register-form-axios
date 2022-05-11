import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../pages/Header'

export default function Sport() {
    let navigate = useNavigate()
    useEffect(() => {
        const login =localStorage.getItem('auth_token');
        if(login){
            navigate('/sport');
        }else{
            navigate('/login')
        }
     }, [])
    return (
        <div>
            <Header />
            <h1>sports</h1>
        </div>
    )
}
