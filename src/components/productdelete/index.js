import React, { Fragment, useState } from 'react'
import { Box, Button, Dialog, Grid, IconButton, Divider, useTheme, Typography, CircularProgress } from '@mui/material';
import { CloseRounded, DeleteRounded, EditRounded } from '@mui/icons-material';
import { useNavigate } from "react-router-dom"
import { deleteproduct } from '../../services';
import { enqueueSnackbar } from 'notistack';
import SnackNotification from '../snackbar';

const ProductDelete = ({ _id, isDelete, setIsDelete, isRedirect = false }) => {
    const Navigate = useNavigate()
    const { palette: { divider } } = useTheme();
    const [isLoading, setIsloading] = useState(false);

    const onDelete = () => {
        setIsloading(true)
        deleteproduct(_id)
            .then((response) => {
                if (response.status === 200) {
                    setIsDelete(false)
                    enqueueSnackbar(
                        response?.data?.message, {
                        variant: "success",
                        content: (key, message) => { return SnackNotification(key, message, 'success') }
                    })
                    if (!isRedirect) return
                    Navigate(-1)
                }
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                setIsloading(false)
            })
    };

    return (
        <Fragment>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton onClick={() => { Navigate(`/admin/products/update?_productid=${_id}`) }} color="primary" sx={{ padding: 2, width: 0, height: 0, }}>
                    <EditRounded fontSize="small" />
                </IconButton>
                <IconButton onClick={() => { setIsDelete(_id) }} color="error" sx={{ padding: 2, width: 0, height: 0, }}>
                    <DeleteRounded fontSize="small" />
                </IconButton>
            </Box>

            <Dialog
                open={Boolean(isDelete)}
                onClose={() => setIsDelete(null)}
                maxWidth={"xs"}
                sx={{
                    ".MuiDialog-paper": {
                        padding: "0px",

                    }
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 1.5 }}>
                    <Typography variant='h5' color={'error'}>Product Delete</Typography>
                    <IconButton onClick={() => { setIsDelete(null) }}>
                        <CloseRounded />
                    </IconButton>
                </Box>
                <Divider sx={{ backgroundColor: divider, width: "100%" }} />

                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "5px", p: 2 }}>
                    <Typography variant='h5' sx={{ textAlign: "center", fontWeight: 700 }}>Are you sure, You want to delete ?</Typography>
                    <Typography variant='subtitle1' sx={{ textAlign: "center", fontSize: "14px" }}>After delete you can't access this product.</Typography>
                </Box>

                <Grid container spacing={1} sx={{ p: 1.5 }}>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Button onClick={() => setIsDelete(null)} size="small" variant="contained" fullWidth color="error">No, keep it</Button>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Button onClick={() => onDelete()} size="small" variant="contained" fullWidth color="primary" disabled={isLoading} >
                            {isLoading ?
                                <CircularProgress size={18} />
                                :
                                "Yes, i'm sure"
                            }
                        </Button>
                    </Grid>
                </Grid>
            </Dialog>
        </Fragment>
    )
}

export default ProductDelete
