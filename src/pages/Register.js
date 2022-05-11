import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import '../App.css'


var initialState = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    gender: "",
    date_of_birth: ""
}


export default function Register() {
    //1. state/Hooks
    //const [date, setDate] = useState(new Date());
    const [user, setUser] = useState(initialState);
    const [error, setError] = useState(initialState)
    const navigate = useNavigate();

    useEffect(() => {
        const login = localStorage.getItem('auth_token');
        if (login) {
            navigate('/home');
        }
    }, [])

    //2. function defination


    let handalSubmit = async (e) => {
        try {
            if (!user.first_name || !user.last_name || !user.email || !user.password || !user.gender || !user.date_of_birth) {
                let errors = {};
                const numberregex = /^[a-zA-Z]+$/;
                const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
                const passregex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
                if(!user.first_name){
                    errors.first_name = "First name is required"
                }else if (!numberregex.test(user.first_name)) {
                    errors.first_name = "enter only alphabets"
                }

                if (!user.email) {
                    errors.email = "Please enter your email"
                } else if (!emailregex.test(user.email)) {
                    errors.email = "Email does not valid "
                }

                if (!user.password) {
                    errors.password = "Please enter your password"
                } else if (user.password.length <= 2) {
                    errors.password = "please enter grater than 2 "
                } else if (!passregex.test(user.password)) {
                    errors.password = "6 to 20  numeric digit, one uppercase and one lowercase letter"
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
        }



    }

    let handalChange = (e) => {
        //console.log(e.target.value)
        //setUser(e.target.value);
        let newData = { ...user }
        newData = { ...user, [e.target.name]: e.target.value }
        setUser({ ...user, ...newData });
        //console.log(user)
    }

    let handalLogin = (e) => {
        navigate('/login');
    }

   
    //3. return statement /jsx
    return (
        <Container >
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <h1 className="text-center mt-5">Register form in react </h1>
                    <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
                        <Form.Label>First </Form.Label>
                        <Form.Control type="text" name="first_name" value={user?.first_name} onChange={(e) => { handalChange(e) }} placeholder="Enter your first name" />
                        <span style={{color:'red'}}>{error?.first_name}</span>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" name="last_name" value={user.last_name} onChange={(e) => { handalChange(e) }} placeholder="Enter your last name" />
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
                    <Form.Label >Gender</Form.Label>
                    <Form.Select className="mb-3" name="gender" value={user.gender} onChange={(e) => { handalChange(e) }}>
                        <option>Select gander....</option>
                        <option value="1">male</option>
                        <option value="2">female</option>
                    </Form.Select>
                    <Form.Group controlId="duedate" className="mb-3">
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control type="date" name="date_of_birth" placeholder="Due date" value={user.date_of_birth} onChange={(e) => { handalChange(e) }} /></Form.Group>


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
