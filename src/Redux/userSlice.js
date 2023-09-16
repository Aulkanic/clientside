import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fname:'',
    mname:'',
    lname:'',
    email:'',
    applicantNum:'',
    isWarning: 0,
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setName:(state,action) =>{
            const { fname,lname,mname,email,applicantNum,isWarning} = action.payload;
            state.fname = fname;
            state.lname = lname;
            state.mname = mname;
            state.email = email;
            state.applicantNum = applicantNum;
            state.isWarning = isWarning;
        }
    }
})

export const { setName } = userSlice.actions;
export default userSlice.reducer;