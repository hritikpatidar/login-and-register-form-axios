import React, {  useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import initialState from '../initialState/LoginInitialState';
import {emailregex} from "../regex/regex"
import {passregex} from "../regex/regex"




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
    })

    //2. function defination
    let handalLogin= async ()=>{
        
        try {
            if(!login.email || login.email.length < 3 || !emailregex.test(login.email) || !login.password || !passregex.test(login.password)){
            
            let errors= {}

            if(!login.email ){
                errors.email = "*"
            }else if(login.email.length < 3){
                errors.email = "Enter minimum 3 character";
            }else if(!emailregex.test(login.email)){
                errors.email = "Email does not valid"
            }

            if(!login.password){
                errors.password = "*"
            }else if (!passregex.test(login.password)){
                errors.password = "please enter this type password (A-Z)(a-z)(0-9)"
            }
                
            setError(errors)
              
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
            swal(error.code, error.response.data.detail, "error");
        }
        //navigate("/home");

        //console.log(tokan.data.auth_token);
        

    }

    let handalChange=(e)=>{
        let name = e.target.name
        let value = e.target.value
        let newData = { ...login, [name]: value }
        setLogin({
            ...login,
            [name]:value
        })
        validation(newData,name);
    }


    console.log()
    let validation= (newData,name)=>{
        let error = {};
        switch (name){
            case "email" :
                if(!newData.email ){
                    error.email = "*"
                }else if(newData.email.length < 3){
                    error.email = "Enter minimum 3 character";
                }else if(!emailregex.test(newData.email)){
                    error.email = "Email does not valid"
                }else if(emailregex.test(newData.email)){
                    error.email = ""
                }
                break;
            case "password" :
                if(!newData.password){
                    error.password = "*"
                }else if(newData.password.length < 6 || newData.password.length >20  ){
                    error.password = "Enter min 6 and mex 20 character";
                }else if (!passregex.test(newData.password)){
                    error.password = "please enter this type password (A-Z)(a-z)(0-9)"
                }else if (passregex.test(newData.password)){
                    error.password = ""
                }
                break;
                default :
        }
        return setError(error);
    }
   

    let handalRegister = (e)=>{
        navigate('/');
    }
    
    console.log(error)
    //3. return statement /jsx
    return (
        
        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <Form>
                        <h1 className="text-center mt-5 bg-primary text-white">Login form in react </h1>
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
