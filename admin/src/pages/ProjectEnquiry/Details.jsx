import React, { useState } from 'react';
import PageLayout from 'layouts/PageLayout';
import { Avatar, Button, Grid, Link, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
// import axios from 'axios';

const Details = () => {
    // const { id } = useParams();
    const { state } = useLocation();
    const { item } = state;
    const [enquiry, setEnquiry] = useState(item);

    // useEffect(() => {
    //     const fetchEnquiry = async () => {
    //         try {
    //             const response = await axios.get(`/api/project-enquiries/${id}`);
    //             setEnquiry(response.data);
    //         } catch (error) {
    //             console.error('Error fetching enquiry details:', error);
    //         }
    //     };

    //     fetchEnquiry();
    // }, [id]);

    // if (!enquiry) return <p>Loading...</p>;

    return (
        <PageLayout title="Enquiry Details">
            {!enquiry ? (
                <Typography fontSize={14} sx={{ paddingX: 5 }}>
                    Loading...
                </Typography>
            ) : (
                <Grid container spacing={5} display="flex" direction="row" p={8} justifyContent="center">
                    <Grid item container alignContent="start" width="100%" xs={12} sm={12} md={7} lg={5} spacing={3}>
                        <Grid item xs={12}>
                            {/* <Typography fontSize={14}>{data?.address?.fullname?.toUpperCase()}</Typography> */}

                            <Typography fontSize={14}>Name :  {enquiry?.name} </Typography>
                            <Typography fontSize={14}>Phone : {enquiry?.contactNumber} </Typography>
                            <Typography fontSize={14}>Email : {enquiry?.email} </Typography>
                            <Typography fontSize={14}>Property Type: : {enquiry?.propertyType} </Typography>
                            <Typography fontSize={14}>BHK Preference: : {enquiry?.bhkPreference} </Typography>
                            <Typography fontSize={14}>Budget Range: : {enquiry?.budgetRange} </Typography>
                            <Typography fontSize={14}>Location Preference: : {enquiry?.locationPreference} </Typography>
                            <Typography variant='body2' py={2} fontWeight={600}>Project Details</Typography>
                            <Typography fontSize={14}>Project Name: {enquiry.projectId?.name} </Typography>
                            <Typography fontSize={14}>Location: {enquiry.projectId?.location} </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            )
            }
        </PageLayout >
    );
};

export default Details;
