import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

var initialState= {
    first_name:"",
    last_name:"",
    email:"",
    password:"",
    gender:"",
    date_of_birth:""
}


export default function Register() {
    //1. state/Hooks
    //const [date, setDate] = useState(new Date());
    const [user, setUser] = useState(initialState);
    const navigate = useNavigate();

    //2. function defination
    let handalSubmit = async (e) => {
        try {
            await axios.post("https://myfbspike.herokuapp.com/api/register/",user)
            .then((response)=>{

                //setUser(response.data);
                console.log("response",response);
                navigate("/login")
                swal("Good job!", "User Register Success", "success");
            }).catch((err)=>{
                console.log("okokok");
                swal("", "User Not Register", "error");
            })
           
            //.log(response.data);
            //console.log("phle",teacher);
            //now set the data in teacher hook variable
            
      
        }catch (error) {
            console.error(error);
        }
        
      
     
    }

    let handalChange= (e) =>{
        //console.log(e.target.value)
        //setUser(e.target.value);
        let newData = { ...user }
        newData = { ...user, [e.target.name]: e.target.value }
        setUser({ ...user, ...newData });
        //console.log(user)
    }


    //3. return statement /jsx
    return (
        <Container >
            <Row>
                <Col>
                    <h1 className="text-center mt-5">Register form in react </h1>
                    <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" name="first_name" value={user.first_name} onChange={(e) => { handalChange(e)}} placeholder="Enter your first name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" name="last_name" value={user.last_name} onChange={(e) => { handalChange(e)}} placeholder="Enter your last name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name="email" value={user.email} onChange={(e) => { handalChange(e)}} placeholder="name@example.com" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" value={user.password} onChange={(e) => { handalChange(e)}} placeholder="Enter your password" />
                    </Form.Group>
                    <Form.Label >Gender</Form.Label>
                    <Form.Select className="mb-3" name="gender" value={user.gender} onChange={(e) => { handalChange(e)}}>
                        <option>Select gander....</option>
                        <option value="1">male</option>
                        <option value="2">female</option>
                    </Form.Select>
                    <Form.Group controlId="duedate" className="mb-3">
                        <Form.Label>Date of Birth</Form.Label>
                    <Form.Control type="date" name="date_of_birth" placeholder="Due date" value={user.date_of_birth} onChange={(e) => { handalChange(e)}}/></Form.Group>
                     
                    
                    <div className="d-grid gap-2 mb-5">
                        <Button variant="primary" size="lg" onClick={ (e)=>{ handalSubmit(e) } }>
                            Submit
                        </Button>
                    </div>   
                </Col>
            </Row>
        </Container>
    )
}
