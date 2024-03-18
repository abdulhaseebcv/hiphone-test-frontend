import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import axios from '../Config'

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const getProducts = () => {
        axios.get('/product')
            .then((response) => {
                console.log("result ==>", response?.data);
                setProducts(response.data.result)
            })
            .catch((error) => {
                console.log("error ==>", error);
            });
    }

    useEffect(() => {
        getProducts();
    }, []);
    return (
        <Table striped="columns" border={'1px solid'} className='mt-4'>
            <thead>
                <tr>
                    <td>No:</td>
                    <th>Product Title</th>
                    <th>Product Price</th>
                </tr>
            </thead>
            <tbody>
                {products.map((item, index) => (
                    <tr key={item._id}>
                        <td>{index + 1}</td>
                        <td><img src={`${process.env.REACT_APP_API_URL}uploads/${item?.imageURL}`} alt={item?.title} style={{ maxWidth: '100px' }} /></td>
                        <td>{item?.title}</td>
                        <td>{item?.price}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

export default ProductList