import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fname:'',
    lname:'',
    email:'',
    applicantNum:'',
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setName:(state,action) =>{
            const { fname,lname,email,applicantNum} = action.payload;
            state.fname = fname;
            state.lname = lname;
            state.email = email;
            state.applicantNum = applicantNum;
        }
    }
})

export const { setName } = userSlice.actions;
export default userSlice.reducer;