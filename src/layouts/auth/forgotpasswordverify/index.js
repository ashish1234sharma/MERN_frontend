import React, { Fragment, useState } from 'react'
import {
    Box, Container, Button, FormControl, InputLabel, OutlinedInput, useTheme, Typography, InputAdornment, CircularProgress
} from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { RequestSentIcon } from '../../../assets/svg';
import BackToSignIn from '../../../components/backtosignin';
import { MuiOtpInput } from '../../../components/OTPTextFieldBox/MuiOtpInput'
import { useStyles } from './styles';
import { enqueueSnackbar } from 'notistack';
import SnackNotification from '../../../components/snackbar';
import { LocalStorageManager } from '../../../utils/localstorage';

const ForgotPasswordVerify = () => {
    const classes = useStyles();
    const naviagte = useNavigate();
    const { palette } = useTheme();
    const [isLoading, setIsLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const [timerCount, setTimer] = useState(180)
    const [timerReset, setTimerReset] = useState(false)
    const [value, setValue] = useState({ OTP: "" })

    const handleSubmit = (event) => {
        event.preventDefault();
        naviagte(`/auth/forgot/password/${LocalStorageManager.getUserInfo()?._id}`)
    };

    const ResendOTP = () => {
        setResendLoading(true)
        setTimerReset(!timerReset)
        setTimer(180)
        enqueueSnackbar(
            "successfully send OTP",
            {
                variant: "success",
                content: (key, message) => { return SnackNotification(key, message, 'success') }
            })
        setResendLoading(false)
    }

    React.useEffect(() => {
        let interval = setInterval(() => {
            setTimer(lastTimerCount => {
                if (lastTimerCount == 0) {
                    //your redirection to Quit screen
                } else {
                    lastTimerCount <= 1 && clearInterval(interval)
                    return lastTimerCount - 1
                }
            })
        }, 1000) //each count lasts for a second
        //cleanup the interval on complete
        return () => clearInterval(interval)
    }, [timerReset]);

    const seconds = String(timerCount % 60).padStart(2, 0);
    const minutes = String(Math.floor(timerCount / 60)).padStart(2, 0);
    return (
        <Fragment>
            <Container>
                <Box className={classes.mainContainer}>
                    <Box className={classes.subMain}>
                        <RequestSentIcon />
                        <Box className={classes.titleMain}>
                            <Typography variant='h2' sx={{ fontSize: "26px", }}>
                                Request sent successfully!
                            </Typography>
                            <Typography variant='subtitle1' >
                                We've sent a 6-digit confirmation email to your email.
                                Please enter the code in below box to verify your email.
                            </Typography>
                        </Box>

                        <Box component="form" noValidate onSubmit={handleSubmit} className={classes.componentForm}>
                            <FormControl fullWidth error={false} margin='normal' >
                                <InputLabel>Email</InputLabel>
                                <OutlinedInput
                                    fullWidth
                                    value={LocalStorageManager.getUserInfo()?.email}
                                    label="Email/Usename"
                                    readOnly={true}
                                    endAdornment={
                                        <InputAdornment position='end'>
                                            <Typography variant='h6' onClick={() => { naviagte(-1) }} sx={{ color: palette?.text?.success, cursor: "pointer", }}>
                                                Change
                                            </Typography>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            <MuiOtpInput placeholder={'-'} length={6} value={value?.OTP} onChange={(event) => setValue({ ...value, OTP: event })} />
                            <Button
                                disabled={value?.OTP?.length !== 6 || isLoading}
                                type="submit"
                                size="large"
                                disableElevation={true}
                                fullWidth
                                variant="contained"
                                color="primary"
                                sx={{ mt: 1, mb: 2 }}
                            >
                                {isLoading ?
                                    <CircularProgress size={20} />
                                    :
                                    "Verify"
                                }
                            </Button>

                            {resendLoading ?
                                <CircularProgress size={20} />
                                :
                                <Typography variant='h6' sx={{ fontWeight: 400, display: "inline-flex", alignItems: "center", gap: "8px" }}>
                                    Don't have a code?
                                    {timerCount === 0 ?
                                        < Typography variant='h6' onClick={() => { ResendOTP() }} sx={{ fontWeight: 600, color: palette?.text?.success, cursor: "pointer", }}>
                                            Resend code
                                        </Typography>
                                        :
                                        <Typography onClick={() => { ResendOTP() }} variant='h6' sx={{ fontWeight: 700, color: palette?.text?.success, userSelect: "none", letterSpacing: "2px" }}>
                                            {minutes}:{seconds}
                                        </Typography>
                                    }
                                </Typography>
                            }

                            <BackToSignIn />
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Fragment >
    )
}

export default ForgotPasswordVerify