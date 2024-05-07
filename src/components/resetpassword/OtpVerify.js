import React, { Fragment, useState, useEffect } from 'react'
import { Paper, Box, Button, CircularProgress, Typography, useTheme } from '@mui/material'
import { MuiOtpInput } from '../OTPTextFieldBox/MuiOtpInput'
// import { ResetPaswordOTP, VerifyOTP } from '../../services'
import { enqueueSnackbar } from 'notistack';
import SnackNotification from '../snackbar';
import { useSelector } from 'react-redux';
// import { userpasswordreset } from '../../controller/admin';

const OtpVerify = ({ inputValue, setInputValue, setIsSuccess }) => {
    const { palette: { primary, text } } = useTheme();
    const { currentUser = {} } = useSelector((state) => state?.authhelper)
    const [isLoading, setIsLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const [timerCount, setTimer] = useState(180)
    const [timerReset, setTimerReset] = useState(false)

    const onSubmit = async () => {
        setIsLoading(true)

    };

    const ResendOTP = async () => {
        setResendLoading(true)

    }

    useEffect(() => {
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
            <Paper sx={{ maxWidth: "550px", margin: "0 auto" }}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "350px", margin: "20px auto" }}>
                    <Typography variant='h3' sx={{ textAlign: "center", textTransform: "uppercase" }}>Verification required</Typography>
                    <Typography variant="subtitle1" sx={{ textAlign: "center", }}>
                        Please enter the 6-digit verification code that was sent to your email <span style={{ color: primary?.main, userSelect: "none" }}>{currentUser?.email}</span>
                    </Typography>
                </Box>
                <Box sx={{ maxWidth: "400px", margin: "0 auto" }}>
                    <MuiOtpInput
                        placeholder={'-'}
                        length={6}
                        value={inputValue?.OTP}
                        onChange={(event) => setInputValue({ ...inputValue, OTP: event })}
                    />
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", maxWidth: "400px", margin: "0 auto", pt: 2 }}>
                    {resendLoading ?
                        <CircularProgress size={15} />
                        :
                        <Typography variant='h6' sx={{ fontWeight: 400, display: "inline-flex", alignItems: "center", gap: "8px", textAlign: "center" }}>
                            Don't have a code?
                            {timerCount === 0 ?
                                <Typography variant='h6' onClick={() => { ResendOTP() }} sx={{ fontWeight: 600, color: text?.success, cursor: "pointer", textAlign: "center" }}>
                                    Resend code
                                </Typography>
                                :
                                <Typography variant='h6' sx={{ fontWeight: 700, color: text?.success, userSelect: "none", letterSpacing: "2px", textAlign: "center" }}>
                                    {minutes}:{seconds}
                                </Typography>
                            }
                        </Typography>
                    }
                </Box>
                <Box sx={{ maxWidth: "400px", margin: "0 auto" }}>
                    <Button
                        onClick={() => { onSubmit() }}
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 3 }}
                        disabled={
                            inputValue?.OTP.length !== 6 || isLoading
                        }
                    >
                        {isLoading ?
                            <CircularProgress size={"18px"} />
                            :
                            "Verify and update"
                        }
                    </Button>
                </Box>
            </Paper>
        </Fragment>
    )
}

OtpVerify.defaultProps = {
    inputValue: {},
    setInputValue: () => { },
    isVerification: {},
    setIsVerification: () => { },
    setIsSuccess: () => { },
}
export default OtpVerify