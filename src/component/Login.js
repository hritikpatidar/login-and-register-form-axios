import React, {  useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';


const initialState = {
    email:"",
    password:""
}

export default function Login() {
    //1. state/Hooks
    const [login, setLogin] = useState(initialState);
    const [error, setError] = useState(initialState)
    const navigate = useNavigate();
    useEffect(() => {
        const token1 = localStorage.getItem('auth_token');
        if(token1){
            navigate('/home')
        }
    }, [])

    //2. function defination
    let handalLogin= async ()=>{
        try {
            if(!login.email || !login.password){
                let errors = {};
                const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
                const passregex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

                if (!login.email) {
                    errors.email = "Please enter your email"
                } else if (!emailregex.test(login.email)) {
                    errors.email = "Email does not valid "
                }

                if (!login.password) {
                    errors.password = "Please enter your password"
                } else if (login.password.length <= 2) {
                    errors.password = "please enter grater than 2 "
                } else if (!passregex.test(login.password)) {
                    errors.password = "6 to 20  numeric digit, one uppercase and one lowercase letter"
                }
                setError(errors);
            }else{
                let res = await axios.post("https://myfbspike.herokuapp.com/api/login/",login)
                navigate('/home')
                localStorage.setItem("auth_token",res?.data?.auth_token);
                //console.log(res)
                if(res.status === 200){
                    swal(res.request.statusText, "login successfuly", "success");
                }
            }
            
            

        }catch (error) {
            //console.error(error);
            swal("Bad Request!", error.response.data.detail, "error");
        }
        //navigate("/home");

        //console.log(tokan.data.auth_token);
        

    }

    let handalChange=(e)=>{
        let newData = { ...login }
        newData = { ...login, [e.target.name]: e.target.value }
        setLogin({ ...login, ...newData });
        //console.log(login)
    }

    let handalRegister = (e)=>{
        navigate('/');
    }
    

    //3. return statement /jsx
    return (
        
        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <Form>
                        <h1 className="text-center mt-5">Login form in react </h1>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name="email" value={login.email} onChange={(e) => { handalChange(e)}} placeholder="name@example.com" />
                            <span style={{color:"red"}}>{error?.email}</span>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" value={login.password} onChange={(e) => { handalChange(e)}} placeholder="Enter your password" />
                            <span style={{color:"red"}}>{error?.password}</span>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>
                                <Link to="/forgetpassword">Forget Password</Link>
                            </Form.Label>
                        </Form.Group>

                        <div className="d-grid gap-2 mb-3">
                            <Button variant="primary" size="lg" onClick={ (e)=>{ handalLogin(e) } }>
                                Login
                            </Button>
                        </div>  
                        <div className="d-grid gap-2 mb-2">
                            <Button variant="primary" size="lg" onClick={ (e)=>{ handalRegister(e) } }>
                                Register Now
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
        
    )
}