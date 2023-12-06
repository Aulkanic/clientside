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
        updateInfo: (state, action) => {
            const { key, value } = action.payload;
            state.info = {
                ...state.info,
                [key]: value,
            };
        },
        signOut:(state) =>{
            return {
                ...state,
                info:null
            }
        },

    }
})

export const { setUserDetails,signOut,updateInfo } = userSlice.actions;
export default userSlice.reducer

