import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../pages/Header'

export default function News() {
    let navigate = useNavigate()
    useEffect(() => {
        const login =localStorage.getItem('auth_token');
        if(login){
            navigate('/news');
        }else{
            navigate('/login')
        }
     }, [])
    return (
        <div>
            <Header />
            <h1>news</h1>
        </div>
    )
}
