import React, { Fragment, useEffect, useState } from 'react'
import { Box, Typography, useTheme, IconButton, Paper, Button, CircularProgress } from '@mui/material'
import { AddCircleOutlineRounded, ChevronLeftRounded } from '@mui/icons-material'
import { useLocation, useNavigate } from 'react-router-dom'
import { OtpVerify, PasswordReset, ResetModal } from '../../../components/resetpassword'
// import { userpasswordreset, userresetpasswordotp } from '../../controller/admin'
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import { passwordreset } from '../../../services'

const ResetPassword = () => {
    const Navigate = useNavigate();
    const { currentUser = {} } = useSelector((state) => state?.authhelper)
    const { palette: { text, grey, }, } = useTheme()
    const [isLoader, setIsLoader] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [inputValue, setInputValue] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    console.log(currentUser?._id)
    const onSubmit = () => {
        setIsLoader(true)
        passwordreset(currentUser?._id, {
            "previousPassword": inputValue?.currentPassword,
            "newPassword": inputValue?.newPassword,
        })
            .then((response) => {
                console.log(response)
                if (response.status === 200) {
                    // setIsSuccess(true)
                }
            })
            .catch((error) => { console.log(error) })
            .finally(() => { setIsLoader(false) })
    };

    return (
        <Fragment>
            <Helmet>
                <title>Prime Developer | Paddword Reset</title>
            </Helmet>

            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography variant='h3' sx={{ color: grey[700], textTransform: "uppercase", fontWeight: 700, fontSize: "20px", pt: 1, pb: 2, userSelect: "none", }}>Reset Password</Typography>
            </Box>
            <Paper sx={{ p: "20px", maxWidth: "450px", margin: "0 auto" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton onClick={() => { Navigate(-1) }}>
                        <ChevronLeftRounded sx={{ color: text?.black }} />
                    </IconButton>
                    <Typography variant='h6'>Go Back</Typography>
                </Box>
                <Box sx={{ pb: 2 }}>
                    <Typography variant='h2' sx={{ fontSize: "22px", }}>
                        Forgot Password
                    </Typography>
                    <Typography variant='subtitle1' >
                        Enter your credentials to continue
                    </Typography>
                </Box>
                <PasswordReset
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                />

                <Button
                    onClick={() => { onSubmit() }}
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={
                        (
                            !inputValue?.currentPassword ||
                            !inputValue?.newPassword ||
                            !inputValue?.confirmPassword
                        ) ||
                        isLoader ||
                        (inputValue?.newPassword !== inputValue?.confirmPassword) ||
                        (!RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^*?&_])[A-Za-z\d!@#$%^*?&_]{8,}$/).test(inputValue?.newPassword))
                    }
                >
                    {isLoader ?
                        <CircularProgress size={18} />
                        :
                        "SEND OTP"
                    }
                </Button>
            </Paper>

            <ResetModal
                isSuccess={isSuccess}
                setIsSuccess={setIsSuccess}
            />
        </Fragment>
    )
}

export default ResetPassword