import { Form, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, Card, CardContent, Container, Icon, MenuItem, Select, TextField } from "@mui/material";
import { addPackage, edit } from "../service/data";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const schema = yup.object({
    name: yup.string(),
    trackingNumber: yup.string(),
    collected: yup.boolean(),
    lat: yup.number().min(1, "please enter lat"),
    lng: yup.number().min(1, "please enter lng"),
})


const PackageForm = (type) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const selectPackage = useSelector(s => s.selectPackage)
    const { register, handleSubmit, formState: { errors }, control } = useForm({ resolver: yupResolver(schema) });

    const submit = (data) => {
        if (type.type == 'add')
            dispatch(addPackage(data));
        else dispatch(edit(data));
        navigate('/all');
    }
    
    return <>
        <br />
        <Container>
            <Card style={{ width: '60vw', backgroundColor: '#ffffffad' }} color='purple' >
                <CardContent>
                    <br />
                    <form onSubmit={handleSubmit(submit)} >
                        <TextField
                            autoFocus color='secondary' defaultValue={selectPackage?.name} label='Name' {...register("name")} variant='standard' type='text' margin='dense' fullWidth />
                        <TextField
                            autoFocus color='secondary' defaultValue={selectPackage?.trackingNumber} label='Tracking Number' {...register("trackingNumber")} variant='standard' type='text' margin='dense' fullWidth />
                        <Select label='Connect' color='secondary'{...register('connect')} defaultValue={selectPackage?.connect ? selectPackage?.connect : '2'} fullWidth>
                            <MenuItem value='2' disabled > Connect</MenuItem>
                            <MenuItem value={true}> True</MenuItem>
                            <MenuItem value={false} >False</MenuItem>
                        </Select>
                        <TextField
                            autoFocus color='secondary' defaultValue={selectPackage?.lat} label='Lat' {...register("lat")} variant='standard' type='text' margin='dense' fullWidth />
                        <TextField
                            autoFocus color='secondary' defaultValue={selectPackage?.lng} label='Lng' {...register("lng")} variant='standard' type='text' margin='dense' fullWidth />
                        <Button variant="contained" type='submit'>
                            Save Changes <Icon name='save' />
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Container>

    </>
}

export default PackageForm;