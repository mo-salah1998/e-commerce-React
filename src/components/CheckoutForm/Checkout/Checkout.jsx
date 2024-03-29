import React, {useState, useEffect} from 'react';
import {Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button,CssBaseline} from "@material-ui/core";
import useStyles from './styles';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import {commerce} from '../../../lib/commerce'

const steps = ['Shipping address', 'Payment details'];
const Checkout = ({cart, order, onCaptureCheckout, error}) => {

    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setshippingData] = useState({});
    const classes = useStyles();

    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'});
                console.log(token);
                setCheckoutToken(token);

            } catch (error) {

            }
        }
        generateToken();
    }, []);

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const next = (data) => {
        setshippingData(data);
        nextStep();
    }

    const Confirmation = () => (
        <div>
            <p>Confirmation</p>
        </div>
    );

    const Form = () => activeStep === 0
        ? <AddressForm checkoutToken={checkoutToken} next={next}/>
        : <PaymentForm ShippingData={shippingData} checkoutToken={checkoutToken} backStep={backStep}
                       onCaptureCheckout={onCaptureCheckout} nextStep={nextStep}/>

    return (
        <>
            <CssBaseline/>
            <div className={classes.toolbar}>/>
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Typography variant="h4" align="center">Checkout</Typography>
                        <Stepper activeStep={activeStep} className={classes.stepper}>
                            {steps.map((step) => (
                                <Step key={step}>
                                    <StepLabel>{step}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        {activeStep === steps.length
                            ? <Confirmation/>
                            : checkoutToken && <Form shippingData={shippingData}/>

                        }
                    </Paper>
                </main>
            </div>
        </>
    );

}
export default Checkout;
