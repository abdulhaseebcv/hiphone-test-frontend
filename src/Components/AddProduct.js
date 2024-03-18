import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import axios from '../Config'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProduct = ({ setShowAddProduct }) => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [file, setFile] = useState({});
    const [imagePreview, setImagePreview] = useState(null);

    const handleAddProduct = (e) => {

        const formData = new FormData();
        formData.append('title',title)
        formData.append('price',price)
        formData.append('file',file)

        e.preventDefault();
        axios.post('/product/add',formData)
            .then((response) => {
                console.log("result ==>", response?.data);
                toast.success(response?.data?.message);
                setTitle("");
                setPrice("");
                setTimeout(() => {
                    setShowAddProduct(false)
                })
            })
            .catch((error) => {
                console.log("error ==>", error);
                toast.error(error?.response?.data?.message)
            });
    }
    const handleImageChange = (e)=>{
        console.log(e.target.files[0]);
        setFile(e.target.files[0]);
        const file = e.target.files[0];

        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setImagePreview(reader.result);
          };
          reader.readAsDataURL(file);
        }
    }
    return (
        <Container>
            <Row className='d-flex justify-content-center pt-5'>
                <Col md={6}>
                    <h1 className='text-center'>Add Product</h1>
                    <Form onSubmit={handleAddProduct}>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter product title" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupPassword">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="text" placeholder="Enter price" value={price} onChange={(e) => setPrice(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Image</Form.Label>
                            <Form.Control type="file" placeholder="Enter price" onChange={(e) => handleImageChange(e)} />
                        </Form.Group>
                        {imagePreview && <img src={imagePreview} alt="preview-image" style={{ maxHeight: '150px' }}/>}
                        <div className='text-center'>
                            <Button variant="primary" type="submit">
                                Add
                            </Button>
                        </div>
                        <div className='text-center mt-3'>
                            <Button onClick={() => setShowAddProduct(false)} variant="danger">
                                Cancel
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
            <ToastContainer />
        </Container>
    )
}

export default AddProduct