import React, { Fragment, useEffect, useState } from 'react'
import { Button, CircularProgress, FormControl, Grid, InputLabel, OutlinedInput, Paper, Typography } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom';
import { updateproductbyid, productbyid } from '../../../services';
import { percentage } from '../../../utils/percentage'
import ThumbnailsPicker from '../../../components/thumbnailspicker';

const UpdateProduct = () => {
    const naviagte = useNavigate();
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const [isLoading, setIsLoading] = useState(false);
    const [value, setValue] = useState({
        title: "",
        description: "",
        category: "",
        actual_price: "",
        sale_price: "",
        discount_price: "",
        discount_percent: "",
        isDiscount: false,
        authour: "",
        publishedAt: "",
        manufacturedAt: "",
        publishedby: "",
        thumbnails: [],
    });

    const handleInput = (event) => {
        setValue({ ...value, [event?.target?.name]: event?.target?.value })
    };

    const onUpdate = () => {
        setIsLoading(true)
        updateproductbyid(queryParams.get("_productid"), {
            title: value?.title,
            description: value?.description,
            category: value?.category,
            actual_price: value?.actual_price,
            sale_price: value?.sale_price,
            discount_price: value?.discount_price,
            discount_percent: value?.discount_percent,
            isDiscount: value?.discount_percent > 0,
            authour: value?.authour,
            publishedAt: value?.publishedAt,
            manufacturedAt: value?.manufacturedAt,
            publishedby: value?.publishedby,
            thumbnails: value?.thumbnails,
        })
            .then((response) => {
                if (response.status === 201) {
                    naviagte('/admin/products?currentPage=1&pageSize=20')
                }
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    useEffect(() => {
        (async () => {
            productbyid(queryParams.get("_productid"))
                .then((response) => {
                    if (response?.status === 200) {
                        setValue({ ...value, ...response?.data })
                    }
                })
                .catch((error) => { console.log(error) })
        })()
    }, [])
    return (
        <Fragment>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={4} md={6} lg={5} xl={5}>
                    <Typography variant='h6'>Title, Description, Category</Typography>
                </Grid>
                <Grid item xs={12} sm={8} md={6} lg={7} xl={7}>
                    <Paper sx={{ display: "flex", flexDirection: "column", gap: 1.5, p: 2 }}>
                        <FormControl fullWidth error={false} >
                            <InputLabel>Title *</InputLabel>
                            <OutlinedInput
                                onChange={(event) => handleInput(event)}
                                value={value?.title}
                                label="Title"
                                name="title"
                            />
                        </FormControl>
                        <FormControl fullWidth error={false} >
                            <InputLabel>Description *</InputLabel>
                            <OutlinedInput
                                onChange={(event) => handleInput(event)}
                                value={value?.description}
                                label="Description"
                                name="description"
                            />
                        </FormControl>
                        <FormControl fullWidth error={false} >
                            <InputLabel>Category *</InputLabel>
                            <OutlinedInput
                                onChange={(event) => handleInput(event)}
                                value={value?.category}
                                label="Category"
                                name="category"
                            />
                        </FormControl>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={4} md={6} lg={5} xl={5}>
                    <Typography variant='h6'>Priceing, Discount</Typography>
                </Grid>
                <Grid item xs={12} sm={8} md={6} lg={7} xl={7}>
                    <Paper sx={{ display: "flex", flexDirection: "column", gap: 1.5, p: 2 }}>
                        <FormControl fullWidth error={false} >
                            <InputLabel>Actual Price *</InputLabel>
                            <OutlinedInput
                                onChange={(event) => handleInput(event)}
                                value={value?.actual_price}
                                inputMode="numeric"
                                label="Actual Price"
                                name="actual_price"
                                inputProps={{
                                    maxLength: 5
                                }}
                                onInput={(event) => {
                                    const target = event?.target;
                                    target.value = event?.target?.value.replace(/[^0-9]/g, "");
                                }}
                            />
                        </FormControl>
                        <FormControl fullWidth error={false} >
                            <InputLabel>Sale Price</InputLabel>
                            <OutlinedInput
                                onChange={(event) => handleInput(event)}
                                value={value?.sale_price}
                                inputMode="numeric"
                                label="Sale Price"
                                name="sale_price"
                                inputProps={{
                                    maxLength: 5
                                }}
                                onInput={(event) => {
                                    const target = event?.target;
                                    target.value = event?.target?.value.replace(/[^0-9]/g, "");
                                }}
                            />
                        </FormControl>

                        <FormControl fullWidth error={false} >
                            <InputLabel>Discount Percent *</InputLabel>
                            <OutlinedInput
                                onChange={(event) => handleInput(event)}
                                value={value?.discount_percent}
                                inputMode="numeric"
                                label="Discount Percent"
                                name="discount_percent"
                                inputProps={{
                                    maxLength: 3
                                }}
                                onInput={(event) => {
                                    const target = event?.target;
                                    target.value = event?.target?.value.replace(/[^0-9]/g, "");
                                }}
                            />
                        </FormControl>
                        <FormControl fullWidth error={false} >
                            <InputLabel>Discount Price</InputLabel>
                            <OutlinedInput
                                onChange={(event) => handleInput(event)}
                                value={percentage(value?.discount_percent, value?.sale_price) > 0 ? percentage(value?.discount_percent, value?.sale_price) : ""}
                                inputMode="numeric"
                                label="discount_price"
                                name="discount_price"
                                inputProps={{
                                    maxLength: 5
                                }}
                                readOnly={true}
                                onInput={(event) => {
                                    const target = event?.target;
                                    target.value = event?.target?.value.replace(/[^0-9]/g, "");
                                }}
                            />
                        </FormControl>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={4} md={6} lg={5} xl={5}>
                    <Typography variant='h6'>Product Summary</Typography>
                </Grid>
                <Grid item xs={12} sm={8} md={6} lg={7} xl={7}>
                    <Paper sx={{ display: "flex", flexDirection: "column", gap: 1.5, p: 2 }}>
                        <FormControl fullWidth error={false} >
                            <InputLabel>Authour</InputLabel>
                            <OutlinedInput
                                onChange={(event) => handleInput(event)}
                                value={value?.authour}
                                label="Authour"
                                name="authour"
                            />
                        </FormControl>
                        <FormControl fullWidth error={false} >
                            <InputLabel>Published At</InputLabel>
                            <OutlinedInput
                                onChange={(event) => handleInput(event)}
                                value={value?.publishedAt}
                                label="Published At"
                                name="publishedAt"
                                type={"date"}
                                sx={{
                                    ...(!value?.publishedAt && {
                                        "input[type=date]::-webkit-datetime-edit-text": {
                                            WebkitAppearance: "none",
                                            display: "none"
                                        },
                                        "input[type=date]::-webkit-datetime-edit-month-field": {
                                            WebkitAppearance: "none",
                                            display: "none"
                                        },
                                        "input[type=date]::-webkit-datetime-edit-day-field": {
                                            WebkitAppearance: "none",
                                            display: "none"
                                        },
                                        "input[type=date]::-webkit-datetime-edit-year-field": {
                                            WebkitAppearance: "none",
                                            display: "none"
                                        },
                                    })
                                }}
                            />
                        </FormControl>
                        <FormControl fullWidth error={false} >
                            <InputLabel>Published By</InputLabel>
                            <OutlinedInput
                                onChange={(event) => handleInput(event)}
                                value={value?.publishedby}
                                label="Published By"
                                name="publishedby"
                            />
                        </FormControl>
                        <FormControl fullWidth error={false} >
                            <InputLabel>Manufactured At</InputLabel>
                            <OutlinedInput
                                onChange={(event) => handleInput(event)}
                                value={value?.manufacturedAt}
                                // value={"2024-05-30"}
                                label="Manufactured At"
                                name="manufacturedAt"
                                type={"date"}
                                sx={{
                                    ...(!value?.manufacturedAt && {
                                        "input[type=date]::-webkit-datetime-edit-text": {
                                            WebkitAppearance: "none",
                                            display: "none"
                                        },
                                        "input[type=date]::-webkit-datetime-edit-month-field": {
                                            WebkitAppearance: "none",
                                            display: "none"
                                        },
                                        "input[type=date]::-webkit-datetime-edit-day-field": {
                                            WebkitAppearance: "none",
                                            display: "none"
                                        },
                                        "input[type=date]::-webkit-datetime-edit-year-field": {
                                            WebkitAppearance: "none",
                                            display: "none"
                                        },
                                    })
                                }}
                            />
                        </FormControl>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={4} md={6} lg={5} xl={5}>
                    <Typography variant='h6'>Thumbnails</Typography>
                </Grid>
                <Grid item xs={12} sm={8} md={6} lg={7} xl={7}>
                    <ThumbnailsPicker
                        thumbnails={value?.thumbnails}
                        onThumbnails={(images) => { setValue({ ...value, thumbnails: images }) }}
                    />
                    <Button variant="contained" color="primary" size="large" disableElevation fullWidth onClick={() => { onUpdate() }}
                        disabled={(
                            !value?.title ||
                            !value?.description ||
                            !value?.category ||
                            !value?.actual_price ||
                            !value?.sale_price ||
                            (value?.title?.length < 3) ||
                            (value?.description?.length < 10) ||
                            (value?.category?.length < 3) ||
                            (Number(value?.actual_price) === 0) ||
                            (Number(value?.sale_price) === 0) ||
                            (value?.discount_price && Number(value?.discount_price) === 0) ||
                            (value?.discount_percent && Number(value?.discount_percent) === 0) ||
                            isLoading
                        )}
                        sx={{ mt: 2 }}
                    >
                        {isLoading ?
                            <CircularProgress size={18} />
                            :
                            "Update Product"
                        }
                    </Button>
                </Grid>
            </Grid>
        </Fragment>
    )
}

export default UpdateProduct
