import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    address:'',
    age:'',
    baranggay:'',
    birthday:'',
    birthPlace:'',
    citizenship:'',
    contactNum:'',
    course:'NONE',
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
    famType:'OTHERS',
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
    isSameAddress: false,
    noFather: false,
    onlyChild:false,
    siblings: [],
    userType:''
}

const formSlice = createSlice({
    name:'form',
    initialState,
    reducers:{
        setForm:(state,action) =>{
            return { ...state, ...action.payload };
        },
        resetForm: (state) => {
            return initialState; // Reset the form to the initial state
        },
    }
})

export const { setForm,resetForm } = formSlice.actions;
export default formSlice.reducer;