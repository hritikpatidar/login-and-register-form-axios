import axios from 'axios'
import React from 'react'
import { Button, Container, Nav, Navbar, NavLink } from 'react-bootstrap'
import {  useNavigate } from 'react-router-dom'
import swal from 'sweetalert'



export default function Header() {
    //1. state
    const navigate = useNavigate()
    //2. function defination
    let hendalLogout =async(e)=>{
        //localStorage.removeItem('auth_token')
        //navigate('/login')
        let token1 = localStorage.getItem("auth_token")
        try {
            let res = await axios.get("https://myfbspike.herokuapp.com/api/logout/",{
                headers:{ Authorization :`token ${token1}`}
            })
            
            //console.log(res);
            if(res.status === 200){
                swal(res.statusText, res.data.detail, "success");
                localStorage.removeItem("auth_token")
                navigate("/login");
            }
        } catch (error) {
            //console.log(error.response.statusText)
            swal(error.response.statusText, error.message, "error");
        }
    }

    //3. return 
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">Patidar-Project</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink href="/home">Home</NavLink>
                        <NavLink href="/news">News</NavLink>
                        <NavLink href="/sport">Sports</NavLink>
                        <NavLink href="/features">features</NavLink>
                        <NavLink href="/about">About</NavLink>
                        <NavLink href="/contact">Contect</NavLink>
                    </Nav>
                   <Button onClick={(e)=>{ hendalLogout(e) }}>logout</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
