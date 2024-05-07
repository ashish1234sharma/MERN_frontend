import React, { Fragment, useEffect, useState } from 'react'
import { Box, Paper, Typography } from '@mui/material';
import { useNavigate, useLocation } from "react-router-dom"
import { allcheckouts } from '../../../services';
import SkeletonLoader from '../../../components/skeletonloader';

const Checkouts = () => {
    const Navigate = useNavigate()
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const [getCheckouts, setGetCheckouts] = useState([])
    const [isLoading, setIsloading] = useState(true);
    const [pageSummaru, setPageSummary] = useState({
        currentPage: 0,
        totalPage: 0,
        numberOfData: 0,
    })

    const getAllCheckouts = async () => {
        await allcheckouts(`currentPage=${queryParams.get("currentPage")}&pageSize=${queryParams.get("pageSize")}`)
            .then((response) => {
                if (response.status === 200) {
                    setGetCheckouts(response?.data?.data)
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
        getAllCheckouts()
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
                !getCheckouts.length ?
                    <Fragment>
                        <Paper sx={{ maxWidth: 450 }}>
                            <Typography variant='h6' textAlign={"center"}>Checkouts not available</Typography>
                        </Paper>
                    </Fragment>
                    :
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, maxWidth: 450 }}>
                        {getCheckouts.map((value, index) => {
                            return (
                                <Paper key={index} onClick={() => { Navigate(`/admin/product/checkout/detail?checkout=${value?._id}`) }} sx={{ cursor: "pointer" }}>

                                </Paper>
                            )
                        })}
                    </Box>
            }
        </Fragment>
    )
}

export default Checkouts
