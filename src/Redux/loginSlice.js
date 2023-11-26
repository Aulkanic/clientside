import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    info:[],
}
const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setUserDetails:(state,action) =>{
            state.info = action.payload;
        },
        signOut:(state) =>{
            return {
                ...state,
                info:null
            }
        },

    }
})

export const { setUserDetails,signOut } = userSlice.actions;
export default userSlice.reducer

