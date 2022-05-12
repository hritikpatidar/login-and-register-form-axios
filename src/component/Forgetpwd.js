
import axios from 'axios';
import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';


const initialState = {
    email:""
    
}

export default function Forgetpwd() {
    const [forget, setForget] = useState(initialState);
    const [error, setError] = useState(initialState);

    const navigate = useNavigate();


    let handalChange=(e)=>{
        let newData = { ...forget }
        newData = { ...forget, [e.target.name]: e.target.value }
        setForget({ ...forget, ...newData });
        //console.log(login)
    }
    let handalForget =async()=>{
        //console.log(login)
        try {
            const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

            if(!forget.email || !emailregex.test(forget.email) ){
                let errors = {};
               
                if (!forget.email) {
                    errors.email = "Please enter your email"
                }else if(!emailregex.test(forget.email)) {
                    errors.email = "Email does not valid"
                }

                setError(errors);
            }else {
                const res = await axios.post('https://myfbspike.herokuapp.com/auth/password_reset',forget)
            }
            
            

        }catch (err) {
            //console.error(error);
        
        }
    }

    return (
        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <Form>
                        <h1 className="text-center mt-5 mb-4">Forget Password </h1>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" value={forget.email} onChange={(e) => { handalChange(e)}} placeholder="name@example.com" />
                            <span style={{color:"red"}}>{error?.email}</span>
                        </Form.Group>
                        
                        <div className="d-grid gap-2 mb-2">
                            <Button variant="primary" size="lg" onClick={ ()=>{ handalForget() } }>
                                Forget
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}
