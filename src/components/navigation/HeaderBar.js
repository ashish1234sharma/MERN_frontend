import React, { Fragment } from 'react'
import { AppBar, useTheme, useMediaQuery, Box, Typography, IconButton } from '@mui/material'
import { useSelector } from 'react-redux';
import UserSection from './UserSection';
import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded';

const HeaderBar = ({ isOpen, setIsOpen }) => {
    const { breakpoints, palette: { common, text } } = useTheme();
    const mathUpMd = useMediaQuery(breakpoints?.up("lg"));
    const { currentUser = null } = useSelector((state) => state?.authhelper)

    return (
        <Fragment>
            <AppBar
                elevation={0}
                sx={{
                    width: `calc(100% - ${mathUpMd ? isOpen ? "240px" : "60px" : "0px"})`,
                    backgroundColor: common?.white, border: "none", height: 60, transition: "ease-in-out  0.2s", left: mathUpMd ? isOpen ? 240 : 60 : 0
                }}
            >
                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <IconButton onClick={() => setIsOpen(!isOpen)}>
                        <MenuOpenRoundedIcon fontSize="medium" sx={{ color: text?.black, transition: "ease-in-out 0.4s", transform: `rotate(${isOpen ? "0deg" : "180deg"})` }} />
                    </IconButton>
                    <Typography></Typography>
                    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", }}>
                        <UserSection />
                    </Box>
                </Box>
            </AppBar>
        </Fragment>
    )
}

HeaderBar.defaultProps = {
    isOpen: true,
    setIsOpen: () => { }
}

export default HeaderBar