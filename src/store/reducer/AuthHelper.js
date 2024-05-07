import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLogin: null,
    currentUser: null,
}

export const AuthHelper = createSlice({
    name: 'AuthHelper',
    initialState,
    reducers: {
        setIsLogin: (state, action) => {
            state.isLogin = action?.payload?.isLogin;
        },
        setCurrentUser: (state, action) => {
            state.currentUser = action?.payload?.profile;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setIsLogin, setCurrentUser } = AuthHelper.actions

export default AuthHelper.reducer