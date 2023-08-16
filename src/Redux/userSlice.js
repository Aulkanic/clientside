import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fname:'',
    mname:'',
    lname:'',
    details:[]
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setName:(state,action) =>{
            const { fname,lname,mname,details} = action.payload;
            state.fname = fname;
            state.lname = lname;
            state.mname = mname;
            state.details = details;
        }
    }
})

export const { setName } = userSlice.actions;
export default userSlice.reducer;