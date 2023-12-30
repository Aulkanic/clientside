import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { multiStepContext } from './StepContext';
import {  useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { FindRegisteredUser} from '../../Api/request.js'
import { Rulelist} from '../../Api/request.js';
import Swal from 'sweetalert2';
import TextInput from '../../Components/InputField/text.jsx';
import TeleInput from '../../Components/InputField/telephone.jsx';
import SelectInput from '../../Components/InputField/select.jsx';
import { useDispatch, useSelector } from 'react-redux';
import '../css/Firststep.css'
import '../css/buttonStyle.css'
import { useTranslation } from 'react-i18next';
import { suffixList,barangayList,genderList,yearList,elementaryList,juniorhighList,seniorhighList,
  collegeList,strandList,courseList} from '../../Pages/Public/ApplicationForm/listOptions.js';    
import { setForm } from '../../Redux/formSlice.js';
import CustomButton from '../../Components/Button/button.jsx';
import { validateText,validateCellphoneNumber,validateField,validateAge } from '../../helper/validateField.js';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Firststep() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const form = useSelector((state) => state.form)
  const [open, setOpen] = useState(false);
  const { setStep} = useContext(multiStepContext);
  const [errors, setErrors] = useState({}); 
  const [rule,setRule] = useState([])
  const [open1, setOpen1] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };
  const handleOptionChange = (data) => {
    const { name, value } = data;    
    dispatch(setForm({ [name]: value }));
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const caps = value.toUpperCase()
    dispatch(setForm({ [name]: caps }));
  };
  const getOptionsBasedOnYearLevel = () => {
    const yearLevel = form.yearLevel;
    switch (yearLevel) {
      case 'ELEMENTARY':
        return elementaryList;
      case 'COLLEGE':
        return collegeList;
      case 'JUNIOR HIGHSCHOOL':
        return juniorhighList;
      case 'SENIOR HIGHSCHOOL':
        return seniorhighList;
      default:
        return [];
    }
  };
  const getOptionsBasedOnGradeLevel = () => {
    const yearLevel = form.yearLevel;
    switch (yearLevel) {
      case 'ELEMENTARY':
        dispatch(setForm({ ["course"]: 'NONE' }));
        return [];
      case 'COLLEGE':
        return courseList;
      case 'JUNIOR HIGHSCHOOL':
        dispatch(setForm({ ["course"]: 'NONE' }));
        return [];
      case 'SENIOR HIGHSCHOOL':
        return strandList;
      default:
        return [];
    }
  };
  const calculateAge = (birthday) => {
      const today = new Date();
      const birthDate = new Date(birthday);
      const yearDiff = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      const dayDiff = today.getDate() - birthDate.getDate();

      if (
        yearDiff > 0 ||
        (yearDiff === 0 && monthDiff > 0) ||
        (yearDiff === 0 && monthDiff === 0 && dayDiff >= 0)
      ) {
        let age = yearDiff;
        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
          age--;
        }
        return age;
      } else {
        return 0; // Return 0 if the entered birthday is in the current year or a future year
      }
  };

useEffect(() => {
    const { birthday } = form;
    const age = calculateAge(birthday);
    if (age > rule.ageNum) {
      errors.age = "Not Qualified";
      Swal.fire({
        title: "Warning",
        text: `You are not Qualify to Apply Scholarship.Only ${rule.ageNum} below must considered.`,
        icon: "warning",
        button: "OK",
      });
      setStep(1);
    }
    dispatch(setForm({ ["age"]: age }));
},[form.birthday]); 
useEffect(() => {
    async function fetchData() {
      try {
        const rul = await Rulelist.FETCH_RULE()
        setRule(rul.data.result[0])
      } catch (error) {
        console.error(error);
      }
    }    
    fetchData();
},[]);
  
