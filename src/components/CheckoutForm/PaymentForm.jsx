import React from 'react';
import {Typography, Button, Divider} from '@material-ui/core';
import {Elements, CardElement, ElementsConsumer} from '@stripe/react-stripe-js' ;
import {loadStripe} from "@stripe/stripe-js";
import Review from './Review'

const stripePromise = loadStripe('pk_test_51I4RZtFM65ZAImMvfyIrGOSRiQHRUa0fOPYej0KOdoRKGHi1eBepdUuLDe8FEjt7dwtwrtz44TEs6UvzyYttSRoQ00ZcfAUQGy');

const PaymentForm = ({checkoutToken, backStep,shippingData,onCaptureCheckout,nextStep}) => {
    const handleSubmit = async (event, elements, stripe) => {
        //pour que notre site ne refraiche pas lors du clique du button
        event.preventDefault();


        if (!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);

        const {error, paymentMethod} = await stripe.createPaymentMethod({type: 'card', card: cardElement});
        if (error) {
            console.log(error);

        } else {
            const order = {
                line_items: checkoutToken.live.line_items,
                customer: {
                    firstname: shippingData.firstname,
                    lastname: shippingData.lastname,
                    email: shippingData.email
                },
                shopping: {
                    name: 'primary',
                    street: shippingData.address1,
                    town_city: shippingData.city,
                    country_state: shippingData.shippingSubdivision,
                    postal_code: shippingData.zip,
                    country:shippingData.shippingCountry
                },fulfillment:{shipping_method:shippingData.shippingOption},
                payment : {geteway : 'stripe',
                    stripe:{payment_method_id : paymentMethod.id}
                }
            }
            onCaptureCheckout(checkoutToken.id,order);
            nextStep();
        }
    }

    return (
        <>
            <Review checkoutToken={checkoutToken}/>
            <Divider/>
            <Typography variant="h6" gutterBottom style={{margin: '20px 0'}}>Payment Methode </Typography>
            <Elements stripe={stripePromise}>
                <ElementsConsumer>
                    {({elements, stripe}) => (
                        <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
                            <CardElement/>
                            <br/>
                            <br/>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <Button variant="outlined" onClick={backStep}> Back </Button>
                                <Button type="submit" variant="contained" disabled={!stripe}
                                        color="primary"> Pay {checkoutToken.live.subtotal.formatted_with_symbol} </Button>
                            </div>
                        </form>
                    )}
                </ElementsConsumer>
            </Elements>
        </>
    );
};

export default PaymentForm;
