import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, Paper, Button, FormControl, Grid, IconButton, InputLabel, OutlinedInput, useTheme, FormHelperText, Typography, CircularProgress, } from '@mui/material'
import { Helmet } from 'react-helmet'
import { ChevronLeftRounded } from '@mui/icons-material'
import ProfileImagePicker from '../../../components/profileimagepicker';
import { useDispatch, useSelector } from 'react-redux';
import { profileupdate } from '../../../services';
import { enqueueSnackbar } from 'notistack';
import SnackNotification from '../../../components/snackbar';
import { setCurrentUser } from '../../../store/reducer/AuthHelper';

const UpdateProfile = () => {
    const dispatch = useDispatch();
    const naviagte = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const { palette: { text } } = useTheme();
    const { currentUser } = useSelector((state) => state?.authhelper)
    const [value, setValue] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        profileImage: ""
    });

    const handleInput = (event) => {
        setValue({ ...value, [event?.target?.name]: event?.target?.value })
    };

    const handleSubmit = async (event) => {
        setIsLoading(true)
        event.preventDefault();
        profileupdate(currentUser?._id, { ...value })
            .then((response) => {
                if (response.status === 200) {
                    dispatch(setCurrentUser({ profile: response?.data?.data }))
                    enqueueSnackbar(
                        response?.data?.message,
                        {
                            variant: "success",
                            content: (key, message) => { return SnackNotification(key, message, 'success') }
                        })
                    naviagte(-1)
                }
            })
            .catch((error) => { console.log(error) })
            .finally(() => { setIsLoading(false) })
    };

    useEffect(() => {
        setValue((state) => ({
            ...state,
            firstName: currentUser?.firstName,
            lastName: currentUser?.lastName,
            email: currentUser?.email,
            mobile: String(currentUser?.mobile), //currentUser?.mobile?.toSting(),
            profileImage: currentUser?.profileImage
        }))
    }, [currentUser]);

    return (
        <Fragment>
            <Helmet>
                <title>E-Com | Profile Update</title>
            </Helmet>

            <Box sx={{ pt: 1, display: "flex", alignItems: "center" }}>
                <IconButton onClick={() => { naviagte(-1) }}>
                    <ChevronLeftRounded sx={{ color: text?.black }} />
                </IconButton>
                <Typography variant='h6'>Go Back</Typography>
            </Box>

            <Paper sx={{ maxWidth: 500, margin: '0 auto' }}>
                <Typography variant="h5" textAlign={"center"}>Update Profile</Typography>
                <ProfileImagePicker profileImage={value?.profileImage || null} onImage={(event) => { setValue({ ...value, profileImage: event }) }} />

                <Grid item xs={12} sm={12} md={6} lg={5} xl={3.5} sx={{ p: 3 }}>
                    <Box
                        sx={{
                            gap: '6px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}

                    >
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px', width: "100%", mt: 1 }}>
                            <Grid container spacing={1}>
                                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>

                                    <FormControl fullWidth error={false} >
                                        <InputLabel>First Name</InputLabel>
                                        <OutlinedInput
                                            onChange={(event) => handleInput(event)}
                                            value={value?.firstName}
                                            required
                                            label="First Name"
                                            name="firstName"
                                            autoFocus
                                            autoComplete='firstname'
                                            onInput={(e) => {
                                                const target = e?.target;
                                                target.value = e?.target?.value.replace(/[^A-Za-z]/ig, "");
                                            }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                    <FormControl fullWidth error={false} >
                                        <InputLabel>Last Name</InputLabel>
                                        <OutlinedInput
                                            onChange={(event) => handleInput(event)}
                                            value={value?.lastName}
                                            required
                                            label="Last Name"
                                            name="lastName"
                                            autoComplete='lastname'
                                            onInput={(e) => {
                                                const target = e?.target;
                                                target.value = e?.target?.value.replace(/[^A-Za-z]/ig, "");
                                            }}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <FormControl fullWidth error={!value?.email ? false : (!RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i).test(value?.email))} >
                                <InputLabel>Email Address</InputLabel>
                                <OutlinedInput
                                    onChange={(event) => handleInput(event)}
                                    value={value?.email}
                                    required
                                    label="Email Address"
                                    name="email"
                                    autoComplete='email'
                                    onInput={(event) => {
                                        const inputValue = event.target.value;
                                        if (inputValue !== "" && !/^[a-zA-Z!@#$%^&*()]+$/?.test(inputValue)) {
                                            event.target.value = inputValue.replace(/\s/g, ''); // Remove spaces
                                        }
                                    }}
                                />
                                {!value?.email ? null : (!RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i).test(value?.email)) && <FormHelperText>* Enter Valid Email</FormHelperText>}
                            </FormControl>
                            <FormControl fullWidth error={!value?.mobile ? false : value?.mobile?.length !== 10} >
                                <InputLabel>Mobile</InputLabel>
                                <OutlinedInput
                                    onChange={(event) => handleInput(event)}
                                    value={value?.mobile}
                                    required
                                    label="Mobile"
                                    name="mobile"
                                    autoComplete="mobile"
                                    inputMode="numeric"
                                    inputProps={{
                                        maxLength: 10
                                    }}
                                    onInput={(event) => {
                                        const target = event?.target;
                                        target.value = event?.target?.value.replace(/[^0-9]/g, "");
                                    }}
                                />
                                {!value?.mobile ? null : value?.mobile?.length !== 10 && <FormHelperText>* Enter 10 digit mobile</FormHelperText>}
                            </FormControl>

                            <Button
                                type="submit"
                                size="large"
                                disableElevation={true}
                                fullWidth
                                variant="contained"
                                color="primary"
                                sx={{ mt: 1, mb: 1 }}
                                disabled={
                                    (!value?.firstName || !value?.lastName || !value?.email || !value?.mobile) ||
                                    (!RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i).test(value?.email)) ||
                                    (value?.mobile?.length !== 10) ||
                                    isLoading
                                }
                            >
                                {isLoading ?
                                    <CircularProgress size={20} />
                                    :
                                    "Upadte"
                                }
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Paper>
        </Fragment>
    )
}

export default UpdateProfile
