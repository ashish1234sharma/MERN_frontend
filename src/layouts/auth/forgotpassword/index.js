import React, { Fragment, useState } from 'react'
import {
    Container, Box, Button, FormControl, InputLabel, OutlinedInput, CircularProgress, Typography, FormHelperText
} from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { OtpLockIcon } from '../../../assets/svg';
import BackToSignIn from '../../../components/backtosignin';
import { useStyles } from './styles';
import { finduser } from '../.././../services';
import { LocalStorageManager } from '../../../utils/localstorage';

const ForgotPassword = () => {
    const classes = useStyles();
    const naviagte = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [value, setValue] = useState({ email: '' });

    const handleSubmit = async (event) => {
        setIsLoading(true)
        event.preventDefault();
        finduser(value.email)
            .then((response) => {
                if (response.status === 200) {
                    LocalStorageManager.setUserInfo(response.data)
                    naviagte("/auth/user/verify")
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
            <Container>
                <Box className={classes.mainContainer}>
                    <Box className={classes.subMain}>
                        <OtpLockIcon />
                        <Box className={classes.titleMain}>
                            <Typography variant='h2' sx={{ fontSize: "26px", }}>
                                Forgot your password?
                            </Typography>
                            <Typography variant='subtitle1' >
                                Please enter the email address associated with your account and We will email you one time password for verification your account.
                            </Typography>
                        </Box>
                        <Box component="form" noValidate onSubmit={handleSubmit} className={classes.componentForm}>
                            <FormControl fullWidth error={!value?.email ? false : (!RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i).test(value?.email))} margin='normal' sx={{ mt: 1, mb: 1 }} >
                                <InputLabel>Email</InputLabel>
                                <OutlinedInput
                                    value={value?.email}
                                    onChange={(event) => setValue({ ...value, email: event?.target?.value })}
                                    required
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    onInput={(event) => {
                                        const inputValue = event.target.value;
                                        if (inputValue !== "" && !/^[a-zA-Z!@#$%^&*()]+$/?.test(inputValue)) {
                                            event.target.value = inputValue.replace(/\s/g, ''); // Remove spaces
                                        }
                                    }}
                                />
                                {!value?.email ? null : (!RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i).test(value?.email)) && <FormHelperText>* Enter Valid Email</FormHelperText>}
                            </FormControl>
                            <Button
                                disabled={
                                    (!value?.email) ||
                                    (!RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i).test(value?.email)) ||
                                    isLoading
                                }
                                type="submit"
                                size="large"
                                disableElevation={true}
                                fullWidth
                                variant="contained"
                                color="primary"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                {isLoading ?
                                    <CircularProgress size={20} />
                                    :
                                    "Send OTP"
                                }
                            </Button>

                            <BackToSignIn />
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Fragment>
    )
}

export default ForgotPassword