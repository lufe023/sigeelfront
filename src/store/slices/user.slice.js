import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        censu:{
        firstName: 'Cargando',
        lastName: 'Cargando',
        picture: 'Cargando'
    }
},
    reducers:{
        setUserData: (state, action) => action.payload
    }
})

export const {setUserData} = userSlice.actions

export default userSlice.reducer

