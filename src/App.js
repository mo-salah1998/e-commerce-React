import React, {useState, useEffect} from "react";
//import Products from "./components/products/products";
//import Navbar from "./components/navbar/Navbar" ;
//import {cart} from './components/Cart/cart';

import {Products, Navbar, Cart} from "./components";
import {commerce} from './lib/commerce';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


const App = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    const fetchProducts = async () => {
        const {data} = await commerce.products.list();

        setProducts(data);
    }

    const fetchCart = async () => {
        const cart = await commerce.cart.retrieve();
        setCart(cart);
    }


    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);

    //console.log(cart);

    //---------------------- cart manip -------------------------//
    const handleAddToCart = async (productId, quantity) => {
        const item = await commerce.cart.add(productId, quantity);
        setCart(item);
    }

    const handleUpdateCartQte = async (productId, quantity) => {
        const {cart} = await commerce.cart.update(productId, {quantity});
        setCart(cart);
    }

    const handleRemoveFromCart = async (productId) => {
        const {cart} = await commerce.cart.remove(productId);
        setCart(cart);
    }

    const handleEmptyCart = async () => {
        const {cart} = await commerce.cart.empty();
        setCart(cart);
    }
    //------------------- end cart manip ----------------------//
    return (
        <Router>
            <div>
                <Navbar totalItems={cart.total_items}/>
                <Switch>
                    <Route exact path="/" >
                        <Products products={products}
                                  onAddToCart={handleAddToCart}
                        />
                    </Route>
                    <Route exact path="/cart" >
                        <Cart cart={cart}
                              handleRemoveFromCart  ={handleRemoveFromCart}
                              handleEmptyCart   = {handleEmptyCart }
                              handleUpdateCartQte = {handleUpdateCartQte}/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};

export default App;
