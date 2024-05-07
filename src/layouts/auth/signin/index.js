import React, { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { appicon } from '../../../assets/icon';
import { Box, Stack, Container, Button, FormControl, InputLabel, OutlinedInput, useTheme, FormHelperText, Typography, InputAdornment, IconButton, CircularProgress, } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import * as api from '../../../services'
import { setIsLogin } from '../../../store/reducer/AuthHelper';
import { LocalStorageManager } from '../../../utils/localstorage';
import { useDispatch } from 'react-redux';

const SignIn = () => {
    const { palette } = useTheme();
    const naviagte = useNavigate();
    const dispatch = useDispatch();
    const [isVisibil, setIsVisibil] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [value, setValue] = useState({
        email: '',
        password: ''
    })

    const handleInput = (event) => {
        setValue({ ...value, [event?.target?.name]: event?.target?.value })
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true)
        api.usersignin({
            username: value?.email,
            password: value?.password
        })
            .then((response) => {
                if (response.status === 200) {
                    LocalStorageManager.setToken(response?.data?.token)
                    LocalStorageManager.setIsUserID(response?.data?._id)
                    dispatch(setIsLogin({ isLogin: true }))
                    naviagte('/', { replace: true })
                }
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                setIsLoading(false)
            })
    };

    return (
        <Fragment>
            <Container maxWidth={"xs"} sx={{ display: "flex", pt: `${(window.innerHeight / 2) / 2}px`, pb: `${(window.innerHeight / 2) / 2}px`, height: window.innerHeight, flexDirection: "column", alignItems: "center", width: "100%", justifyContent: "center" }}>
                <Box>
                    <img src={appicon} alt='pcshortPng' style={{ width: "70px", height: "65px" }} />
                </Box>
                <Stack direction={'column'} alignItems={"center"} sx={{ gap: '16px' }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, }}>
                        Sign in
                    </Typography>
                    <Typography variant="h6" sx={{ lineHeight: 'normal' }}>
                        Enter your credentials to continue
                    </Typography>
                </Stack>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px', width: "100%", mt: 1 }}>
                    <FormControl fullWidth margin='normal' sx={{ mt: 1, mb: 1 }} >
                        <InputLabel>Email</InputLabel>
                        <OutlinedInput
                            required
                            value={value?.email}
                            onChange={(event) => handleInput(event)}
                            id="email"
                            label="Email/Username"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel>Password</InputLabel>
                        <OutlinedInput
                            value={value?.password}
                            onChange={(event) => handleInput(event)}
                            required
                            name="password"
                            label="Password"
                            type={isVisibil ? "text" : "password"}
                            id="password"
                            autoComplete="current-password"
                            endAdornment={
                                <InputAdornment position='end'>
                                    <IconButton onClick={() => setIsVisibil(!isVisibil)}>
                                        {isVisibil ?
                                            <VisibilityIcon sx={{ color: palette?.grey[800] }} />
                                            :
                                            <VisibilityOffIcon sx={{ color: palette?.grey[800] }} />
                                        }
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <Box sx={{ width: '100%', height: 30, display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end' }}>
                        <Typography variant='h6' onClick={() => { naviagte('/auth/user/find') }} component='div' sx={{ cursor: 'pointer', fontWeight: 600, userSelect: "none", transition: 'ease-in 0.2s', '&:hover': { color: palette?.primary?.main, textDecoration: 'underline', transition: 'ease-in 0.2s' } }} >Forgot password?</Typography>
                    </Box>
                    <Button
                        type="submit"
                        size="large"
                        disableElevation={true}
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={
                            isLoading
                        }
                    >
                        {isLoading ?
                            <CircularProgress size={20} />
                            :
                            "Sign In"
                        }
                    </Button>
                    <Box sx={{ width: '100%', height: 30, display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                        <Typography variant='h6' sx={{ display: 'inline-flex', alignItems: 'center', gap: "8px" }}>Don't have an account?<Typography variant='h6' onClick={() => { naviagte('/auth/signup') }} component='div' sx={{ color: palette?.text?.success, cursor: 'pointer', fontWeight: 600, '&:hover': { color: palette?.text?.success, textDecoration: 'underline', transition: 'ease-in 0.2s' } }}>Sign up</Typography></Typography>
                    </Box>
                </Box>
            </Container>
        </Fragment>
    )
}

export default SignIn