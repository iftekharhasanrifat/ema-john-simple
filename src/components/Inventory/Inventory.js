import React from 'react';
import fakeData from '../../fakeData';

const Inventory = () => {
    const product = {};
    const handleAddProduct = () => {
        fetch(`https://glacial-taiga-23149.herokuapp.com/addProduct`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })
    }
    return (
        <div>
            <form action="">
                <p><span>Name: </span><input type="text" /></p>
                <p><span>Price: </span><input type="text" /></p>
                <p><span>Quantity: </span><input type="text" /></p>
                <p><span>Upload Image</span><input type="file" /></p>
                <button onClick={handleAddProduct}>Add Product</button>
            </form>

        </div>
    );
};

export default Inventory;