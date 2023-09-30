import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { multiStepContext } from './StepContext';
import {  useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { ScholarCategory,FindRegisteredUser} from '../../Api/request.js'
import { Rulelist} from '../../Api/request.js';
import Swal from 'sweetalert2';
import TextField from '@mui/material/TextField';
import { useDispatch } from 'react-redux';
import { setName } from '../../Redux/userSlice';
import '../css/Firststep.css'
import '../css/buttonStyle.css'
import { useTranslation } from 'react-i18next';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


function Firststep() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { setStep, userData, setUserData} = useContext(multiStepContext);
  const [errors, setErrors] = useState({}); 
  const [scholarprog, setScholarProg] = useState([]);
  const [rule,setRule] = useState([])
  const [open1, setOpen1] = useState(false);
  const [housenum,setHousenum] = useState('')

  const handleClose = () => {
    setOpen(false);
  };
  const handleClose1 = () => {
    setOpen1(false);
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
    const { birthday } = userData;
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
    setUserData((prevData) => ({ ...prevData, age: age.toString() }));
  }, [userData.birthday]);
  
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
    if(!userData.firstName || !userData.lastName || !userData.email){
      setOpen1(true)
      setStep(1);
      return
    }
    if(userData.firstName === '' || userData.lastName === '' || userData.email === ''){
      Swal.fire({
        title: "Warning",
        text: `The system did not recognized or find registered user information.Please Register first your account to continue filling up the form`,
        icon: "warning",
        button: "OK",
      });
      setStep(1);
      return
    }
    if (!userData.gender) {
      errors.gender = "Please Select your Gender";
    }
    if (!userData.birthday || userData.birthday === '') {
      errors.birthday = "Birthday is required";
    }
    if (!housenum || housenum === '') {
      errors.housenum = "This field is required";
    }
    if (!userData.baranggay || userData.baranggay === '') {
      errors.baranggay = "Select your Baranggay";
    }
    if (!userData.School || userData.School === '') {
      errors.School = "This field is required";
    }
    if (!userData.gradeLevel || userData.gradeLevel === '') {
      errors.gradeLevel = "This field is required";
    }
    if (!userData.SchoolAddress || userData.SchoolAddress === '') {
      errors.SchoolAddress = "This field is required";
    }
    if (!userData.yearLevel || userData.yearLevel === '') {
      errors.yearLevel = "Select your Year Level";
    }
    if (!userData.course || userData.course === '') {
      errors.course = "Select your Course";
    }
    if (userData.age === '') {
      errors.age = "Age is required";
    } else if (userData.age <= 0) {
      errors.age = "Invalid Age";
    }else if (/[a-zA-Z]/.test(userData.age)) {
      errors.age = "Input must not contain letter value";
    }else if (/[!@#$%^&*/_(),.?":{}|<>]/.test(userData.age)) {
      errors.age = "Special characters are not allowed.";
    }else if(userData.age <=5){
      errors.age = 'Minimum age for application is five years old';
    }
    if (userData.birthPlace === '') {
      errors.birthPlace = "Birth of Place is required";
    } else if (userData.birthPlace.length === 1) {
      errors.birthPlace = "Input must not contain a single letter.";
    }else if (/[!@#$%^&*/_()?":{}|<>]/.test(userData.age)) {
      errors.age = "Special characters are not allowed.";
    }
    if (userData.contactNum === '') {
      errors.contactNum = "Phone Number is required";
    } else if (!/^09\d{9}$/.test(userData.contactNum)) {
      errors.contactNum = "Invalid phone number.";
    }

    

    if (Object.keys(errors).length > 0) {
      console.log(errors)
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
        const lname = result.lname;
        const email = result.email;
        const applicantNum = result.applicantNum;
        dispatch(setName({fname,lname,email,applicantNum}))
        userData.firstName = fname;
        userData.lastName = lname;
        userData.email = email;
        userData.applicantNum = applicantNum;
        navigate('/ApplicationForm')
        Swal.fire('Successfully Find your Registered Email')
      }else{
        Swal.fire(res.data.message)
      }
     })
  }
}
const handleRegister = () => {
  // Redirect to the registration route
  navigate('/register');
};

