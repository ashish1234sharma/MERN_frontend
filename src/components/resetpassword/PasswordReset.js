import {
    Box, Button, FormControl, Container, InputLabel, OutlinedInput, useTheme, FormHelperText, Typography, InputAdornment, IconButton, CircularProgress,
} from '@mui/material'
import React, { Fragment, useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const PasswordReset = ({ inputValue, setInputValue }) => {
    const { palette } = useTheme()
    const [isVisibil, setIsVisibil] = useState({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false,
    });

    const onChangeText = (event) => {
        setInputValue({ ...inputValue, [event?.target?.name]: event?.target?.value })
    };

    return (
        <Fragment>
            <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column", gap: "10px", pb: 2 }}>
                <FormControl fullWidth>
                    <InputLabel>Current Password</InputLabel>
                    <OutlinedInput
                        onChange={(event) => onChangeText(event)}
                        value={inputValue?.currentPassword}
                        required
                        name="currentPassword"
                        label="Current Password"
                        type={isVisibil?.currentPassword ? "text" : "password"}
                        id="password"
                        autoComplete="current-password"
                        endAdornment={
                            <InputAdornment position='end'>
                                <IconButton onClick={() => setIsVisibil({ ...isVisibil, currentPassword: !isVisibil?.currentPassword })}>
                                    {isVisibil?.currentPassword ?
                                        <VisibilityIcon sx={{ color: palette?.grey[800] }} />
                                        :
                                        <VisibilityOffIcon sx={{ color: palette?.grey[800] }} />
                                    }
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <FormControl fullWidth error={!inputValue?.newPassword ? false : (!RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^*?&_])[A-Za-z\d!@#$%^*?&_]{8,}$/).test(inputValue?.newPassword))}>
                    <InputLabel>New Password</InputLabel>
                    <OutlinedInput
                        onChange={(event) => onChangeText(event)}
                        value={inputValue?.newPassword}
                        required
                        name="newPassword"
                        label="New Password"
                        type={isVisibil?.newPassword ? "text" : "password"}
                        id="password"
                        autoComplete="current-password"
                        endAdornment={
                            <InputAdornment position='end'>
                                <IconButton onClick={() => setIsVisibil({ ...isVisibil, newPassword: !isVisibil?.newPassword })}>
                                    {isVisibil?.newPassword ?
                                        <VisibilityIcon sx={{ color: palette?.grey[800] }} />
                                        :
                                        <VisibilityOffIcon sx={{ color: palette?.grey[800] }} />
                                    }
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    <FormHelperText sx={{ display: (!RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^*?&_])[A-Za-z\d!@#$%^*?&_]{8,}$/).test(inputValue?.newPassword)) ? !inputValue?.newPassword ? "none" : "block" : "none" }}>* Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character</FormHelperText>
                </FormControl>
                <FormControl fullWidth error={!inputValue?.confirmPassword ? false : (inputValue?.newPassword !== inputValue?.confirmPassword)}>
                    <InputLabel>Confirm Password</InputLabel>
                    <OutlinedInput
                        onChange={(event) => onChangeText(event)}
                        value={inputValue?.confirmPassword}
                        required
                        name="confirmPassword"
                        label="Confirm password"
                        type={isVisibil?.confirmPassword ? "text" : "password"}
                        id="password"
                        autoComplete="current-password"
                        endAdornment={
                            <InputAdornment position='end'>
                                <IconButton onClick={() => setIsVisibil({ ...isVisibil, confirmPassword: !isVisibil?.confirmPassword })}>
                                    {isVisibil?.confirmPassword ?
                                        <VisibilityIcon sx={{ color: palette?.grey[800] }} />
                                        :
                                        <VisibilityOffIcon sx={{ color: palette?.grey[800] }} />
                                    }
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    <FormHelperText sx={{ display: (inputValue?.newPassword !== inputValue?.confirmPassword) ? !inputValue?.confirmPassword ? "none" : "block" : "none" }}>* Password not match</FormHelperText>
                </FormControl>
            </Box>
        </Fragment>
    )
}
PasswordReset.defaultProps = {
    inputValue: {},
    setInputValue: () => { }
}
export default PasswordReset