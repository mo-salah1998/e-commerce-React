import React,{useState,useEffect} from "react";
//import Products from "./components/products/products";
//import Navbar from "./components/navbar/Navbar" ;
//import {cart} from './components/Cart/cart';

import {Products, Navbar,Cart} from "./components";
import {commerce} from './lib/commerce';


const App = () => {
    const [products, setProducts]  = useState([]);
    const [cart, setCart] = useState([]);

    const fetchProducts = async () =>{
        const {data} = await commerce.products.list();

        setProducts(data);
    }

    const fetchCart = async () =>{
        const cart = await commerce.cart.retrieve();
        setCart(cart);
    }


    useEffect(()=>{
        fetchProducts();
        fetchCart();
    },[]);

    console.log(cart);
    const handleAddToCart = async(productId,quantity) =>{
        const item = await commerce.cart.add(productId,quantity);
        setCart(item);
    }
    return (<div>
              <Navbar totalItems={cart.total_items}/>
            {/* <Products products={products} onAddToCart={handleAddToCart}/>*/}
            <Cart cart={cart}/>
            </div>
    );
};

export default App;
