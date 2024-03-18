import React, { useEffect, useState } from 'react'
import AddProduct from '../Components/AddProduct'
import { Button, Col, Container, Row } from 'react-bootstrap'
import ProductList from '../Components/ProductList';

const HomePage = () => {
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [userRole, setUserRole] = useState('');

    const handleAddProduct = () => {
        setShowAddProduct(!showAddProduct);
    }

    useEffect(() => {
        const role = localStorage.getItem('userRole');
        setUserRole(role);
    }, []);

    return (
        showAddProduct && userRole === 'admin' ? <AddProduct setShowAddProduct={setShowAddProduct} /> : (
            <Container className='p-4'>
                <div className='text-end'>
                    {userRole === 'admin' && <Button variant="primary" onClick={handleAddProduct}>
                        Add Product
                    </Button>}
                </div>
                <Row className='d-flex justify-content-center pt-5'>
                    <Col md={8}>
                        <h1 className='text-center'>Product List</h1>
                        <ProductList />
                    </Col>
                </Row>
            </Container>
        )
    )
}

export default HomePage