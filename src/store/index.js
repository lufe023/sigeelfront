import {configureStore} from '@reduxjs/toolkit'
import counterSlice from './slices/counter.slice'

export default configureStore({
    reducer:{
        counterSlice
    }
})