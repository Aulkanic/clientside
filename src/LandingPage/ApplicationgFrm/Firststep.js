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
import { ScholarCategory,FindRegisteredUser} from '../../Api/request.js'
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


function Firststep() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const form = useSelector((state) => state.form)
  const [open, setOpen] = useState(false);
  const { setStep, userData, setUserData} = useContext(multiStepContext);
  const [errors, setErrors] = useState({}); 
  const [scholarprog, setScholarProg] = useState([]);
  const [rule,setRule] = useState([])
  const [open1, setOpen1] = useState(false);
  const savehnum = localStorage.getItem('housenum')
  const [housenum,setHousenum] = useState(savehnum || savehnum !== null ? savehnum : '')

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
    dispatch(setForm({ [name]: value }));
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
  }, [form.birthday]);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const scholist = await ScholarCategory.ScholarshipProgram();
        const schodata = scholist.data.SchoCat;
        const schoav = schodata.filter(data => data.status === 'Open')
        const rul = await Rulelist.FETCH_RULE()
       
        setRule(rul.data.result[0])
        setScholarProg(schoav);
      } catch (error) {
        console.error(error);
      }
    }
    
    fetchData();

  }, []);

  function Check(){
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
    if (!form.gender) {
      errors.form = "Please Select your Gender";
    }
    if (!form.birthday || form.birthday === '') {
      errors.birthday = "Birthday is required";
    }
    if (!form.housenum || form.housenum === '') {
      errors.housenum = "House No./Street is required";
    }
    if (!form.baranggay || form.baranggay === '') {
      errors.baranggay = "Select your Baranggay";
    }
    if (!form.School || form.School === '') {
      errors.School = "School is required";
    }
    if (!form.gradeLevel || form.gradeLevel === '') {
      errors.gradeLevel = "Grade Level is required";
    }
    if (!form.SchoolAddress || form.SchoolAddress === '') {
      errors.SchoolAddress = "SchoolAddress is required";
    }
    if (!form.yearLevel || form.yearLevel === '') {
      errors.yearLevel = "Select your Year Level";
    }
    if (!form.course || form.course === '') {
      errors.course = "Select your Course";
    }
    if (form.age === '') {
      errors.age = "Age is required";
    } else if (form.age <= 0) {
      errors.age = "Invalid Age";
    }else if (/[a-zA-Z]/.test(form.age)) {
      errors.age = "Input must not contain letter value";
    }else if (/[!@#$%^&*/_(),.?":{}|<>]/.test(form.age)) {
      errors.age = "Special characters are not allowed.";
    }else if(form.age <=5){
      errors.age = 'Minimum age for application is five years old';
    }
    if (form.birthPlace === '' || !form.birthPlace) {
      errors.birthPlace = "Birth of Place is required";
    } else if (form.birthPlace?.length === 1) {
      errors.birthPlace = "Input must not contain a single letter.";
    }else if (/[!@#$%^&*/_()?":{}|<>]/.test(form.age)) {
      errors.age = "Special characters are not allowed.";
    }
    if (form.contactNum === '' || !form.contactNum) {
      errors.contactNum = "Phone Number is required";
    } else if (!/^9\d{9}$/.test(form.contactNum)) {
      errors.contactNum = "Invalid phone number.";
    }
    const fulladress = `${form.housenum} ${form.baranggay} MARILAO BULACAN`;
    dispatch(setForm({ ["address"]: fulladress }));
    
    if(form.yearLevel !== 'COLLEGE' && form.yearLevel !== 'SENIOR HIGHSCHOOL'){
      dispatch(setForm({ ["course"]: "NONE" }));
    }
    if (!errors || Object.keys(errors).length > 0) {
    
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
        const fname = result.fname;
        const applicantNum = result.applicantNum
        const lname = result.lname;
        const mname = result.mname;
        const email = result.email;
        dispatch(setForm({ ["applicantNum"]: applicantNum }));
        dispatch(setForm({ ["firstName"]: fname }));
        dispatch(setForm({ ["lastName"]: lname }));
        dispatch(setForm({ ["middleName"]: mname }));
        dispatch(setForm({ ["email"]: email }));
        navigate('/ApplicationForm')
        Swal.fire('Successfully Find your Registered Email')
      }else{
        Swal.fire(res.data.message)
      }
     })
  }
}

useEffect(() =>{
    localStorage.setItem('housenum',housenum)
},[housenum])
const handleRegister = () => {
  navigate('/register');
};

useEffect(() => {
  const fieldsToCheck = ['housenum', 'birthPlace', 'School', 'SchoolAddress'];
  const errors = {};

  fieldsToCheck?.forEach((field) => {
    const fieldValue = field === 'housenum' ? housenum : userData[field];
    if (fieldValue && fieldValue.trim() !== '' && !/^[A-Z\s!@#$%^&*()_+{}\[\]:;"'<>,.?|\\/0-9]*$/.test(fieldValue)) {
      errors[field] = 'Use uppercase format only';
    } else {
      delete errors[field];
    }
  });

  setErrors(errors);
}, [housenum, userData.birthPlace, userData.School, userData.SchoolAddress]);

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
          <Button className='myButton' sx={{color:'white',textTransform:'none'}} onClick={handleRegister} color="primary">
           Go to Register
          </Button>
          <Button className='myButton' sx={{color:'white',textTransform:'none'}} onClick={findCreatedAcc} color="primary">
            Already Registered?Find your Email now!
          </Button>
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
  <div className='FirstepFrm'>
          <div className="w-full">
          <div className='w-full'>
            <div className='w-full p-8'>
              <div className='flex flex-col flex-wrap lg:flex-row p-2 w-full'>
                  <TextInput
                      label={t("Last Name")}
                      type={'text'}
                      required={false}
                      name='lastName'
                      value={form['lastName']}
                      readonly={true}
                  />  
                  <TextInput
                      label={t("First Name")}
                      type={'text'}
                      required={false}
                      name='firstName'
                      value={form['firstName']}
                      readonly={true}
                  />  
                  <TextInput
                      label={t("Middle Name")}
                      type={'text'}
                      required={false}
                      name='middleName'
                      value={form['middleName']}
                      readonly={true}
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
           <Button className='myButton' variant="contained" onClick={Check}>Next</Button>
          </div>
          </div>
  </div>
  </>
)
}


export default Firststep