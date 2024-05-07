import { configureStore } from '@reduxjs/toolkit'
import AuthHelper from './reducer/AuthHelper'

export const store = configureStore({
    reducer: {
        authhelper: AuthHelper,
    },
})