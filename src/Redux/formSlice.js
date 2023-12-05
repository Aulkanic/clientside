import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    address:'',
    age:'',
    baranggay:'',
    birthday:'',
    birthPlace:'',
    citizenship:'',
    contactNum:'',
    course:'',
    School:'',
    yearLevel:'',
    SchoolAddress:'',
    email:'',
    fatherEduc:'',
    fatherName:'',
    fatherlName:'',
    fathermName:'',
    fatherOccu:'',
    familyCode:'',
    firstName:'',
    gender:'',
    gradeLevel:'',
    guardianContact:'',
    guardianName:'',
    guardianlName:'',
    guardianmName:'',
    guardianAddress:'',
    lastName:'',
    middleName:'',
    motherEduc:'',
    motherName:'',
    motherlName:'',
    mothermName:'',
    motherOccu:'',
    relationship:'',
    schoID:'',
    suffix:'',
    siblings: [],
    userType:''
}

const userSlice = createSlice({
    name:'form',
    initialState,
    reducers:{
        setForm:(state,action) =>{
            return { ...state, ...action.payload };
        }
    }
})

export const { setForm } = userSlice.actions;
export default userSlice.reducer;