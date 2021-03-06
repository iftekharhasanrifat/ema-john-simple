import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif'

const Review = () => {
    const [cart,setCart]=useState([]);
    const [orderPlaced,setOrderPlaced] = useState(false);
    const handlePlaceOrder =()=>{
        setCart([]);
        setOrderPlaced(true);
        processOrder();
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
        const count = Object.values(savedCart);
        console.log(count);
        const cartProducts = productkeys.map(key=>{
            const product = fakeData.find(pd=>pd.key===key);
            product.quantity = savedCart[key];
            return product;
        })
        setCart(cartProducts);
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
                    <button onClick={handlePlaceOrder} className="main-button">Place Order</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;