useEffect(() => {
  const fieldsToCheck = ['housenum', 'birthPlace', 'School', 'SchoolAddress'];
  const errors = {};

  fieldsToCheck.forEach((field) => {
    if (/[a-z]/.test(field === 'housenum' ? housenum : userData[field])) {
      errors[field] = 'Use uppercase format only';
    } else {
      delete errors[field];
    }
  });

  setErrors(errors);
}, [housenum, userData.birthPlace, userData.School, userData.SchoolAddress]);
  console.log(userData)
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

      <div className="FFd">
          <div className="form">
          <div className='containerform'>
          <Row className="mb-3">
          <Form.Group as={Col}>
              <Form.Label className='frmlabel'>{t("First Name")}</Form.Label>
              <Form.Control 
              type="text" 
              value={userData['firstName']} 
              disabled
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label className='frmlabel'>{t("Last Name")}</Form.Label>
              <Form.Control
               type="text" 
               value={userData['lastName']} 
               disabled
               />
            </Form.Group>
            <Form.Group className='col-md-3'>
              <Form.Label className='frmlabel'>Suffix</Form.Label>
              <Form.Select aria-label="Default select example"
              value={userData['suffix']} 
              onChange={(e) =>setUserData({...userData,"suffix" : e.target.value})}
              >
              <option value=""></option>
              <option value="JR">JR</option>
              <option value="SR">SR</option>
              <option value="II">II</option>
              <option value="III">III</option>
              <option value="IV">IV</option>
              <option value="IX">IX</option>
              <option value="V">V</option>
              <option value="VI">VI</option>
              <option value="XV">XV</option>
              <option value="VII">VII</option>
              <option value="VII">VII</option>
              <option value="X">X</option>
              <option value="XI">XI</option>
              <option value="XI">XII</option>
              <option value="XIII">XIII</option>
              <option value="XIV">XIV</option>
            </Form.Select>
            </Form.Group>
            <div>

            </div>
          </Row>
          <Row className="mb-3">
             <Form.Group as={Col}>
            <Form.Label className='frmlabel'>House No/Street</Form.Label>
            <Form.Control
              type="text"
              name="houseNoStreet"
              value={housenum}
              placeholder="e.g., 123 Main Street"
              onChange={(e) =>setHousenum(e.target.value)}
            />
            {errors.housenum && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.housenum}</p>}
              </Form.Group>
          <Form.Group as={Col}>
            <Form.Label className='frmlabel'>Barangay</Form.Label>
            <Form.Select
              as="select"
              name="barangay"
              onChange={(e) =>setUserData({...userData,"baranggay" : e.target.value})}
            >
                <option value={''}>Please select baranggay</option>
                <option value={'Abangan Norte'}>Abangan Norte</option>
                <option value={'Abangan Sur'}>Abangan Sur</option>
                <option value={'Ibayo'}>Ibayo</option>
                <option value={'Lambakin'}>Lambakin</option>
                <option value={'Lias'}>Lias</option>
                <option value={'Loma de Gato'}>Loma de Gato</option>
                <option value={'Nagbalon'}>Nagbalon</option>
                <option value={'Patubig'}>Patubig</option>
                <option value={'Poblacion I'}>Poblacion I</option>
                <option value={'Poblacion II'}>Poblacion II</option>
                <option value={'Prenza I'}>Prenza I</option>
                <option value={'Prenza II'}>Prenza II</option>
                <option value={'Saog'}>Saog</option>
                <option value={'Sta. Rosa I'}>Sta. Rosa I</option>
                <option value={'Sta. Rosa II'}>Sta. Rosa II</option>
                <option value={'Tabing-Ilog'}>Tabing-Ilog</option>
            </Form.Select>
            {errors.baranggay && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.baranggay}</p>}
          </Form.Group>
          </Row>
          <Row className='mb-3'>
            <Form.Group as={Col}>
              <Form.Label className='frmlabel'>City</Form.Label>
              <Form.Control
                type="text"
                value={'Marilao'}
                name="city"
                readOnly
                disabled
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label className='frmlabel'>Province</Form.Label>
              <Form.Control
                type="text"
                value={'Bulacan'}
                name="province"
                readOnly
                disabled
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label className='frmlabel'>{t("Gender")}</Form.Label>
            <Form.Select aria-label="Default select example"
              value={userData['gender']} 
              onChange={(e) =>setUserData({...userData,"gender" : e.target.value})}
            >
              <option>Select your gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </Form.Select>
            {errors.gender && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.gender}</p>}
            </Form.Group>

            <Form.Group as={Col}>
            <Form.Label className='frmlabel'>{t("Birth Date")}</Form.Label>
              <Form.Control 
              type="date" 
              value={userData['birthday']} 
              onChange={(e) =>setUserData({...userData,"birthday" : e.target.value})}       
              />
              {errors.birthday && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.birthday}</p>}
            </Form.Group>

            <Form.Group as={Col}>
            <Form.Label className='frmlabel'>{t("Age")}</Form.Label>
              <Form.Control value={userData['age']} type="number" disabled />
              {errors.age && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.age}</p>}
            </Form.Group>
          </Row>
          <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label className='frmlabel'>{t("Birth Place")}</Form.Label>
            <Form.Control 
            type="text"
            placeholder='House No., Street, Barangay, Municipality' 
            value={userData['birthPlace']} 
            onChange={(e) =>setUserData({...userData,"birthPlace" : e.target.value})}
            />
           {errors.birthPlace && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.birthPlace}</p>}
            </Form.Group>

            <Form.Group as={Col}>
            <Form.Label className='frmlabel'>Mobile Number</Form.Label>
            <Form.Control type="text" placeholder='09xxxxxxxxx'
              value={userData['contactNum']} 
              onChange={(e) =>setUserData({...userData,"contactNum" : e.target.value})}
            />
               {errors.contactNum && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.contactNum}</p>}
            </Form.Group>
          </Row>
          </div>
          <div className='containerform'>
          <h4 style={{color:"#0b4980",marginTop:'10px'}} className='h4head'>{t("Educational Information")}</h4>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label className='frmlabel'>{t("Last School Attended")}</Form.Label>
              <Form.Control 
              type="text"
              value={userData['School']} 
              placeholder='e.g., ABC Elementary School'
              onChange={(e) =>setUserData({...userData,"School" : e.target.value})}
              />
            {errors.School && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.School}</p>}
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label className='frmlabel'>{t("School Address")}</Form.Label>
              <Form.Control type="text"
               value={userData['SchoolAddress']} 
               placeholder='Please enter the address of your last school ...'
               onChange={(e) =>setUserData({...userData,"SchoolAddress" : e.target.value})}
              />
             {errors.SchoolAddress && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.SchoolAddress}</p>}
            </Form.Group>
          </Row>
          <Row className="mb-3">
          <Form.Group as={Col}>
              <Form.Label className='frmlabel'>{t("Year Level")}</Form.Label>
              <Form.Select
                value={userData['yearLevel']} 
                onChange={(e) =>setUserData({...userData,"yearLevel" : e.target.value})}
              >
                <option value={''}>Select your year level</option>
                <option value={'Elementary'}>Elementary</option>
                <option value={'Junior Highschool'}>Junior Highschool</option>
                <option value={'Senior Highschool'}>Senior Highschool</option>
                <option value={'College'}>College</option>
              </Form.Select>
              {errors.yearLevel && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.yearLevel}</p>}
            </Form.Group>
            {userData['yearLevel'] !== '' && (<Form.Group as={Col}>
              <Form.Label className='frmlabel'>Grade/Year:</Form.Label>
              <Form.Select
              value={userData['gradeLevel']} 
              onChange={(e) =>setUserData({...userData,"gradeLevel" : e.target.value})}
              >
                {userData.yearLevel === 'Elementary' && (<>
                  <option value={''}>Select your grade level</option>
                <option value={'Grade 1'}>Grade 1</option>
                <option value={'Grade 2'}>Grade 2</option>
                <option value={'Grade 3'}>Grade 3</option>
                <option value={'Grade 4'}>Grade 4</option>
                <option value={'Grade 5'}>Grade 5</option>
                <option value={'Grade 6'}>Grade 6</option>
                </>)}
                {userData.yearLevel === 'Junior Highschool' && (<>
                  <option value={''}>Select your grade level</option>
                <option value={'Grade 7'}>Grade 7</option>
                <option value={'Grade 8'}>Grade 8</option>
                <option value={'Grade 9'}>Grade 9</option>
                <option value={'Grade 10'}>Grade 10</option>
                </>)}
                {userData.yearLevel === 'Senior Highschool' && (<>
                  <option>Select your grade level</option>
                <option value={'Grade 11'}>Grade 11</option>
                <option value={'Grade 12'}>Grade 12</option>
                </>)}
                {userData.yearLevel === 'College' && (<>
                  <option value={''}>Select your grade level</option>
                <option value={'1st Year'}>1st Year</option>
                <option value={'2nd Year'}>2nd Year</option>
                <option value={'3rd Year'}>3rd Year</option>
                <option value={'4th Year'}>4th Year</option>
                </>)}
              </Form.Select>
                 {errors.gradeLevel && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.gradeLevel}</p>}
            </Form.Group>)}
            {userData.yearLevel !== 'College' && userData.yearLevel !== 'Senior Highschool' ? (null) : (<Form.Group as={Col}>
              <Form.Label className='frmlabel'>{t("Course")}</Form.Label>
              <Form.Select 
                value={userData.yearLevel !== 'College' && userData.yearLevel !== 'Senior Highschool' ? 'None' : userData.course}
                defaultValue={userData.yearLevel !== 'College' || userData.yearLevel !=='Senior Highschool' && ('None') }
                onChange={(e) => {
                  const selectedValue = e.target.value;
                  const newCourse = userData.yearLevel !== 'College' || userData.yearLevel !== 'Senior Highschool' ? 'None' : selectedValue;
                  setUserData({ ...userData, course: newCourse });
                }}
              
              >
                {userData.yearLevel === 'College' && (
                  <>
                <option>Select your course</option>
                <option value={'Bachelor fo Science in Respiratory Therapy'}>Bachelor fo Science in Respiratory Therapy</option>
                <option value={'Bachelor in Landscape Architecture'}>Bachelor in Landscape Architecture</option>
                <option value={'Bachelor in Secondary Education Major in Mathematics'}>Bachelor in Secondary Education Major in Mathematics</option>
                <option value={'Bachelor in Secondary Education Major in Science'}>Bachelor in Secondary Education Major in Science</option>
                <option value={'Bachelor of Culture and the Arts Education'}>Bachelor of Culture and the Arts Education</option>
                <option value={'Bachelor of Data Science and Analytics'}>Bachelor of Data Science and Analytics</option>
                <option value={'Bachelor of Early Childhood Education'}>Bachelor of Early Childhood Education</option>
                <option value={'Bachelor of Fine Arts'}>Bachelor of Fine Arts</option>
                <option value={'Bachelor of Library and Information Science'}>Bachelor of Library and Information Science</option>
                <option value={'Bachelor of Medical Laboratory Science'}>Bachelor of Medical Laboratory Science</option>
                <option value={'Bachelor of Science in Accountancy'}>Bachelor of Science in Accountancy</option>
                <option value={'Bachelor of Science in Agribusiness'}>Bachelor of Science in Agribusiness</option>
                <option value={'Bachelor of Science in Agricultural and Biosystems Engineering'}>Bachelor of Science in Agricultural and Biosystems Engineering</option>
                <option value={'Bachelor of Science in Agroforestry'}>Bachelor of Science in Agroforestry</option>
                <option value={'Bachelor of Science in Aircraft Maintenance Technology'}>Bachelor of Science in Aircraft Maintenance Technology</option>
                <option value={'Bachelor of Science in Applied Mathematics'}>Bachelor of Science in Applied Mathematics</option>
                <option value={'Bachelor of Science in Applied Physics'}>Bachelor of Science in Applied Physics</option>
                <option value={'Bachelor of Science in Applied Statistics'}>Bachelor of Science in Applied Statistics</option>
                <option value={'Bachelor of Science in Architecture'}>Bachelor of Science in Architecture</option>
                <option value={'Bachelor of Science in Aviation'}>Bachelor of Science in Aviation</option>
                <option value={'Bachelor of Science in Aviation Technology'}>Bachelor of Science in Aviation Technology</option>
                <option value={'Bachelor of Science in Biochemistry'}>Bachelor of Science in Biochemistry</option>
                <option value={'Bachelor of Science in Biology'}>Bachelor of Science in Biology</option>
                <option value={'Bachelor of Science in Botany'}>Bachelor of Science in Botany</option>
                <option value={'Bachelor of Science in Business Administration Major in Business Analytics'}>Bachelor of Science in Business Administration Major in Business Analytics</option>
                <option value={'Bachelor of Science in Business Analytics'}>Bachelor of Science in Business Analytics</option>
                <option value={'Bachelor of Science in Ceramic Engineering'}>Bachelor of Science in Ceramic Engineering</option>
                <option value={'Bachelor of Science in Chemical Engineering'}>Bachelor of Science in Chemical Engineering</option>
                <option value={'Bachelor of Science in Chemistry'}>Bachelor of Science in Chemistry</option>
                <option value={'Bachelor of Science in Civil Engineering'}>Bachelor of Science in Civil Engineering</option>
                <option value={'Bachelor of Science in Climate Change'}>Bachelor of Science in Climate Change</option>
                <option value={'Bachelor of Science in Community Development'}>Bachelor of Science in Community Development</option>
                <option value={'Bachelor of Science in Computer Engineering'}>Bachelor of Science in Computer Engineering</option>
                <option value={'Bachelor of Science in Computer Science'}>Bachelor of Science in Computer Science</option>
                <option value={'Bachelor of Science in Cyber Security'}>Bachelor of Science in Cyber Security</option>
                <option value={'Bachelor of Science in Disaster Risk Management'}>Bachelor of Science in Disaster Risk Management</option>
                <option value={'Bachelor of Science in Electrical Engineering'}>Bachelor of Science in Electrical Engineering</option>
                <option value={'Bachelor of Science in Electronics and Communications Engineering'}>Bachelor of Science in Electronics and Communications Engineering</option>
                <option value={'Bachelor of Science in Electronics Engineering'}>Bachelor of Science in Electronics Engineering</option>
                <option value={'Bachelor of Science in Engineering Technology'}>Bachelor of Science in Engineering Technology</option>
                <option value={'Bachelor of Science in Entertainment and Multimedia Computing'}>Bachelor of Science in Entertainment and Multimedia Computing</option>
                <option value={'Bachelor of Science in Environmental Planning'}>Bachelor of Science in Environmental Planning</option>
                <option value={'Bachelor of Science in Environmental Science'}>Bachelor of Science in Environmental Science</option>
                <option value={'Bachelor of Science in Food Engineering'}>Bachelor of Science in Food Engineering</option>
                <option value={'Bachelor of Science in Game Development and Animation'}>Bachelor of Science in Game Development and Animation</option>
                <option value={'Bachelor of Science in Geodetic Engineering'}>Bachelor of Science in Geodetic Engineering</option>
                <option value={'Bachelor of Science in Geology'}>Bachelor of Science in Geology</option>
                <option value={'Bachelor of Science in Hospitality Management'}>Bachelor of Science in Hospitality Management</option>
                <option value={'Bachelor of Science in Human Biology'}>Bachelor of Science in Human Biology</option>
                <option value={'Bachelor of Science in Human Services'}>Bachelor of Science in Human Services</option>
                <option value={'Bachelor of Science in Indigenous Peoples Education'}>Bachelor of Science in Indigenous Peoples Education</option>
                <option value={'Bachelor of Science in Indigenous Peoples Studies'}>Bachelor of Science in Indigenous Peoples Studies</option>
                <option value={'Bachelor of Science in Industrial Engineering'}>Bachelor of Science in Industrial Engineering</option>
                <option value={'Bachelor of Science in Industrial Technology'}>Bachelor of Science in Industrial Technology</option>
                <option value={'Bachelor of Science in Information Systems'}>Bachelor of Science in Information Systems</option>
                <option value={'Bachelor of Science in Information Technology'}>Bachelor of Science in Information Technology</option>
                <option value={'Bachelor of Science in Interior Design'}>Bachelor of Science in Interior Design</option>
                <option value={'Bachelor of Science in Manufacturing Engineering'}>Bachelor of Science in Manufacturing Engineering</option>
                <option value={'Bachelor of Science in Marine Biology'}>Bachelor of Science in Marine Biology</option>
                <option value={'Bachelor of Science in Marine Engineering'}>Bachelor of Science in Marine Engineering</option>
                <option value={'Bachelor of Science in Marine Transportation'}>Bachelor of Science in Marine Transportation</option>
                <option value={'Bachelor of Science in Materials Engineering'}>Bachelor of Science in Materials Engineering</option>
                <option value={'Bachelor of Science in Mathematics'}>Bachelor of Science in Mathematics</option>
                <option value={'Bachelor of Science in Mechanical Engineering'}>Bachelor of Science in Mechanical Engineering</option>
                <option value={'Bachelor of Science in Mechatronics Engineering'}>Bachelor of Science in Mechatronics Engineering</option>
                <option value={'Bachelor of Science in Mechatronics Engineering Technology'}>Bachelor of Science in Mechatronics Engineering Technology</option>
                <option value={'Bachelor of Science in Medical Technology'}>Bachelor of Science in Medical Technology</option>
                <option value={'Bachelor of Science in Metallurgical Engineering'}>Bachelor of Science in Metallurgical Engineering</option>
                <option value={'Bachelor of Science in Meteorology'}>Bachelor of Science in Meteorology</option>
                <option value={'Bachelor of Science in Midwifery'}>Bachelor of Science in Midwifery</option>
                <option value={'Bachelor of Science in Mining Engineering'}>Bachelor of Science in Mining Engineering</option>
                <option value={'Bachelor of Science in Molecular Biology and Biotechnology'}>Bachelor of Science in Molecular Biology and Biotechnology</option>
                <option value={'Bachelor of Science in Nursing'}>Bachelor of Science in Nursing</option>
                <option value={'Bachelor of Science in Nutrition and Dietetics'}>Bachelor of Science in Nutrition and Dietetics</option>
                <option value={'Bachelor of Science in Occupational Therapy'}>Bachelor of Science in Occupational Therapy</option>
                <option value={'Bachelor of Science in Peace Education'}>Bachelor of Science in Peace Education</option>
                <option value={'Bachelor of Science in Peace Studies'}>Bachelor of Science in Peace Studies</option>
                <option value={'Bachelor of Science in Petroleum Engineering'}>Bachelor of Science in Petroleum Engineering</option>
                <option value={'Bachelor of Science in Physical Therapy'}>Bachelor of Science in Physical Therapy</option>
                <option value={'Bachelor of Science in Physics'}>Bachelor of Science in Physics</option>
                <option value={'Bachelor of Science in Production Engineering'}>Bachelor of Science in Production Engineering</option>
                <option value={'Bachelor of Science in Radiologic Technology'}>Bachelor of Science in Radiologic Technology</option>
                <option value={'Bachelor of Science in Renewable Energy'}>Bachelor of Science in Renewable Energy</option>
                <option value={'Bachelor of Science in Robotics Engineering'}>Bachelor of Science in Robotics Engineering</option>
                <option value={'Bachelor of Science in Sanitary Engineering'}>Bachelor of Science in Sanitary Engineering</option>
                <option value={'Bachelor of Science in Social Work'}>Bachelor of Science in Social Work</option>
                <option value={'Bachelor of Science in Speech-Language Pathology'}>Bachelor of Science in Speech-Language Pathology</option>
                <option value={'Bachelor of Science in Statistics'}>Bachelor of Science in Statistics</option>
                <option value={'Bachelor of Science in Structural Engineering'}>Bachelor of Science in Structural Engineering</option>
                <option value={'Bachelor of Science in Sustainable Energy'}>Bachelor of Science in Sustainable Energy</option>
                <option value={'Bachelor of Science in Tourism'}>Bachelor of Science in Tourism</option>
                <option value={'Bachelor of Science in Tourism Management'}>Bachelor of Science in Tourism Management</option>
                <option value={'Bachelor of Science/Bachelor of Arts in Psychology'}>Bachelor of Science/Bachelor of Arts in Psychology</option>
                <option value={'Bachelor of Special Needs Education'}>Bachelor of Special Needs Education</option>
                <option value={'Bachelor of Sports and Exercise Science'}>Bachelor of Sports and Exercise Science</option>
                <option value={'Doctor of Dental Medicine'}>Doctor of Dental Medicine</option>
                <option value={'Doctor of Optometry'}>Doctor of Optometry</option>
                </>
                )}
                {userData.yearLevel === 'Senior Highschool' && (<>
                  <option>Select your course</option>
                  <option value={'Science Technology Engineering and Mathematics (STEM)'}>Science Technology Engineering and Mathematics (STEM)</option>
                  <option value={'Humanities and Social Sciences (HUMSS)'}>Humanities and Social Sciences (HUMSS)</option>
                  <option value={'Accountancy Business and Management (ABM)'}>Accountancy Business and Management (ABM)</option>
                  <option value={' General Academic Strand (GAS)'}> General Academic Strand (GAS)</option>
                  <option value={'Home Economics'}>Home Economics</option>
                  <option value={'Agri-fishery Arts'}>Agri-fishery Arts</option>
                  <option value={'Industrial Arts'}>Industrial Arts</option>
                  <option value={'Information and Communications Technology'}>Information and Communications Technology</option>
                </>)}

              </Form.Select>
              {errors.course && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.course}</p>}
            </Form.Group>)}
          </Row>
          </div>
          <div className='frmbtnec'>
          <Button className='myButton' variant="contained" onClick={Check}>Next</Button>
          </div>
          </div>
      </div>
  </div>
  </>
)
}


export default Firststep