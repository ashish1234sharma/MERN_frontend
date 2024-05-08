import React, { Fragment, useEffect, useState } from 'react'
import { Avatar, Box, Paper, Typography } from '@mui/material';
import { useNavigate, useLocation } from "react-router-dom"
import { allusers } from '../../../services';
import SkeletonLoader from '../../../components/skeletonloader';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const Users = () => {
    const Navigate = useNavigate()
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const [getUsers, setGetUsers] = useState([])
    const [isLoading, setIsloading] = useState(true);
    const [pageSummaru, setPageSummary] = useState({
        currentPage: 0,
        totalPage: 0,
        numberOfData: 0,
    })

    const getAllUsers = async () => {
        await allusers(`currentPage=${queryParams.get("currentPage")}&pageSize=${queryParams.get("pageSize")}`)
            .then((response) => {
                if (response.status === 200) {
                    setGetUsers(response?.data?.data)
                    setPageSummary((state) => ({
                        ...state,
                        currentPage: response?.data?.currentPage,
                        totalPage: response?.data?.totalPage,
                        numberOfData: response?.data?.numberOfData,
                    }))
                }
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => { setIsloading(false) })
    };

    useEffect(() => {
        getAllUsers()
    }, []);

    return (
        <Fragment>
            {isLoading ?
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1, maxWidth: 450 }}>
                    {Array.from({ length: 10 }).map((_, index) => {
                        return (
                            <Box key={index}>
                                <SkeletonLoader />
                            </Box>
                        )
                    })}
                </Box>
                :
                !getUsers.length ?
                    <Fragment>
                        <Paper sx={{ maxWidth: 450 }}>
                            <Typography variant='h6' textAlign={"center"}>Users not available</Typography>
                        </Paper>
                    </Fragment>
                    :
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                        {getUsers.map((value, index) => {
                            return (
                                <Paper key={index} onClick={() => { Navigate(`/admin/user/detail?user=${value?._id}`) }} sx={{display:'flex', cursor: "pointer",alignItems:'center',justifyContent:'space-between' }}>
                                    <Box sx={{display:'flex',gap:'20px',alignItems:'center'}}>
                                    <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                                    <Typography variant='h5'>{value?.name}</Typography>
                                    </Box>
                                    <Box>
                                    <ChevronRightIcon sx={{color:'black'}}/>
                                    </Box>

                                </Paper>
                            )
                        })}
                    </Box>
            }
        </Fragment>
    )
}

export default Users
