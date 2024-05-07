import React, { Fragment, useState } from 'react';
import { MenuItem, Divider, Typography, Dialog, useTheme, Stack, IconButton, Button, Box } from '@mui/material';
import { CloseRounded } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { appicon } from '../../assets/icon';
import { setIsLogin } from '../../store/reducer/AuthHelper'

const UserLogout = ({ onLogout }) => {
    const dispatch = useDispatch();
    const { palette: { error, divider } } = useTheme();
    const [isLogout, setIsLogout] = useState(false)

    return (
        <Fragment>
            <MenuItem onClick={() => { setIsLogout(true); }} sx={{ margin: "8px", }}>
                <Typography variant='subtitle1' sx={{ fontWeight: 700, color: error?.main }}>Logout</Typography>
            </MenuItem>

            <Dialog
                open={isLogout}
                maxWidth={'xs'}
                onClose={() => setIsLogout(false)}
                sx={{
                    ".MuiDialog-paper": {
                        padding: "0px",

                    }
                }}
            >
                <Stack direction={'row'} alignItems={"center"} justifyContent={'space-between'} sx={{ padding: "15px", width: "100%" }}>
                    <Typography variant='h4' sx={{ fontWeight: 700 }}>Confirm logout</Typography>
                    <IconButton onClick={() => setIsLogout(false)}>
                        <CloseRounded />
                    </IconButton>
                </Stack>
                <Divider sx={{ backgroundColor: divider, width: "100%" }} />
                <Stack direction={'column'} gap={"20px"} alignItems={"center"} justifyContent={'space-between'} sx={{ padding: "20px", width: "100%" }}>
                    <img src={appicon} alt='' style={{ width: 60, height: 55 }} />
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "5px", }}>
                        <Typography variant='h4' sx={{ textAlign: "center", fontWeight: 700 }}>Are you sure, You want to logout ?</Typography>
                        <Typography variant='subtitle1' sx={{ textAlign: "center", fontSize: "14px" }}>After logout you can't access your profile</Typography>
                    </Box>
                    <Box sx={{ width: "100%", display: "flex", flexDirection: { xs: "column-reverse", sm: "column-reverse", md: "row", lg: "row", xl: "row" }, alignItems: "flex-start", gap: "10px", pr: 4, pl: 4 }}>
                        <Button onClick={() => setIsLogout(false)} fullWidth size='small' variant='text' color="error" sx={{ fontSize: "14px", }}>No</Button>
                        <Button onClick={() => {
                            onLogout();
                            setIsLogout(false);
                            dispatch(setIsLogin({ isLogin: false }))
                        }} fullWidth size='small' variant='contained' color='primary' sx={{ fontSize: "14px", textTransform: "uppercase" }}>Yes, I'm sure</Button>
                    </Box>
                </Stack>
            </Dialog>
        </Fragment>
    )
}

export default UserLogout