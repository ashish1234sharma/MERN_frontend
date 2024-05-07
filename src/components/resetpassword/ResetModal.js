import React, { Fragment, useEffect } from 'react'
import { Box, Button, Dialog, Typography } from '@mui/material'
import { appicon } from '../../assets/icon'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setIsLogin } from '../../store/reducer/AuthHelper'
import { LocalStorageManager } from '../../utils/localstorage'

const ResetModal = ({ isSuccess, setIsSuccess }) => {
    const dispatch = useDispatch()
    const Navigate = useNavigate();

    const onLogout = () => {
        LocalStorageManager.removeItems();
        sessionStorage.clear();
        dispatch(setIsLogin({ isLogin: false }))
        Navigate('/')
    };

    // useEffect(() => {
    // window.addEventListener("beforeunload", alertUser);
    // return () => {
    // window.removeEventListener("beforeunload", alertUser);
    // };
    // }, []);
    // 
    // const alertUser = (e) => {
    // if (isSuccess) {
    // onLogout()
    // return false
    // } else {
    // return false
    // }
    // };

    return (
        <Fragment>
            <Dialog
                open={isSuccess}
                onClose={() => { onLogout() }}
                maxWidth={"xs"}
                sx={{
                    ".MuiDialog-paper": {
                        padding: "30px"
                    }
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <img src={appicon} style={{ width: "60px", height: "55px" }} />
                </Box>
                <Box sx={{ pt: 4, }}>
                    <Typography variant='h4' sx={{ textAlign: "center" }}>Password successfully changed</Typography>
                </Box>
                <Box sx={{ pt: 1, pb: 4, }}>
                    <Typography variant="subtitle1" sx={{ textAlign: "center" }}>You can now use your new password to log in to your account!</Typography>
                </Box>
                <Button onClick={() => { onLogout() }} fullWidth size={"small"} variant="contained" color="primary">Login</Button>
            </Dialog>
        </Fragment>
    )
}
ResetModal.defaultProps = {
    isSuccess: false,
    setIsSuccess: () => { }
}
export default ResetModal