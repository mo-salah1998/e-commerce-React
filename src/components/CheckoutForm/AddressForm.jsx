import React,{useState,useEffect} from 'react';
import {InputLabel , Select , MenuItem , Button , Grid , Typography} from "@material-ui/core";
import {useForm , FormProvider} from 'react-hook-form';
import FormInput from './CustomTextField';
import {commerce} from '../../lib/commerce';
import {Link} from 'react-router-dom'

const AddressForm = ({checkoutToken, next}) => {
    ///******
    const [ShippingCountries, setShippingCountries]= useState([]);
    const [ShippingCountry,setShippingCountry]=useState('');

    const [ShippingSubdivisions, setShippingSubdivisions]= useState([]);
    const [ShippingSubdivision, setShippingSubdivision]=useState('');

    const [ShippingOptions, setShippingOptions]= useState([]);
    const [ShippingOption,setShippingOption] = useState('');
    ///////
    const method = useForm();
    ///------------------ for looping ------------------///

    const countries = Object.entries(ShippingCountries).map(([code , name]) =>({ id:code, label:name}));
    const subdivisions = Object.entries(ShippingSubdivisions).map(([code , name]) =>({ id:code, label:name}));
    const options = ShippingOptions.map((sO)=>({id:sO.id,label:`${sO.description} - (${sO.price.formatted_with_symbol})`}));

    ///--------------- end for looping ----------------///
    const fetchShippingCountries = async (checkoutTokenId) => {
        const {countries} = await commerce.services.localeListShippingCountries(checkoutTokenId);
        //console.log(countries);
        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0])

    }

    const fetchSubdivisions = async (countryCode)=>{
        const {subdivisions} = await commerce.services.localeListSubdivisions(countryCode);
        setShippingSubdivisions(subdivisions);
        setShippingSubdivision(Object.keys(subdivisions)[0]);
    }

    const fetchShippingOptions = async (checkoutTokenId , country , region=null )=>{
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, {country,region});
        setShippingOptions(options)
        setShippingOption(options[0].id)
    }

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id);
    },[]);

    useEffect(() => {
        if (ShippingCountry) fetchSubdivisions(ShippingCountry);
    },[ShippingCountry]);

    useEffect(() => {
        if (ShippingSubdivision) fetchShippingOptions(checkoutToken.id, ShippingCountry, ShippingSubdivision);
    },[ShippingSubdivision]);


    return (
        <>
          <Typography variant="h6" gutterBottom>Shipping Address</Typography>
            <FormProvider {... method}>
                <form onSubmit={method.handleSubmit((data)=>next({... data , ShippingCountry , ShippingSubdivision,ShippingOption}))}>
                    <Grid container spacing={3}>
                        <FormInput required name="firstName" label="First Name"/>
                        <FormInput required name="lastName" label="lastName"/>
                        <FormInput required name="address" label="Address"/>
                        <FormInput required name="email" label="Email"/>
                        <FormInput required name="City" label="City"/>
                        <FormInput required name="ZIP" label="ZIP / POSTAL CODE"/>
                         <Grid item xs={12} sm={6}>
                            <InputLabel> Shipping Contry </InputLabel>
                            <Select value={ShippingCountry} fullWidth onChange={(e)=>setShippingCountry(e.target.value)}>
                                {countries.map((country)=>(
                                    <MenuItem key={country.id} value={country.id}>
                                        {country.label}
                                    </MenuItem>
                                ))}

                            </Select>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <InputLabel> Shipping Subdivision </InputLabel>
                            <Select value={ShippingSubdivision} fullWidth onChange={(e)=>setShippingSubdivision(e.target.value)}>
                                {subdivisions.map((subdivision)=>(
                                    <MenuItem key={subdivision.id} value={subdivision.id}>
                                        {subdivision.label}
                                    </MenuItem>
                                ))}

                            </Select>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <InputLabel> Shipping Option </InputLabel>
                            <Select value={ShippingOption} fullWidth onChange={(e)=>setShippingOption(e.target.value)}>
                                {options.map((option)=>(
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                    </Grid>
                    <br />
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                        <Button component={Link} to="/cart" variant={"outlined"}> Back to Card </Button>
                        <Button type="submit" variant={"contained"} color="primary"> Next </Button>

                    </div>
                </form>
            </FormProvider>
        </>
    );
};

export default AddressForm;
