import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
    name: 'counter',
    initialState: 1000,
    reducers:{
        incremente: state => state +1,
        decrement: state => state-1
    }
})

export const {incremente, decrement} = counterSlice.actions
export default  counterSlice.reducer