async function Check(){
    const errors = {};
    if(!form.firstName || !form.lastName || !form.email){
      setOpen1(true)
      setStep(1);
      return
    }
    if(form.firstName === '' || form.lastName === '' || form.email === ''){
      Swal.fire({
        title: "Warning",
        text: `The system did not recognized or find registered user information.Please Register first your account to continue filling up the form`,
        icon: "warning",
        button: "OK",
      });
      setStep(1);
      return
    }
    errors.gender = await validateText(form.gender,50,'Gender');
    errors.birthday = await validateField(form.birthday,50,'Birthday');
    errors.housenum = await validateField(form.housenum,50,'House Numer/Street');
    errors.baranggay =await validateField(form.baranggay,50,'Barangay');
    errors.School = await validateField(form.School,300,'School');
    errors.gradeLevel = await validateField(form.gradeLevel,50,'Grade Level');
    errors.SchoolAddress = await validateField(form.SchoolAddress,500,'School Address');
    errors.yearLevel = await validateField(form.yearLevel,50,'Year Level');
    errors.course = await validateField(form.course,150,'Course');
    errors.age = await validateAge(form.age)
    errors.birthPlace = await validateField(form.birthPlace,200,'Birth Place');
    errors.contactNum = await validateCellphoneNumber(form.contactNum,'Contact Number');
    const fulladress = `${form.housenum} ${form.baranggay} MARILAO BULACAN`;
    dispatch(setForm({ ["address"]: fulladress }));
    
    if(form.yearLevel === 'ELEMENTARY'){
      dispatch(setForm({ ["course"]: "NONE" }));
    }
    const isError = Object.values(errors).every(error => error === undefined)
  console.log(isError)
  console.log(errors)
    if (isError !== true) {
      setErrors(errors);
      return;
    }
    setErrors('')
    setStep(2)
};
const findCreatedAcc = async() =>{
  setOpen1(false)
  const { value: email } = await Swal.fire({
    title: 'Input email address',
    input: 'email',
    inputPlaceholder: 'Enter your email address',
    confirmButtonText: "Submit",
    cancelButtonText: "Already Registered",
  })
  
  if (email) {
     await FindRegisteredUser.FETCH_USERREG(email)
     .then((res) =>{
      if(res.data.success === 1){
        const result = res.data.result[0];
        const { applicantNum, fname, lname, mname, email,userType } = result;  
        const formFields = {
          applicantNum,
          firstName: fname,
          lastName: lname,
          middleName: mname,
          email,
          userType,
        };
        if(userType !== 'Guardian'){
          Object.entries(formFields).forEach(([key, value]) => dispatch(setForm({ [key]: value })));
        }else{
          dispatch(setForm({ 'userType': userType }))
          dispatch(setForm({ 'email': email }))
          dispatch(setForm({ 'guardianName': fname.toUpperCase() }))
          dispatch(setForm({ 'guardianlName': lname.toUpperCase() }))
          dispatch(setForm({ 'guardianmName': mname.toUpperCase() }))
        }
        navigate('/ApplicationForm')
        Swal.fire('Successfully Find your Registered Email')
      }else{
        Swal.fire(res.data.message)
      }
     })
  }
}
const handleRegister = () => {
  navigate('/register');
};

  return (
  <>
  <Dialog open={open1} onClose={handleClose1}>
        <DialogTitle>Warning</DialogTitle>
        <DialogContent>
          <DialogContentText>
            The system did not recognize or find registered user information. Please Register first your email account to continue filling up the form or if you think you already registered, click the buttons below:
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button className='myButton' onClick={handleRegister}>
           Go to Register
          </button>
          <button className='myButton' onClick={findCreatedAcc}>
            Already Registered?Find your Email now!
          </button>
        </DialogActions>
  </Dialog>
  <Dialog
    open={open}
    TransitionComponent={Transition}
    keepMounted
    onClose={handleClose}
    aria-describedby="alert-dialog-slide-description"
  >
    <DialogTitle> Step#2: Fill up the Application Form</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-slide-description">

        *Completely accomplish the online application form. Once done, you will 
        received an email that your Application form was sent and we will inform you 
        when it is reviewed and evaluated .<br/>
        Note: Please fill out all required fields with accurate information and if it not applicable please input 'None' instead.<br/><br/>
        

      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Ok</Button>
    </DialogActions>
  </Dialog>
  <div className='w-full bg-white'>
    <div className="w-full">
      <div className='w-full'>
        <div className='w-full p-8'>
          <div className='flex flex-col flex-wrap lg:flex-row p-2 w-full'>
              <TextInput
                  label={form.userType === 'Guardian' ? "Student Last Name" : "Last Name"}
                  type={'text'}
                  required={form.userType === 'Guardian' ? true : false}
                  name='lastName'
                  value={form['lastName']}
                  onChange={handleInputChange}
                  readonly={form.userType === 'Guardian' ? false : true}
              />  
              <TextInput
                  label={form.userType === 'Guardian' ? "Student First Name" : "First Name"}
                  type={'text'}
                  required={form.userType === 'Guardian' ? true : false}
                  name='firstName'
                  value={form['firstName']}
                  onChange={handleInputChange}
                  readonly={form.userType === 'Guardian' ? false : true}
              />  
              <TextInput
                  label={form.userType === 'Guardian' ? "Student Middle Name" : "Middle Name"}
                  type={'text'}
                  required={form.userType === 'Guardian' ? true : false}
                  name='middleName'
                  value={form['middleName']}
                  onChange={handleInputChange}
                  readonly={form.userType === 'Guardian' ? false : true}
              />  
              <SelectInput
                label={t("Suffix")}
                required={false}
                value={form.suffix}
                onChange={handleOptionChange}
                options={suffixList}
              />
          </div>
          <div className='flex flex-col flex-wrap lg:flex-row p-2 w-full'>
              <TextInput
                  label={t("House No/Street")}
                  required={true}
                  type={'text'}
                  name='housenum'
                  placeholder='e.g., 123 Main Street'
                  value={form.housenum}
                  onChange={handleInputChange}
                  error={errors.housenum}
                  readonly={false}
                />
              <SelectInput
                label={t("Barangay")}
                required={true}
                value={form.baranggay}
                onChange={handleOptionChange}
                options={barangayList}
                error={errors.baranggay}
              />
          </div>
          <div className='flex flex-col flex-wrap lg:flex-row p-2 w-full'>
              <TextInput
                  label={t("City")}
                  type={'text'}
                  required={false}
                  name='city'
                  value={'Marilao'}
                  readonly={true}
              />
              <TextInput
                  label={t("Province")}
                  type={'text'}
                  required={false}
                  name='province'
                  value={'Bulacan'}
                  readonly={true}
              />
          </div>
          <div className='flex flex-col gap-2 flex-wrap lg:flex-row p-2 w-full'>
              <SelectInput
                label={t("Gender")}
                required={true}
                value={form.gender}
                onChange={handleOptionChange}
                options={genderList}
                error={errors.gender}
              />
              <TextInput
                  label={t("Birth Date")}
                  type={'date'}
                  required={true}
                  name='birthday'
                  value={form['birthday']}
                  onChange={handleInputChange}
                  error={errors.birthday}
                  readonly={false}
              />
              <TextInput
                  label={t("Age")}
                  type={'text'}
                  required={true}
                  name='age'
                  value={form['age']}
                  error={errors.age}
                  readonly={true}
              />
          </div>
          <div className='flex flex-col flex-wrap lg:flex-row p-2 w-full'>
              <TextInput
                  label={t("Birth Place")}
                  type={'text'}
                  required={true}
                  name='birthPlace'
                  onChange={handleInputChange}
                  error={errors.birthPlace}
                  value={form['birthPlace']}
                  readonly={false}
              />
              <TeleInput
                  label={t("Mobile Number")}
                  type={'text'}
                  required={true}
                  name='contactNum'
                  onChange={handleInputChange}
                  error={errors.contactNum}
                  value={form['contactNum']}
                  readonly={false}
              />
          </div>
        </div>
      </div>
      <div className='w-full'>
        <h4 className='w-full bg-[#043F97] text-white pl-2 py-4 text-lg font-bold'>{t("Educational Information")}</h4>
        <div className='w-full p-8'>
            <div className='flex flex-col flex-wrap lg:flex-row p-2 w-full'>
              <TextInput
                    label={t("Last School Attended")}
                    type={'text'}
                    required={true}
                    name='School'
                    onChange={handleInputChange}
                    error={errors.School}
                    value={form['School']}
                    readonly={false}
                />                 
              <TextInput
                    label={t("School Address")}
                    type={'text'}
                    required={true}
                    name='SchoolAddress'
                    onChange={handleInputChange}
                    error={errors.SchoolAddress}
                    value={form['SchoolAddress']}
                    readonly={false}
                />                 
            </div>
            <div className='flex flex-col flex-wrap gap-2 lg:flex-row p-2 w-full'>
                <SelectInput
                  label={t("Year Level")}
                  required={true}
                  value={form.yearLevel}
                  onChange={handleOptionChange}
                  error={errors.yearLevel}
                  options={yearList}
                />
                {form['yearLevel'] !== '' && (<SelectInput
                  label={t("Grade/Year")}
                  required={true}
                  value={form.gradeLevel}
                  onChange={handleOptionChange}
                  error={errors.gradeLevel}
                  options={getOptionsBasedOnYearLevel()}
                />)}
                {form['yearLevel'] !== 'COLLEGE' && form.yearLevel !== 'SENIOR HIGHSCHOOL' ? (null) : (<SelectInput
                  label={t("Course")}
                  required={true}
                  value={form.course}
                  error={errors.course}
                  onChange={handleOptionChange}
                  options={getOptionsBasedOnGradeLevel()}
                />)}
            </div>
        </div>
      </div>
      <div className='w-full flex justify-end items-end pr-4 pb-4'>
          <CustomButton
            label={'Next'}
            color={'blue'}
            loading={false}
            onClick={Check}
          />
      </div>
    </div>
  </div>
  </>
)
}


export default Firststep