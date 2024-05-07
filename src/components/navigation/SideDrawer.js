import React, { Fragment, useEffect } from 'react'
import { Box, ButtonBase, Container, Drawer, IconButton, Paper, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { ChevronRightRounded } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import { navigations } from './navigations';
import { appicon } from '../../assets/icon'

const SideDrawer = ({ isOpen, setIsOpen }) => {
    const Navigate = useNavigate();
    const { currentUser = {} } = useSelector((state) => state?.authhelper)
    const { breakpoints, palette: { primary, text }, shape: { borderRadius } } = useTheme();
    const mathUpMd = useMediaQuery(breakpoints?.up("lg"));

    useEffect(() => {
        if (mathUpMd) {
            setIsOpen(true)
        } else {
            setIsOpen(false)
        }
    }, [mathUpMd]);

    return (
        <Fragment>
            <Drawer
                open={isOpen}
                onClose={() => { setIsOpen(!isOpen) }}
                variant={mathUpMd ? "permanent" : "temporary"} // permanent  temporary
                sx={{
                    width: isOpen ? 240 : 60,
                    border: 'none',
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box', width: isOpen ? 240 : 60,
                        ...(!isOpen && {
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "flex-start",
                        }),
                        p: 0,
                        border: 'none',
                        boxShadow: 'none',
                        overflowY: 'hidden',
                        overflowX: 'hidden',
                    },
                }}
            >
                <Box sx={{ height: 80, justifyContent: "center", alignItems: "center", display: "flex", m: 1 }}>
                    <img onClick={() => { Navigate('/') }} src={appicon} alt='' style={{ width: isOpen ? 60 : 45, height: isOpen ? 55 : 40, cursor: "pointer" }} />
                </Box>
                <Box sx={{ overflow: "auto", }}>
                    <Container sx={{ /* paddingLeft: !mathUpMd ? 16 : 0, paddingRight: !mathUpMd ? 16 : 0, */ display: "flex", flexDirection: "column", gap: "10px" }}>
                        {navigations(currentUser)?.filter((item) => item?.visible === true)?.map((value, index) => {

                            return (
                                <ButtonBase key={index} onClick={() => { Navigate(value?.navigator); if (!mathUpMd) { setIsOpen(false) } }} sx={{ width: !isOpen ? "fit-content" : 'auto', justifyContent: "space-between", transition: "ease-in-out 0.3s", borderRadius: `${borderRadius / 2}px`, backgroundColor: value?.isActive?.includes(window?.location?.pathname) ? primary?.light : primary?.lighter }}>
                                    <Box sx={{ display: "flex", alignItems: "center", }}>
                                        <Tooltip
                                            placement="right"
                                            arrow={!isOpen}
                                            title={
                                                <Paper sx={{ ...(isOpen && { display: "none" }) }}>
                                                    <Typography variant="h6" sx={{ transition: "ease-in-out 0.4s" }}>{value?.name}</Typography>
                                                </Paper>
                                            }
                                        >
                                            <Box sx={{
                                                padding: "0px",
                                                width: "40px",
                                                height: "40px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center"
                                            }}>
                                                {value?.icon(value?.isActive?.includes(window?.location?.pathname) ? primary?.dark : text?.black)}
                                            </Box>
                                        </Tooltip>
                                        <Typography variant="h6" sx={{ ...(!isOpen && { display: "none" }), transition: "ease-in-out 0.4s" }}>{value?.name}</Typography>
                                    </Box>
                                    <ChevronRightRounded sx={{ ...(!isOpen && { display: "none" }), transition: "ease-in-out 0.4s" }} />
                                </ButtonBase>
                            )
                        })}
                    </Container>
                </Box>
            </Drawer>
        </Fragment >
    )
}

SideDrawer.defaultProps = {
    isOpen: true,
    setIsOpen: () => { },
}
export default SideDrawer;
