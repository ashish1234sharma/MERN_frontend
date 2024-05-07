import React, { Fragment } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom'
import { SignIn, SignUp, SignupVerify, ForgotPassword, ForgotPasswordVerify, NewPassword } from '../layouts/auth'

const AuthRoutes = () => {
  return (
    <Fragment>
      <Routes>
        <Route path='/auth/signin' element={<SignIn />} />
        <Route path='/auth/signup' element={<SignUp />} />
        <Route path='/auth/signup/verify' element={<SignupVerify />} />
        <Route path='/auth/user/find' element={<ForgotPassword />} />
        <Route path='/auth/user/verify' element={<ForgotPasswordVerify />} />
        <Route path='/auth/forgot/password/:_id' element={<NewPassword />} />

        <Route path='/' index={true} element={<Navigate to={'/auth/signin'} replace={true} index={true} />} />
        <Route path='*' index={true} element={<Navigate to={'/auth/signin'} replace={true} index={true} />} />
      </Routes>
    </Fragment>
  )
}

export default AuthRoutes