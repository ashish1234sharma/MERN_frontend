import React, { Fragment, useEffect, useState } from 'react'
import { Avatar, Box, IconButton, Paper, Typography, useTheme } from '@mui/material';
import { ArrowBackRounded } from '@mui/icons-material';
import { useNavigate, useLocation } from "react-router-dom"
import { userbyid } from '../../../services'
import SkeletonLoader from '../../../components/skeletonloader';

const UserDetail = () => {
    const { palette: { text } } = useTheme()
    const Navigate = useNavigate()
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const [getUser, setGetUser] = useState([])
    const [isLoading, setIsloading] = useState(true);

    useEffect(() => {
        (async () => {
            await userbyid(queryParams.get("user"))
                .then((response) => {
                    if (response.status === 200) {
                        setGetUser(response?.data)
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
                !getUser ?
                    <Fragment>
                        <Paper sx={{ maxWidth: 450 }}>
                            <Typography variant='h6' textAlign={"center"}>User not available</Typography>
                        </Paper>
                    </Fragment>
                    :
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, maxWidth: 450,marginTop:'20px' }}>
                        <Paper>
                           <Box style={{display:'flex',gap:'20px',alignItems:'center'}}>
                             <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                             <Typography variant='h5'>Ashish Sharma</Typography>
                           </Box>
                           <Box sx={{width:'100%',marginTop:'10px',display:'flex',flexDirection:'column',gap:'10px'}}>
                             <Box sx={{display:'flex',gap:'10px'}}>
                             <Typography variant='h5'>Email :-</Typography>
                             <Typography variant='h6'>Ashish Sharma</Typography>
                             </Box>
                             <Box sx={{display:'flex',gap:'10px'}}>
                             <Typography variant='h5'>Mobile :-</Typography>
                             <Typography variant='h6'>8109560498</Typography>
                             </Box>
                             <Box sx={{display:'flex',gap:'10px'}}>
                             <Typography variant='h5'>Username :-</Typography>
                             <Typography variant='h6'>Ashish Sharma</Typography>
                             </Box>
                             <Box sx={{display:'flex',gap:'10px'}}>
                             <Typography variant='h5'>Address :-</Typography>
                             <Typography variant='h6'>gwalior</Typography>
                             </Box>
                             <Box sx={{display:'flex',gap:'10px'}}>
                             <Typography variant='h5'>Country :-</Typography>
                             <Typography variant='h6'>India</Typography>
                             </Box>
                             <Box sx={{display:'flex',gap:'10px'}}>
                             <Typography variant='h5'>Pincode :-</Typography>
                             <Typography variant='h6'>474011</Typography>
                             </Box>
                           </Box>
                        </Paper>
                    </Box>
            }
        </Fragment>
    )
}

export default UserDetail
