import {
    Box, Button, FormControl, Container, InputLabel, OutlinedInput, useTheme, FormHelperText, Typography, InputAdornment, IconButton, CircularProgress,
} from '@mui/material'
import React, { Fragment, useState } from 'react'
import { useParams } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { OtpLockIcon } from '../../../assets/svg';
import { useStyles } from './styles';
import BackToSignIn from '../../../components/backtosignin';
import ForgotModal from './ForgotModal';
import { passwordforgot } from '../../../services';
import { enqueueSnackbar } from 'notistack';
import SnackNotification from '../../../components/snackbar';

const NewPassword = () => {
    const classes = useStyles();
    const { palette } = useTheme();
    const params = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false)
    const [isVisibil, setIsVisibil] = useState({ password: false, confirmpassword: false });
    const [value, setValue] = useState({
        password: "",
        confirmpassword: ""
    });

    const handleSubmit = async (event) => {
        setIsLoading(true)
        event.preventDefault();
        passwordforgot(params?._id, { newPassword: value?.password })
            .then((response) => {
                if (response?.status === 200) {
                    enqueueSnackbar(
                        "Password forgot successfully",
                        {
                            variant: "success",
                            content: (key, message) => { return SnackNotification(key, message, 'success') }
                        }
                    )
                    setIsSuccess(true);
                }
            })
            .catch((error) => { console.log(error) })
            .finally(() => { setIsLoading(false) })
    };

    const handleInput = (event) => {
        setValue({ ...value, [event?.target?.name]: event?.target?.value })
    };

    return (
        <Fragment>
            <Container>
                <Box className={classes.mainContainer}>
                    <Box className={classes.subMain}>
                        <OtpLockIcon />
                        <Box className={classes.titleMain}>
                            <Typography variant='h2' sx={{ fontSize: "26px", }}>
                                Forgot Password
                            </Typography>
                            <Typography variant='subtitle1' >
                                Enter your credentials to continue
                            </Typography>
                        </Box>
                        <Box component="form" noValidate onSubmit={handleSubmit} className={classes.componentForm}>
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
                                    (!value?.password || !value?.confirmpassword) ||
                                    (value?.password !== value?.confirmpassword) ||
                                    (!RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^*?&_])[A-Za-z\d!@#$%^*?&_]{8,}$/).test(value?.password)) ||
                                    isLoading
                                }
                            >
                                {isLoading ?
                                    <CircularProgress size={20} />
                                    :
                                    "Forgot Password"
                                }
                            </Button>
                            <BackToSignIn />
                        </Box>
                    </Box>
                </Box>
            </Container>

            <ForgotModal
                isSuccess={isSuccess}
                setIsSuccess={setIsSuccess}
            />
        </Fragment>
    )
}

export default NewPassword