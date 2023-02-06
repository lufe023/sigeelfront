import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user:{
        first_name: 'loading',
        last_name: 'loading',
        picture: 'loading'
    }
},
    reducers:{
        setUserData: (state, action) => action.payload
    }
})

export const {setUserData} = userSlice.actions

export default userSlice.reducer

