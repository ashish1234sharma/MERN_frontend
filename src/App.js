import React, { Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import MainRoutes from './routes/MainRoutes'
import AuthRoutes from './routes/AuthRoutes'
import { GlobalStyles } from './themes/globalStyles'
import { Box, Container, CircularProgress, Typography, useTheme } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { LocalStorageManager } from './utils/localstorage'
import { setCurrentUser, setIsLogin } from './store/reducer/AuthHelper'
import { appicon } from './assets/icon'
import { userprofile } from './services';

const App = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { isLogin = null } = useSelector((state) => state?.authhelper);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // setIsLoading(null)
    const isToken = LocalStorageManager.getToken();
    if (isToken) {
      (async () => {
        await userprofile()
          .then((response) => {
            if (response.status === 200) {
              dispatch(setCurrentUser({ profile: response?.data }))
            }
          })
          .catch((error) => {
            console.log(error)
          })
          .finally(() => {
            setIsLoading(true)
          })
      })()
      dispatch(setIsLogin({ isLogin: true }))
    } else {
      dispatch(setIsLogin({ isLogin: false }))
      setIsLoading(false)
    }
  }, [isLogin]);

  if (isLogin === null || isLoading === null) {
    return (
      <Fragment>
        <Container>
          <Box sx={{ height: "100vh", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <img src={appicon} alt='' style={{ width: 100, height: 95 }} />
            <Typography variant='h2' sx={{ userSelect: "none", color: "#005baa", pt: 1, pb: .3 }}>Prime Developer</Typography>
            <Typography variant="subtitle1" sx={{ /* color: "#005baa", */ userSelect: "none", pb: 1 }}>Please wait we're setting up something for you.</Typography>
            <Box sx={{ pt: 1, pb: 1 }}>
              <CircularProgress size={22} />
            </Box>
          </Box>
        </Container>
      </Fragment>
    )
  }

  return (
    <Fragment>
      <Helmet>
        <title>E-Com</title>
      </Helmet>

      <GlobalStyles theme={theme} />
      {isLogin ?
        <MainRoutes />
        :
        <AuthRoutes />
      }
    </Fragment>
  )
}

export default App
