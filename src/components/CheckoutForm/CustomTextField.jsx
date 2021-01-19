import React from 'react';
import {Grid, TextField} from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";

const FormInput = ({name, label, required}) => {

    const { control } = useForm();

    return (
        <Grid item xs={12} sm={6}>
            <Controller
                as={TextField}
                control={control}
                fullWidth
                name={name}
                label={label}
                required={required}
            />

        </Grid>
    );
}

export default FormInput;
