import axios from 'axios'
import React from 'react'
import { Button, Container, Nav, Navbar} from 'react-bootstrap'
import {  Link, useNavigate } from 'react-router-dom'
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
                    <Nav className="me-auto" >
                        <Link to="/home" className="me-3 ms-5 text-white text-decoration-none">Home</Link>
                        <Link to="/news" className="me-3 text-white text-decoration-none">News</Link>
                        <Link to="/sport" className="me-3 text-white text-decoration-none">Sports</Link>
                        <Link to="/features" className="me-3 text-white text-decoration-none" >features</Link>
                        <Link to="/about" className="me-3 text-white text-decoration-none">About</Link>
                        <Link to="/contact" className="me-3 text-white text-decoration-none">Contect</Link>
                    </Nav>
                   <Button onClick={(e)=>{ hendalLogout(e) }}>logout</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
