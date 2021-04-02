import React, { useEffect, useState } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif'
import { useHistory } from 'react-router';

const Review = () => {
    const [cart,setCart]=useState([]);
    const [orderPlaced,setOrderPlaced] = useState(false);
    const history = useHistory();
    const handleProceedCheckout =()=>{
        history.push('/shipment');
    }
    let thankYou;
    if(orderPlaced){
        thankYou = <img src={happyImage} alt =""/>
    }
    const removeProduct=(productKey)=>{
        console.log('remove Clicked',productKey);
        const newCart = cart.filter(product=>product.key!==productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const productkeys= Object.keys(savedCart);
        
        fetch('http://localhost:5000/productsByKeys',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productkeys)
        })
        .then(res=>res.json())
        .then(data=>setCart(data))
    },[])
    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    cart.map(product=><ReviewItem removeProduct={removeProduct} key={product.key} product={product}></ReviewItem>)
                }
                {thankYou}
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handleProceedCheckout} className="main-button">Proceed Checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;