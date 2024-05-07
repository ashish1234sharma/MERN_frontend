import React, { Fragment, useState } from 'react';
import { Box, useTheme, Avatar, Typography, IconButton, Divider, Stack, MenuItem, Popover, Button } from '@mui/material'
import { useSelector } from 'react-redux';
import { DashboardRounded, PersonRounded } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
// import { setUserId } from '../../store/reducer/InitialUser';
import UserLogout from './UserLogout';
import { LocalStorageManager } from '../../utils/localstorage'

const UserSection = () => {
  const Navigate = useNavigate();
  const { currentUser } = useSelector((state) => state?.authhelper)
  const { palette: { primary, common, }, } = useTheme();
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const onLogout = () => {
    LocalStorageManager.removeItems();
    sessionStorage.clear();
    handleClose()
  };

  return (
    <Fragment>
      <IconButton
        onClick={handleOpen}
        sx={{ background: common?.iconButton, borderRadius: "50%", }}
      >
        <Avatar
          src={currentUser?.profileImage ? currentUser?.profileImage : 'sample.png'}
          alt={currentUser?.name?.charAt(0)}
          sx={{
            color: primary?.main,
            width: "36px",
            height: "36px",
            border: `2px solid ${["/user/account/profile", "/user/account/profile/update", "/user/account/reset/password"].includes(window.location.pathname) ? primary?.light : common?.white}`,
            transition: "ease-in-out 0.3s"
          }} />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box sx={{
          width: "14px",
          height: "14px",
          position: "absolute",
          borderBottomLeftRadius: "3.5px",
          clipPath: "polygon(0% 0%, 100% 100%, 0% 100%)",
          border: "1px solid rgba(145, 158, 171, 0.12)",
          backdropFilter: "blur(6px)",
          backgroundColor: common?.shap,
          top: "-6.5px",
          transform: "rotate(135deg)",
          right: "20px",
        }} />

        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant='h5' noWrap sx={{ fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", color: "#212B36" }}>
            {currentUser?.name}
          </Typography>
          <Typography variant="subtitle1" noWrap sx={{ fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", }}>
            @{currentUser?.username}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />
        <Stack sx={{ display: "flex", flexDirection: "column", padding: "8px" }}>
          {MENU_OPTIONS(currentUser).map((option) => (
            <MenuItem key={option?.label} onClick={() => { Navigate(option?.route); handleClose() }} sx={{ marginBottom: "4px", gap: "10px" }}>
              {option?.icon()}
              <Typography variant='h6' sx={{ fontWeight: 400, }}>{option?.label}</Typography>
            </MenuItem>
          ))}
        </Stack>
        <Divider sx={{ borderStyle: 'dashed' }} />

        <UserLogout onLogout={onLogout} />
      </Popover>
    </Fragment>
  )
}

export default UserSection

const MENU_OPTIONS = (profile) => [
  {
    label: 'Home',
    route: '/',
    icon: () => {
      return (
        <DashboardRounded fontSize="small" />
      )
    },
  },
  {
    label: 'Profile',
    route: `/user/account/profile?_username=${profile?.username}&_userid=${profile?._id}`,
    icon: () => {
      return (
        <PersonRounded fontSize="small" />
      )
    },
  },
  // {
  // label: 'Settings',
  // route: `/@${profile?.username}/${profile?._id}/profile/setting`,
  // icon: () => {
  // return (
  // <SettingsSuggestRounded fontSize="small" />
  // )
  // },
  // },
];