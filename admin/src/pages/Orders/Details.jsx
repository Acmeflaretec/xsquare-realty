import { Button, Grid, Input, Stack, Typography } from '@mui/material';
import { PropTypes } from 'prop-types';
import React from 'react'

const Details = ({ data }) => {
    const handleChange = () => {
        console.log(data);
    }
    return (
        <Grid item container spacing={2} xs={12} sm={12} md={5} lg={4}>
            <Grid item xs={12}>
                <Typography variant='body2' pb={2} fontWeight={600}>Shipping Address</Typography>
                <Typography fontSize={14}>{data?.address?.fullname?.toUpperCase()}</Typography>
                <Typography fontSize={14}>{data?.address?.type}</Typography>
                <Typography fontSize={14}>{data?.address?.address_line_1}</Typography>
                <Typography fontSize={14}>{data?.address?.address_line_2}</Typography>
                <Typography fontSize={14}>{data?.address?.area}</Typography>
                <Typography fontSize={14}>{data?.address?.emirate}</Typography>
                <Typography fontSize={14}>Phone : {data?.address?.code}  {data?.address?.mobile}</Typography>
                <Typography fontSize={14}>Email : {data?.address?.email}</Typography>
            </Grid>

            <Grid item xs={12}>
                <Typography variant='body2' pb={2} fontWeight={600}>Ordered Date</Typography>
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <Typography fontSize={14}>Date</Typography>
                    <Typography fontSize={14}>{new Date(data?.createdAt).toDateString()}</Typography>
                </Stack>
            </Grid>
            {data?.delivery_days && <Grid item xs={12}>
                <Typography variant='body2' pb={2} fontWeight={600}>Maximum Delivered Days</Typography>
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <Typography fontSize={14}>Days</Typography>
                    <Typography fontSize={14}>{data?.delivery_days}</Typography>
                </Stack>
            </Grid>}

            <Grid item xs={12}>
                <Typography variant='body2' pb={2} fontWeight={600}>Payment details</Typography>
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <Typography fontSize={14}>Payment mode</Typography>
                    <Typography fontSize={14}>{data?.payment_mode}</Typography>
                </Stack>
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <Typography fontSize={14}>Order Subtotal</Typography>
                    <Typography fontSize={14}>₹ {data?.amount}/-</Typography>
                </Stack>
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <Typography fontSize={14}>Shipping charges</Typography>
                    <Typography fontSize={14}>{data?.delivery_days === 'free' ? 'Free' : (data?.delivery_days === '1'? '18' : "12")}</Typography>
                </Stack>
                {/* <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography fontSize={14}>Tax</Typography>
                <Typography fontSize={14}>N/A</Typography>
            </Stack> */}
                <Stack direction={'row'} justifyContent={'space-between'} pt={1}>
                    <Typography fontSize={14} fontWeight={600}>Total</Typography>
                    <Typography fontSize={14} fontWeight={600}>₹ {data?.amount}/-</Typography>
                </Stack>
            </Grid>

            <Grid item xs={12} sm={4} mt={'auto'}>
                <Grid item xs={12}>
                    {/* <Button onClick={handleSubmit}>Update Product</Button> */}
                    {/* <Button color="secondary" onClick={handleDelete}>Delete Blog</Button> */}
                </Grid>
            </Grid>
        </Grid>
    )
}

Details.propTypes = {
    data: PropTypes.object.isRequired,
};
export default Details