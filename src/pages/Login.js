import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';


const initialState = {
    email:"",
    password:""
}

export default function Login() {
    //1. state/Hooks
    const [login, setLogin] = useState(initialState);
    const navigate = useNavigate();

    //2. function defination
    let handalLogin= async ()=>{
        console.log(login);
        try {
            await axios.post("https://myfbspike.herokuapp.com/api/login/",login)
            .then((response)=>{

                //setUser(response.data);
                console.log("response",response);
                navigate('/home')
                localStorage.setItem("auth_token",response?.data?.auth_token);
                swal("Good job!", "login successfully", "success");    
            }).catch((err)=>{
                console.log("okokok")
                navigate('/login');
                swal("Bad Request!", "User Not Login", "error");
            })

        }catch (error) {
            console.error(error);
        }
        //navigate("/home");

        //console.log(tokan.data.auth_token);
        

    }

    let handalChange=(e)=>{
        let newData = { ...login }
        newData = { ...login, [e.target.name]: e.target.value }
        setLogin({ ...login, ...newData });
        console.log(login)
    }
    

    //3. return statement /jsx
    return (
        
        <Container>
            <Row>
                <Col>
                    <Form>
                        <h1 className="text-center mt-5">Login form in react </h1>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name="email" value={login.email} onChange={(e) => { handalChange(e)}} placeholder="name@example.com" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" value={login.password} onChange={(e) => { handalChange(e)}} placeholder="Enter your password" />
                        </Form.Group>

                        <div className="d-grid gap-2 mb-5">
                            <Button variant="primary" size="lg" onClick={ (e)=>{ handalLogin(e) } }>
                                Login
                            </Button>
                        </div>  
                    </Form>
                </Col>
            </Row>
        </Container>
        
    )
}
