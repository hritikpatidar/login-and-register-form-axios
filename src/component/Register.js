import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import '../App.css'
import initialState from '../initialState/RegisterInitialState';
import {numberregex} from '../regex/regex'
import {emailregex} from '../regex/regex'
import {passregex} from '../regex/regex'



export default function Register() {
    //1. state/Hooks
    //const [date, setDate] = useState(new Date());
    const [user, setUser] = useState(initialState);
    const [error, setError] = useState(initialState)
    const navigate = useNavigate();
    useEffect(() => {
        const token1 = localStorage.getItem('auth_token');
        if(token1){
            navigate('/home')
        }
    })


    //2. function defination


    let handalSubmit = async (e) => {
        
        try {
            if (!user.first_name || !numberregex.test(user.first_name) || !user.email  || !emailregex.test(user.email)|| !user.password || !passregex.test(user.password) || !user.gender || !user.date_of_birth ) {
                let errors = {}

                if(!user.first_name){
                    errors.first_name = "*"
                }else if(!numberregex.test(user.first_name)){
                    errors.first_name = "Enter only alphabets"
                }

                if(!user.email){
                    errors.email = "*"
                }else if(user.email.length < 3){
                    errors.email = "Enter minimum 3 character";
                }else if(!emailregex.test(user.email)){
                    errors.email = "Please enter valid email"
                }

                if(!user.password ){
                    errors.password = "*"
                }else if (!passregex.test(user.password)){
                    errors.password = "please enter this type password (A-Z)(a-z)(0-9)"
                }

                if(!user.gender){
                    errors.gender = "*"
                }

                if(!user.date_of_birth){
                    errors.date_of_birth = "*"
                }

                setError(errors)
            }else{
                let res = await axios.post("https://myfbspike.herokuapp.com/api/register/", user)
                navigate("/login");
                //setUser(res.data);
                //console.log(res)
                if(res.status === 201){
                    swal("Good job!", "Register successfully", "success");
                }else{
                    swal("Bad Request!", "Please enter required field", "error");
                }
            }



        } catch (error) {
            //console.error(error);
            swal(error.code, error.message, "error");
        }



    }

    let handalChange = (e) => {
       let name = e.target.name;
       let value = e.target.value;

       
        // let newData = { ...user }
        let newData = { ...user, [name]: value }
        setUser({...user,[name]:value});
        // //console.log(user)

        // //console.log(newData.email)
        validation(newData,name);
    }
    let validation=(newData,name)=>{
         //now hear first name validation code
        let error = {};

        switch(name){
            case "first_name":
                if(!newData.first_name){
                    error.first_name = "*"
                }else if(newData.first_name.length <= 2){
                    error.first_name = "Enter min 3 character"
                }else if(!numberregex.test(newData.first_name)){
                    error.first_name = "Enter only alphabets"
                }else if(newData.first_name.length > 2){
                    error.first_name = ""
                }
                break;
            case "last_name":
                //now hear Last Name validation
                if(!newData.last_name){
                    error.last_name = "*"
                }
                break;
            case "email":
                //new hear email validation code 
                if(!newData.email){
                    error.email = "*"
                }else if(newData.email.length < 3){
                    error.email = "Enter minimum 3 character";
                }else if(!emailregex.test(newData.email)){
                    error.email = "Please enter valid email"
                }else if(emailregex.test(newData.email)){
                    error.email = ""
                }
                break;
            case "password":
                // now hear password validation code 
                if(!newData.password ){
                    error.password = "*"
                }else if(newData.password.length < 5 || newData.password.length >20  ){
                    error.password = "Enter min 6 and mex 20 character";
                }else if (!passregex.test(newData.password)){
                    error.password = "please enter this type password (A-Z)(a-z)(0-9)"
                }else if (passregex.test(newData.password)){
                    error.password = ""
                }
                break;
            case "gender":
                //now hear gender validation code 
                if(!newData.gender){
                    error.gender = "*"
                }
                break;
            case "date_of_birth":
                //new hear date of birth validation code
                if(!newData.date_of_birth){
                    error.date_of_birth = "*"
                }
                break;
            default:
        }
        return setError(error);
    }

    let handalLogin = (e) => {
        navigate('/login');
    }

   
    //3. return statement /jsx
    return (
        <Container >
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <h1 className="text-center mt-5 bg-primary text-white">Register form in react </h1>
                    <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
                        <Form.Label>First </Form.Label>
                        <Form.Control type="text" name="first_name" value={user?.first_name} onChange={(e) => { handalChange(e) }} placeholder="Enter your first name" />
                        <span style={{color:'red'}}>{error?.first_name}</span>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" name="last_name" value={user.last_name} onChange={(e) => { handalChange(e) }} placeholder="Enter your last name" />
                        <span style={{color:'red'}}>{error?.last_name}</span>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="text" name="email" value={user.email} onChange={(e) => { handalChange(e) }} placeholder="name@example.com" />
                        <span style={{color:'red'}}>{error?.email}</span>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" value={user.password} onChange={(e) => { handalChange(e) }} placeholder="Enter your password" />
                        <span style={{color:'red'}}>{error?.password}</span>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                        <Form.Label >Gender</Form.Label>
                        <Form.Select name="gender" value={user.gender} onChange={(e) => { handalChange(e) }}>
                            <option>Select gander....</option>
                            <option value="1">male</option>
                            <option value="2">female</option>
                        </Form.Select>
                        <span style={{color:'red'}}>{error?.gender}</span>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
                        <Form.Group controlId="duedate" >
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control type="date" name="date_of_birth" placeholder="Due date" value={user.date_of_birth} onChange={(e) => { handalChange(e) }} />
                            </Form.Group>
                        <span style={{color:'red'}}>{error?.date_of_birth}</span>
                    </Form.Group>
                    

                    <div className="d-grid gap-2 mb-3">
                        <Button variant="primary" size="lg" onClick={(e) => { handalSubmit(e) }}>
                            Submit
                        </Button>
                    </div>
                    <div className="d-grid gap-2 mb-3">
                        <Button variant="primary" size="lg" onClick={(e) => { handalLogin(e) }}>
                            Already Registered
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
