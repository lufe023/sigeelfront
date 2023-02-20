import {configureStore} from '@reduxjs/toolkit'
import userSlice from './slices/user.slice'

export default configureStore({
    reducer:{
        userSlice
    }
})