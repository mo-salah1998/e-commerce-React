import React from 'react';
import {Container, Typography, Button, Grid} from '@material-ui/core';
import CardItem from './CartItem/CartItem';
import useStyles from './styles';
import {Link} from 'react-router-dom';

const Cart = ({ cart ,handleRemoveFromCart , handleEmptyCart   ,handleUpdateCartQte }) => {
    const classes = useStyles();

    const EmptyCart = () => {
        return <Typography variant="subtitle1">You have no items in your shopping cart,
            <Link to="/" className={classes.link}>start adding some!</Link>
        </Typography>
    }

    const FilledCart = () => {
        return (<>
            <Grid container spacing={3}>
                {cart.line_items.map((item) => (
                    <Grid item xs={12} sm={4} key={item.id}>
                        <CardItem item={item} onRemoveFromCart={handleRemoveFromCart} onUpdateCartQte={handleUpdateCartQte} ></CardItem>
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant="h4"> Subtotal : {cart.subtotal.formatted_with_symbol}</Typography>
                <div>
                    <Button variant="contained" className={classes.emptyButton} size="large" type="button"
                            color="secondary"  onClick={handleEmptyCart}>Empty Cart</Button>
                    <Button component={Link} to="/checkout" variant="contained" className={classes.checkoutButton} size="large" type="button"
                            color="primary" >Checkout</Button>
                </div>
            </div>
        </>)

    };

    if(!cart.line_items)return 'loading ...'
    return (

        <Container>
            <div className={classes.toolbar}/>
            <Typography className={classes.title} variant="h3" gutterBottom>Your shopping cart </Typography>
            {!(cart.line_items.length) ? <EmptyCart/> : <FilledCart/>}
        </Container>
    );

}

export default Cart;