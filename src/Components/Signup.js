import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import axios from '../Config'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error('Email and Password Required')
        } else {
            axios.post('/user/register', {
                email,
                password
            })
                .then((response) => {
                    console.log("result ==>", response?.data);
                    toast.success(response?.data?.message)
                    setTimeout(() => {
                        navigate('/login')
                    },1000)
                })
                .catch((error) => {
                    console.log("error ==>", error);
                    toast.error(error?.response?.data?.message)
                });
        }


    }
    return (
        <Container>
            <Row className='d-flex justify-content-center pt-5'>
                <Col md={6}>
                    <h1 className='text-center'>Register</h1>
                    <Form onSubmit={handleRegister}>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        <div className='text-center'>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </div>
                    </Form>
                </Col>
                <Link to='/login'>Go to Login</Link>
            </Row>
            <ToastContainer />
        </Container>
    )
}

export default Signup