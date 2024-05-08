import React, { Fragment, useEffect, useState } from 'react'
import { Box, IconButton, Paper, Typography, useTheme } from '@mui/material';
import { ArrowBackRounded } from '@mui/icons-material';
import { useNavigate, useLocation } from "react-router-dom"
import { checkoutbyid } from '../../../services'
import SkeletonLoader from '../../../components/skeletonloader';

const CheckoutDetail = () => {
    const { palette: { text } } = useTheme()
    const Navigate = useNavigate()
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const [getCheckout, setGetCheckout] = useState([])
    const [isLoading, setIsloading] = useState(true);
    var arr=[1,2,3,4]

    useEffect(() => {
        (async () => {
            await checkoutbyid(queryParams.get("checkout"))
                .then((response) => {
                    if (response.status === 200) {
                        setGetCheckout(response?.data)
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
                .finally(() => { setIsloading(false) })
        })()
    }, []);

    return (
        <Fragment>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, }}>
                <IconButton onClick={() => { Navigate(-1) }} sx={{ color: text.black }}>
                    <ArrowBackRounded />
                </IconButton>
                <Typography variant='h5'>Go Back</Typography>
            </Box>
            {isLoading ?
                <Fragment>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, maxWidth: 450 }}>
                        {Array.from({ length: 10 }).map((_, index) => {
                            return (
                                <Box key={index}>
                                    <SkeletonLoader />
                                </Box>
                            )
                        })}
                    </Box>
                </Fragment>
                :
                !getCheckout ?
                    <Fragment>
                        <Paper sx={{ maxWidth: 450 }}>
                            <Typography variant='h6' textAlign={"center"}>User not available</Typography>
                        </Paper>
                    </Fragment>
                    :
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, maxWidth: 450 }}>
                        <Paper>
                            <Box>
                                <Typography variant='h5'>Order No. -: {getCheckout?.checkout_id}</Typography>
                            </Box>
                            <Box style={{display:'flex',flexDirection:'column',gap:'10px',marginTop:'20px'}}>
                            <Typography sx={{marginTop:'20px'}} variant='h6'>Username -:  {getCheckout?.user_id.name}</Typography>
                            <Typography sx={{marginTop:'20px'}} variant='h6'>Payment Mode -:  {getCheckout?.payment_mode}</Typography>
                            <Typography sx={{marginTop:'20px'}} variant='h6'>Payment Status -:  {getCheckout?.payment_status}</Typography>
                         
                            </Box>
                            <Typography sx={{marginTop:'20px',color:'green'}} variant='h4'>Total -: Rs {getCheckout?.amount} /-</Typography>
                        </Paper>
                    </Box>
            }
        </Fragment>
    )
}

export default CheckoutDetail
