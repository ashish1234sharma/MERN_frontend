import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, Stack, Grid, InputLabel, OutlinedInput, useTheme, FormHelperText, Typography, InputAdornment, IconButton, CircularProgress, } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { appicon } from '../../../assets/icon';
import { backimg } from '../../../assets/images';
import { useStyles } from './styles';
import { LocalStorageManager } from '../../../utils/localstorage';


const SignUp = () => {
    const classes = useStyles();
    const naviagte = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const { palette } = useTheme();
    const [isVisibil, setIsVisibil] = useState({ password: false, confirmpassword: false });
    const [value, setValue] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        password: "",
        confirmpassword: ""
    });

    const handleInput = (event) => {
        setValue({ ...value, [event?.target?.name]: event?.target?.value })
    };

    const handleSubmit = async (event) => {
        setIsLoading(true)
        event.preventDefault();
        LocalStorageManager.setUserInfo(value)
        naviagte("/auth/signup/verify")
    };

    useEffect(() => {
        setValue((state) => ({
            ...state,
            ...LocalStorageManager.getUserInfo()
        }))
    }, [])
    return (
        <Fragment>
            <Box className={classes?.signinMain}>
                <Grid container component="main" className={classes?.signinMain}>
                    <Grid item xs={false} sm={false} md={6} lg={7} xl={8.5}
                        sx={{
                            display: { xs: "none", sm: "none", md: "flex", lg: "flex" }
                        }}
                        className={classes?.signinImageContainer}
                    >
                        <img src={backimg} alt='' style={{ maxWidth: "560px" }} />
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={5} xl={3.5} sx={{ pl: 3, pr: 3, pt: 3, pb: 3, height: '100vh', overflow: "auto", '&::-webkit-scrollbar': { display: "none" } /* height: '100vh', pl: 3, pr: 3, pt: 3, pb: 3, overflow: 'auto' */ }}>
                        <Box
                            sx={{
                                px: { xs: 0, sm: 6, md: 3, lg: 3, xl: 3 },
                                gap: '6px',
                            }}
                            className={classes?.formMain}
                        >
                            <img src={appicon} alt='logo' style={{ width: "70px", height: "65px" }} />
                            <Stack direction={'column'} alignItems={"center"} sx={{ gap: '16px' }}>
                                <Typography variant="h4" sx={{ fontWeight: 700, }}>
                                    Join the E-Com
                                </Typography>
                                <Typography variant="h6" sx={{ lineHeight: 'normal' }}>
                                    Enter your credentials to continue
                                </Typography>
                            </Stack>

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

                                <FormControl fullWidth error={!value?.password ? false : (!RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^*?&_])[A-Za-z\d!@#$%^*?&_]{8,}$/).test(value?.password))}>
                                    <InputLabel>Password</InputLabel>
                                    <OutlinedInput
                                        onChange={(event) => handleInput(event)}
                                        value={value?.password}
                                        required
                                        name="password"
                                        label="Password"
                                        type={isVisibil?.password ? "text" : "password"}
                                        id="password"
                                        autoComplete="current-password"
                                        onCut={(event) => event?.preventDefault()}
                                        onCopy={(event) => event?.preventDefault()}
                                        onPaste={(event) => event?.preventDefault()}
                                        endAdornment={
                                            <InputAdornment position='end'>
                                                <IconButton onClick={() => setIsVisibil({ ...isVisibil, password: !isVisibil?.password })}>
                                                    {isVisibil?.password ?
                                                        <VisibilityIcon sx={{ color: palette?.grey[800] }} />
                                                        :
                                                        <VisibilityOffIcon sx={{ color: palette?.grey[800] }} />
                                                    }
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                    {!value?.password ? null : (!RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^*?&_])[A-Za-z\d!@#$%^*?&_]{8,}$/).test(value?.password)) && <FormHelperText>* Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character</FormHelperText>}
                                </FormControl>
                                <FormControl fullWidth error={!value?.confirmpassword ? false : (value?.password !== value?.confirmpassword)}>
                                    <InputLabel>Confirm Password</InputLabel>
                                    <OutlinedInput
                                        onChange={(event) => handleInput(event)}
                                        value={value?.confirmpassword}
                                        required
                                        name="confirmpassword"
                                        label="Confirm Password"
                                        type={isVisibil?.confirmpassword ? "text" : "password"}
                                        id="confirmpassword"
                                        autoComplete="current-password"
                                        onCut={(event) => event?.preventDefault()}
                                        onCopy={(event) => event?.preventDefault()}
                                        onPaste={(event) => event?.preventDefault()}
                                        endAdornment={
                                            <InputAdornment position='end'>
                                                <IconButton onClick={() => setIsVisibil({ ...isVisibil, confirmpassword: !isVisibil?.confirmpassword })}>
                                                    {isVisibil?.confirmpassword ?
                                                        <VisibilityIcon sx={{ color: palette?.grey[800] }} />
                                                        :
                                                        <VisibilityOffIcon sx={{ color: palette?.grey[800] }} />
                                                    }
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                    {!value?.confirmpassword ? null : (value?.password !== value?.confirmpassword) && <FormHelperText>* Password not match</FormHelperText>}
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
                                        (!value?.firstName || !value?.lastName || !value?.email || !value?.mobile || !value?.password) ||
                                        (value?.password !== value?.confirmpassword) ||
                                        (!RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i).test(value?.email)) ||
                                        (!RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^*?&_])[A-Za-z\d!@#$%^*?&_]{8,}$/).test(value?.password)) ||
                                        (value?.mobile?.length !== 10) ||
                                        isLoading
                                    }
                                >
                                    {isLoading ?
                                        <CircularProgress size={20} />
                                        :
                                        "Sign Up"
                                    }
                                </Button>

                                <Box sx={{ width: '100%', height: 30, display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                    <Typography variant='h6' sx={{ display: 'inline-flex', alignItems: 'center', gap: "8px" }}>Already have an account?<Typography variant='h6' onClick={() => { naviagte('/auth/signin') }} component='div' sx={{ color: palette?.text?.success, cursor: 'pointer', fontWeight: 600, '&:hover': { color: palette?.text?.success, textDecoration: 'underline', transition: 'ease-in 0.2s' } }}>Sign in</Typography></Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Fragment>
    )
}

export default SignUp
