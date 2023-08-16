import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    LoggedIn:false,
    userdetails:[],
}
const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setLoggedIn: (state,action) =>{
            state.LoggedIn = action.payload
        },
        setUserDetails:(state,action) =>{
            state.userdetails = action.payload;
        }
    }
})

export const { setLoggedIn, setUserDetails } = userSlice.actions;
export default userSlice.reducer

