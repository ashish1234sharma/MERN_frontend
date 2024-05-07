import React, { Fragment, useEffect, useState } from 'react'
import { Box, Typography, useTheme, Divider, Grid, Paper, ButtonBase, IconButton, Skeleton } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import { EditSvg } from '../../../assets/svg'
import { ChevronRightRounded, PasswordRounded } from '@mui/icons-material'

import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'

const UserProfile = () => {
    const Navigate = useNavigate();
    const { palette: { success, error, primary, common, text }, shape: { borderRadius } } = useTheme()
    const { currentUser } = useSelector((state) => state?.authhelper);
    const [isUpdate, stIsUpdate] = useState(false)

    return (
        <Fragment>
            <Helmet>
                <title>{currentUser?.name || "User"}</title>
            </Helmet>

            <Fragment>
                <Paper>
                    <Box sx={{ cursor: "pointer", height: (220 - (220 / 4)) }}>
                        <Box sx={{ height: (220 / 2), backgroundColor: primary?.main, borderRadius: `${borderRadius / 2}px`, display: "flex", alignItems: "center", justifyContent: "center", transition: "ease-in-out 0.3s" }}>
                            <Box
                                onMouseLeave={() => { stIsUpdate((prev) => !prev) }}
                                onMouseEnter={() => { stIsUpdate((prev) => !prev) }}
                                sx={{ width: (220 / 2), height: (220 / 2), overflow: "hidden", borderRadius: `${(220 / 2) / 2}px`, border: `4px solid  ${currentUser?.status?.status === "online" ? success?.lighter : error?.lighter}`, position: "relative", top: (220 / 4), justifyContent: "center", alignItems: "center", display: "flex" }}>
                                {currentUser?.profileImage ?
                                    <img src={currentUser?.profileImage} style={{ width: "100%", height: "100%", backgroundColor: primary?.dark, }} />
                                    :
                                    <Box sx={{ width: "100%", height: "100%", backgroundColor: primary?.dark, display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <Typography variant='h5' sx={{ userSelect: "none", color: common?.white }}>{currentUser?.name?.charAt(0)}</Typography>
                                    </Box>
                                }
                                <ButtonBase
                                    onClick={() => {
                                        Navigate(`/user/account/profile/update?_username=${currentUser?.username}&_userid=${currentUser?._id}`)
                                    }}
                                    sx={{
                                        width: (220 / 2),
                                        height: (220 / 2),
                                        borderRadius: `${(220 / 2) / 2}px`,
                                        backgroundColor: '#353535a1',
                                        display: isUpdate ? "block" : "none",
                                        position: "absolute",
                                        zIndex: 9999,
                                        color: common?.white,
                                        transition: "ease-in-out 0.4s"
                                    }}
                                >
                                    <EditSvg />
                                </ButtonBase>
                            </Box>
                        </Box>
                    </Box>
                    <Box>
                        <Typography variant="h5" sx={{ cursor: 'pointer', userSelect: "none", fontWeight: 700, textAlign: "center", pt: 1, pb: 1, '&:hover': { color: primary?.main } }}>
                            {currentUser?.name}
                        </Typography>
                        <Typography variant="h6" sx={{ userSelect: "none", textAlign: "center", pb: 1 }}>{currentUser?.position}</Typography>
                    </Box>
                </Paper>
                <Divider sx={{ pt: 2, width: "100%" }} />
                <Grid container spacing={2} sx={{ pt: 2, pb: 2 }}>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Paper sx={{ padding: "15px", display: "flex", flexDirection: "column", width: "100%", gap: "10px" }}>
                            <Box>
                                <Typography variant="subtitle1">Email</Typography>
                                <Typography variant="h6">{currentUser?.email}</Typography>
                            </Box>
                            <Box>
                                <Typography variant="subtitle1">Username</Typography>
                                <Typography variant="h6">{currentUser?.username}</Typography>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Paper sx={{ padding: "15px", display: "flex", flexDirection: "column", width: "100%", gap: "10px" }}>
                            <Box>
                                <Typography variant="subtitle1">Mobile</Typography>
                                <Typography variant="h6">{currentUser?.mobile ? currentUser?.mobile : '-'}</Typography>
                            </Box>
                            <Box>
                                <Typography variant="subtitle1">Phone code</Typography>
                                <Typography variant="h6">{currentUser?.countrycode ? currentUser?.countrycode : '-'}</Typography>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Paper sx={{ padding: "15px", display: "flex", flexDirection: "column", width: "100%", gap: "10px" }}>
                            <Box>
                                <Typography variant="subtitle1">Address</Typography>
                                <Typography variant="h6">{currentUser?.address?.address || '-'}</Typography>
                            </Box>
                            <Box>
                                <Typography variant="subtitle1">Landmark</Typography>
                                <Typography variant="h6">{currentUser?.address?.landmark || '-'}</Typography>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Paper sx={{ padding: "15px", display: "flex", flexDirection: "column", width: "100%", gap: "10px" }}>
                            <Box>
                                <Typography variant="subtitle1">Created at</Typography>
                                <Typography variant="h6">{moment(currentUser?.createdAt).format('LLL')}</Typography>
                            </Box>
                            <Box>
                                <Typography variant="subtitle1">Updated at</Typography>
                                <Typography variant="h6">{moment(currentUser?.updatedAt).format('LLL')}</Typography>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Paper sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <Box sx={{ display: "flex", alignItems: "center", }}>
                                <IconButton>
                                    <PasswordRounded sx={{ color: text?.black }} />
                                </IconButton>
                                <Typography variant='h5' sx={{ color: error?.main }}>
                                    Change Password
                                </Typography>
                            </Box>
                            <IconButton onClick={() => Navigate(`/user/account/reset/password?_username=${currentUser?.username}&_user=${currentUser?._id}`)}>
                                <ChevronRightRounded sx={{ color: text?.black }} />
                            </IconButton>
                        </Paper>
                    </Grid>
                </Grid>
            </Fragment>
        </Fragment>
    )
}

export default UserProfile
