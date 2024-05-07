import React, { Fragment, useState } from 'react'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import SideDrawer from './SideDrawer'
import HeaderBar from './HeaderBar'
import { useSelector } from 'react-redux';

const Navigation = ({ children }) => {
  const { currentUser } = useSelector((state) => state?.authhelper)
  const { breakpoints, } = useTheme();
  const mathUpMd = useMediaQuery(breakpoints?.up("lg"));
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Fragment>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ width: "100%", display: 'flex', overflow: 'hidden' }}>
          <HeaderBar isOpen={isOpen} setIsOpen={setIsOpen} />
          <SideDrawer isOpen={isOpen} setIsOpen={setIsOpen} />


          <Box sx={{
            display: 'flex',
            flexDirection: "column",
            flexGrow: 1,
            height: "100%",
            width: `calc(100% - ${mathUpMd ? isOpen ? "240px" : "60px" : "0px"})`,
            pt: 1,
            pb: 1,
            pl: { xs: 2.5, sm: 2.4, md: 2, lg: 4, xl: 4 },
            pr: { xs: 2.5, sm: 2.4, md: 2, lg: 4, xl: 4 },
            transition: "ease-in-out  0.5s",
          }}>
            <Box sx={{ height: 60, }} />
            {children}
            <Box sx={{ height: 20, }} />
          </Box>
        </Box>
      </Box>
    </Fragment>
  )
}

export default Navigation