import React, { Fragment, useEffect, useState } from 'react'
import { Grid, Paper, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { PersonRounded, ShoppingCartRounded, Inventory2Rounded, ShoppingCartCheckoutRounded } from '@mui/icons-material';
import { adminsummary } from '../../../services'
import { useSelector } from 'react-redux';

const Dashboard = () => {
    const Navigate = useNavigate()
    const { currentUser } = useSelector((state) => state?.authhelper)
    const [getSummary, setgetSummary] = useState({
        totalProduct: 0,
        totalUser: 0,
        totalCheckOut: 0,
        totalUserCart: 0,
    })
    console.log("currentUser",currentUser)

    useEffect(() => {
        (async () => {
            adminsummary()
                .then((response) => {
                    setgetSummary(response.data)
                })
                .catch((error) => {
                    console.log(error)
                })
                .finally(() => {

                })
        })()
    }, []);



    const summary = [
        { _id: 1,isVisible:true, route: "/admin/products?currentPage=1&pageSize=20", name: "Products", value: getSummary?.totalProduct, icon: <Inventory2Rounded /> },
        { _id: 2,isVisible:currentUser?.user_type === 'admin', route: "/admin/users?currentPage=1&pageSize=20", name: "Users", value: getSummary?.totalUser, icon: <PersonRounded /> },
        { _id: 3,isVisible:currentUser?.user_type === 'admin', route: "/admin/product/checkouts?currentPage=1&pageSize=20", name: "Checkouts", value: getSummary?.totalCheckOut, icon: <ShoppingCartCheckoutRounded /> },
        { _id: 4,isVisible:currentUser?.user_type === 'admin', route: "", name: "User Cart", value: getSummary?.totalUserCart, icon: <ShoppingCartRounded /> },
    ]

    return (
        <Fragment>
            <Grid container spacing={2}>
                {summary.map((value, index) => {

                    return (
                        <Grid key={index} item xs={6} sm={3} md={3} lg={3} xl={3}>
                            {value?.isVisible &&                             <Paper onClick={() => { Navigate(value.route) }} sx={{ height: 200, display: "flex", flexDirection: "column", gap: 1.5, alignItems: "center", justifyContent: "center", ...(value._id !== 4 && { cursor: "pointer" }) }}>
                                {value.icon}
                                <Typography variant='h6'>{value.name}</Typography>
                                <Typography variant='h5'>{value.value}</Typography>
                            </Paper>}

                        </Grid>
                    )
                })}
            </Grid>
        </Fragment>
    )
}

export default Dashboard
