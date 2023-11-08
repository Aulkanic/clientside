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
import { ta } from 'date-fns/locale';

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
  const savehnum = localStorage.getItem('housenum')
  const [housenum,setHousenum] = useState('' || savehnum)

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
    } else if (!/^9\d{9}$/.test(userData.contactNum)) {
      errors.contactNum = "Invalid phone number.";
    }
    const fulladress = `${housenum} ${userData.baranggay} MARILAO BULACAN`
    setUserData((prevData) => ({ ...prevData, address: fulladress }));
    
    if(userData.yearLevel !== 'COLLEGE' && userData.yearLevel !== 'SENIOR HIGHSCHOOL'){
      setUserData((prevData) => ({ ...prevData, course: 'NONE', }));
    }
    if (!errors || Object.keys(errors).length > 0) {
    
      setErrors(errors);
      return;
    }
    localStorage.setItem('userData',JSON.stringify(userData))
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

      <div className="FFd">
          <div className="form">
          <div className='containerform'>
            <div style={{padding:'20px'}}>
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
            <Form.Label className='frmlabel'>{t("House No/Street")} *</Form.Label>
            <Form.Control
              type="text"
              name="houseNoStreet"
              value={housenum}
              placeholder="e.g., 123 Main Street"
              onChange={(e) =>setHousenum(e.target.value.toUpperCase())}
            />
            {errors.housenum && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.housenum}</p>}
              </Form.Group>
           <Form.Group as={Col}>
            <Form.Label className='frmlabel'>{t("Barangay")} *</Form.Label>
            <Form.Select
              as="select"
              name="barangay"
              value={userData.baranggay}
              onChange={(e) =>setUserData({...userData,"baranggay" : e.target.value})}
            >
              <option value={''}>PLEASE SELECT BARANGGAY</option>
              <option value={'ABANGAN NORTE'}>ABANGAN NORTE</option>
              <option value={'ABANGAN SUR'}>ABANGAN SUR</option>
              <option value={'IBAYO'}>IBAYO</option>
              <option value={'LAMBAKIN'}>LAMBAKIN</option>
              <option value={'LIAS'}>LIAS</option>
              <option value={'LOMA DE GATO'}>LOMA DE GATO</option>
              <option value={'NAGBALON'}>NAGBALON</option>
              <option value={'PATUBIG'}>PATUBIG</option>
              <option value={'POBLACION 1'}>POBLACION 1</option>
              <option value={'POBLACION 2'}>POBLACION 2</option>
              <option value={'PRENZA 1'}>PRENZA 1</option>
              <option value={'PRENZA 2'}>PRENZA 2</option>
              <option value={'SAOG'}>SAOG</option>
              <option value={'STA. ROSA 1'}>STA. ROSA 1</option>
              <option value={'STA. ROSA 2'}>STA. ROSA 2</option>
              <option value={'TABING-ILOG'}>TABING-ILOG</option>
            </Form.Select>
            {errors.baranggay && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.baranggay}</p>}
          </Form.Group>
          </Row>
          <Row className='mb-3'>
            <Form.Group as={Col}>
              <Form.Label className='frmlabel'>{t("City")}</Form.Label>
              <Form.Control
                type="text"
                value={'Marilao'}
                name="city"
                readOnly
                disabled
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label className='frmlabel'>{t("Province")}</Form.Label>
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
            <Form.Label className='frmlabel'>{t("Gender")} *</Form.Label>
            <Form.Select aria-label="Default select example"
              value={userData['gender']} 
              onChange={(e) =>setUserData({...userData,"gender" : e.target.value})}
            >
              <option>Select your gender</option>
              <option value="MALE">MALE</option>
              <option value="FEMALE">FEMALE</option>
              <option value="OTHERS">OTHERS</option>
            </Form.Select>
            {errors.gender && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.gender}</p>}
            </Form.Group>

            <Form.Group as={Col}>
            <Form.Label className='frmlabel'>{t("Birth Date")} *</Form.Label>
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
            <Form.Label className='frmlabel'>{t("Birth Place")} *</Form.Label>
            <Form.Control 
            type="text"
            placeholder='Barangay, Municipality' 
            value={userData['birthPlace']} 
            onChange={(e) =>setUserData({...userData,"birthPlace" : e.target.value.toUpperCase()})}
            />
           {errors.birthPlace && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.birthPlace}</p>}
            </Form.Group>

            <Form.Group style={{margin:'0px 10px 0px 10px'}} as={Col}>
              <div style={{position:'relative'}}>
            <Form.Label className='frmlabel'>{t("Mobile Number")} *</Form.Label>
            <span style={{position:'absolute',bottom:'5.5px',left:'17px',fontSize:'15px',color:'black',fontWeight:'bold',display:'flex'}}><p style={{margin:'0px',marginTop:'-2px'}}>+</p>63-</span>
            <Form.Control type="text" placeholder="XXX XXX XXXX"
              value={userData['contactNum']} 
              style={{paddingLeft:'50px'}}
              onChange={(e) =>setUserData({...userData,"contactNum" : e.target.value})}
            />
            </div>
               {errors.contactNum && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.contactNum}</p>}
            </Form.Group>
          </Row>
            </div>

          </div>
          <div className='containerform'>
          <h4 style={{width:'100%',backgroundColor:'#043F97'}} className='h4head'>{t("Educational Information")}</h4>
          <div style={{padding:'20px'}}>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label className='frmlabel'>{t("Last School Attended")} *</Form.Label>
              <Form.Control 
              type="text"
              value={userData['School']} 
              placeholder='e.g., ABC Elementary School'
              onChange={(e) =>setUserData({...userData,"School" : e.target.value.toUpperCase()})}
              />
            {errors.School && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.School}</p>}
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label className='frmlabel'>{t("School Address")} *</Form.Label>
              <Form.Control type="text"
               value={userData['SchoolAddress']} 
               placeholder='Please enter the address of your last school ...'
               onChange={(e) =>setUserData({...userData,"SchoolAddress" : e.target.value.toUpperCase()})}
              />
             {errors.SchoolAddress && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.SchoolAddress}</p>}
            </Form.Group>
          </Row>
          <Row className="mb-3">
          <Form.Group as={Col}>
              <Form.Label className='frmlabel'>{t("Year Level")} *</Form.Label>
              <Form.Select
                value={userData['yearLevel']} 
                onChange={(e) =>setUserData({...userData,"yearLevel" : e.target.value})}
              >
              <option value={''}>SELECT YOUR YEAR LEVEL</option>
              <option value={'ELEMENTARY'}>ELEMENTARY</option>
              <option value={'JUNIOR HIGHSCHOOL'}>JUNIOR HIGHSCHOOL</option>
              <option value={'SENIOR HIGHSCHOOL'}>SENIOR HIGHSCHOOL</option>
              <option value={'COLLEGE'}>COLLEGE</option>
              </Form.Select>
              {errors.yearLevel && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.yearLevel}</p>}
            </Form.Group>
            {userData['yearLevel'] !== '' && (<Form.Group as={Col}>
              <Form.Label className='frmlabel'>{t("Grade/Year")} *</Form.Label>
              <Form.Select
              value={userData['gradeLevel']} 
              onChange={(e) =>setUserData({...userData,"gradeLevel" : e.target.value})}
              >
                {userData.yearLevel === 'ELEMENTARY' && (<>
                <option value={''}>SELECT YOUR GRADE LEVEL</option>
                <option value={'GRADE 1'}>GRADE 1</option>
                <option value={'GRADE 2'}>GRADE 2</option>
                <option value={'GRADE 3'}>GRADE 3</option>
                <option value={'GRADE 4'}>GRADE 4</option>
                <option value={'GRADE 5'}>GRADE 5</option>
                <option value={'GRADE 6'}>GRADE 6</option>

                </>)}
                {userData.yearLevel === 'JUNIOR HIGHSCHOOL' && (<>
                  <option value={''}>SELECT YOUR GRADE LEVEL</option>
                <option value={'GRADE 7'}>GRADE 7</option>
                <option value={'GRADE 8'}>GRADE 8</option>
                <option value={'GRADE 9'}>GRADE 9</option>
                <option value={'GRADE 10'}>GRADE 10</option>
                </>)}
                {userData.yearLevel === 'SENIOR HIGHSCHOOL' && (<>
                  <option value={''}>SELECT YOUR GRADE LEVEL</option>
                  <option value={'GRADE 11'}>GRADE 11</option>
                  <option value={'GRADE 12'}>GRADE 12</option>
                </>)}
                {userData.yearLevel === 'COLLEGE' && (<>
                  <option value={''}>SELECT YOUR GRADE LEVEL</option>
                  <option value={'1ST YEAR'}>1ST YEAR</option>
                  <option value={'2ND YEAR'}>2ND YEAR</option>
                  <option value={'3RD YEAR'}>3RD YEAR</option>
                  <option value={'4TH YEAR'}>4TH YEAR</option>
                </>)}
              </Form.Select>
                 {errors.gradeLevel && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.gradeLevel}</p>}
            </Form.Group>)}
            {userData.yearLevel !== 'COLLEGE' && userData.yearLevel !== 'SENIOR HIGHSCHOOL' ? (null) : (<Form.Group as={Col}>
              <Form.Label className='frmlabel'>{t("Course")} *</Form.Label>
              <Form.Select 
                value={userData.yearLevel !== 'COLLEGE' && userData.yearLevel !== 'SENIOR HIGHSCHOOL' ? 'None' : userData.course}
                onChange={(e) => {
                  const selectedValue = e.target.value;
        
                  const newCourse = 
                  userData.yearLevel !== 'COLLEGE' && userData.yearLevel !== 'SENIOR HIGHSCHOOL' 
                  ? 'None' : 
                  selectedValue;
               
                  setUserData((prevData) => ({ ...prevData, course: newCourse, }));
                }}
              >
                {userData.yearLevel === 'COLLEGE' && (
                <>
                  <option>SELECT YOUR COURSE</option>
                  <option value={'BACHELOR OF SCIENCE IN RESPIRATORY THERAPY'}>BACHELOR OF SCIENCE IN RESPIRATORY THERAPY</option>
                  <option value={'BACHELOR IN LANDSCAPE ARCHITECTURE'}>BACHELOR IN LANDSCAPE ARCHITECTURE</option>
                  <option value={'BACHELOR IN SECONDARY EDUCATION MAJOR IN MATHEMATICS'}>BACHELOR IN SECONDARY EDUCATION MAJOR IN MATHEMATICS</option>
                  <option value={'BACHELOR IN SECONDARY EDUCATION MAJOR IN SCIENCE'}>BACHELOR IN SECONDARY EDUCATION MAJOR IN SCIENCE</option>
                  <option value={'BACHELOR OF CULTURE AND THE ARTS EDUCATION'}>BACHELOR OF CULTURE AND THE ARTS EDUCATION</option>
                  <option value={'BACHELOR OF DATA SCIENCE AND ANALYTICS'}>BACHELOR OF DATA SCIENCE AND ANALYTICS</option>
                  <option value={'BACHELOR OF EARLY CHILDHOOD EDUCATION'}>BACHELOR OF EARLY CHILDHOOD EDUCATION</option>
                  <option value={'BACHELOR OF FINE ARTS'}>BACHELOR OF FINE ARTS</option>
                  <option value={'BACHELOR OF LIBRARY AND INFORMATION SCIENCE'}>BACHELOR OF LIBRARY AND INFORMATION SCIENCE</option>
                  <option value={'BACHELOR OF MEDICAL LABORATORY SCIENCE'}>BACHELOR OF MEDICAL LABORATORY SCIENCE</option>
                  <option value={'BACHELOR OF SCIENCE IN ACCOUNTANCY'}>BACHELOR OF SCIENCE IN ACCOUNTANCY</option>
                  <option value={'BACHELOR OF SCIENCE IN AGRIBUSINESS'}>BACHELOR OF SCIENCE IN AGRIBUSINESS</option>
                  <option value={'BACHELOR OF SCIENCE IN AGRICULTURAL AND BIOSYSTEMS ENGINEERING'}>BACHELOR OF SCIENCE IN AGRICULTURAL AND BIOSYSTEMS ENGINEERING</option>
                  <option value={'BACHELOR OF SCIENCE IN AGROFORESTRY'}>BACHELOR OF SCIENCE IN AGROFORESTRY</option>
                  <option value={'BACHELOR OF SCIENCE IN AIRCRAFT MAINTENANCE TECHNOLOGY'}>BACHELOR OF SCIENCE IN AIRCRAFT MAINTENANCE TECHNOLOGY</option>
                  <option value={'BACHELOR OF SCIENCE IN APPLIED MATHEMATICS'}>BACHELOR OF SCIENCE IN APPLIED MATHEMATICS</option>
                  <option value={'BACHELOR OF SCIENCE IN APPLIED PHYSICS'}>BACHELOR OF SCIENCE IN APPLIED PHYSICS</option>
                  <option value={'BACHELOR OF SCIENCE IN APPLIED STATISTICS'}>BACHELOR OF SCIENCE IN APPLIED STATISTICS</option>
                  <option value={'BACHELOR OF SCIENCE IN ARCHITECTURE'}>BACHELOR OF SCIENCE IN ARCHITECTURE</option>
                  <option value={'BACHELOR OF SCIENCE IN AVIATION'}>BACHELOR OF SCIENCE IN AVIATION</option>
                  <option value={'BACHELOR OF SCIENCE IN AVIATION TECHNOLOGY'}>BACHELOR OF SCIENCE IN AVIATION TECHNOLOGY</option>
                  <option value={'BACHELOR OF SCIENCE IN BIOCHEMISTRY'}>BACHELOR OF SCIENCE IN BIOCHEMISTRY</option>
                  <option value={'BACHELOR OF SCIENCE IN BIOLOGY'}>BACHELOR OF SCIENCE IN BIOLOGY</option>
                  <option value={'BACHELOR OF SCIENCE IN BOTANY'}>BACHELOR OF SCIENCE IN BOTANY</option>
                  <option value={'BACHELOR OF SCIENCE IN BUSINESS ADMINISTRATION MAJOR IN BUSINESS ANALYTICS'}>BACHELOR OF SCIENCE IN BUSINESS ADMINISTRATION MAJOR IN BUSINESS ANALYTICS</option>
                  <option value={'BACHELOR OF SCIENCE IN BUSINESS ANALYTICS'}>BACHELOR OF SCIENCE IN BUSINESS ANALYTICS</option>
                  <option value={'BACHELOR OF SCIENCE IN CERAMIC ENGINEERING'}>BACHELOR OF SCIENCE IN CERAMIC ENGINEERING</option>
                  <option value={'BACHELOR OF SCIENCE IN CHEMICAL ENGINEERING'}>BACHELOR OF SCIENCE IN CHEMICAL ENGINEERING</option>
                  <option value={'BACHELOR OF SCIENCE IN CHEMISTRY'}>BACHELOR OF SCIENCE IN CHEMISTRY</option>
                  <option value={'BACHELOR OF SCIENCE IN CIVIL ENGINEERING'}>BACHELOR OF SCIENCE IN CIVIL ENGINEERING</option>
                  <option value={'BACHELOR OF SCIENCE IN CLIMATE CHANGE'}>BACHELOR OF SCIENCE IN CLIMATE CHANGE</option>
                  <option value={'BACHELOR OF SCIENCE IN COMMUNITY DEVELOPMENT'}>BACHELOR OF SCIENCE IN COMMUNITY DEVELOPMENT</option>
                  <option value={'BACHELOR OF SCIENCE IN COMPUTER ENGINEERING'}>BACHELOR OF SCIENCE IN COMPUTER ENGINEERING</option>
                  <option value={'BACHELOR OF SCIENCE IN COMPUTER SCIENCE'}>BACHELOR OF SCIENCE IN COMPUTER SCIENCE</option>
                  <option value={'BACHELOR OF SCIENCE IN CYBER SECURITY'}>BACHELOR OF SCIENCE IN CYBER SECURITY</option>
                  <option value={'BACHELOR OF SCIENCE IN DISASTER RISK MANAGEMENT'}>BACHELOR OF SCIENCE IN DISASTER RISK MANAGEMENT</option>
                  <option value={'BACHELOR OF SCIENCE IN ELECTRICAL ENGINEERING'}>BACHELOR OF SCIENCE IN ELECTRICAL ENGINEERING</option>
                  <option value={'BACHELOR OF SCIENCE IN ELECTRONICS AND COMMUNICATIONS ENGINEERING'}>BACHELOR OF SCIENCE IN ELECTRONICS AND COMMUNICATIONS ENGINEERING</option>
                  <option value={'BACHELOR OF SCIENCE IN ELECTRONICS ENGINEERING'}>BACHELOR OF SCIENCE IN ELECTRONICS ENGINEERING</option>
                  <option value={'BACHELOR OF SCIENCE IN ENGINEERING TECHNOLOGY'}>BACHELOR OF SCIENCE IN ENGINEERING TECHNOLOGY</option>
                  <option value={'BACHELOR OF SCIENCE IN ENTERTAINMENT AND MULTIMEDIA COMPUTING'}>BACHELOR OF SCIENCE IN ENTERTAINMENT AND MULTIMEDIA COMPUTING</option>
                  <option value={'BACHELOR OF SCIENCE IN ENVIRONMENTAL PLANNING'}>BACHELOR OF SCIENCE IN ENVIRONMENTAL PLANNING</option>
                  <option value={'BACHELOR OF SCIENCE IN ENVIRONMENTAL SCIENCE'}>BACHELOR OF SCIENCE IN ENVIRONMENTAL SCIENCE</option>
                  <option value={'BACHELOR OF SCIENCE IN FOOD ENGINEERING'}>BACHELOR OF SCIENCE IN FOOD ENGINEERING</option>
                  <option value={'BACHELOR OF SCIENCE IN GAME DEVELOPMENT AND ANIMATION'}>BACHELOR OF SCIENCE IN GAME DEVELOPMENT AND ANIMATION</option>
                  <option value={'BACHELOR OF SCIENCE IN GEODETIC ENGINEERING'}>BACHELOR OF SCIENCE IN GEODETIC ENGINEERING</option>
                  <option value={'BACHELOR OF SCIENCE IN GEOLOGY'}>BACHELOR OF SCIENCE IN GEOLOGY</option>
                  <option value={'BACHELOR OF SCIENCE IN HOSPITALITY MANAGEMENT'}>BACHELOR OF SCIENCE IN HOSPITALITY MANAGEMENT</option>
                  <option value={'BACHELOR OF SCIENCE IN HUMAN BIOLOGY'}>BACHELOR OF SCIENCE IN HUMAN BIOLOGY</option>
                  <option value={'BACHELOR OF SCIENCE IN HUMAN SERVICES'}>BACHELOR OF SCIENCE IN HUMAN SERVICES</option>
                  <option value={'BACHELOR OF SCIENCE IN INDIGENOUS PEOPLES EDUCATION'}>BACHELOR OF SCIENCE IN INDIGENOUS PEOPLES EDUCATION</option>
                  <option value={'BACHELOR OF SCIENCE IN INDIGENOUS PEOPLES STUDIES'}>BACHELOR OF SCIENCE IN INDIGENOUS PEOPLES STUDIES</option>
                  <option value={'BACHELOR OF SCIENCE IN INDUSTRIAL ENGINEERING'}>BACHELOR OF SCIENCE IN INDUSTRIAL ENGINEERING</option>
                  <option value={'BACHELOR OF SCIENCE IN INDUSTRIAL TECHNOLOGY'}>BACHELOR OF SCIENCE IN INDUSTRIAL TECHNOLOGY</option>
                  <option value={'BACHELOR OF SCIENCE IN INFORMATION SYSTEMS'}>BACHELOR OF SCIENCE IN INFORMATION SYSTEMS</option>
                  <option value={'BACHELOR OF SCIENCE IN INFORMATION TECHNOLOGY'}>BACHELOR OF SCIENCE IN INFORMATION TECHNOLOGY</option>
                  <option value={'BACHELOR OF SCIENCE IN INTERIOR DESIGN'}>BACHELOR OF SCIENCE IN INTERIOR DESIGN</option>
                  <option value={'BACHELOR OF SCIENCE IN MANUFACTURING ENGINEERING'}>BACHELOR OF SCIENCE IN MANUFACTURING ENGINEERING</option>
                  <option value={'BACHELOR OF SCIENCE IN MARINE BIOLOGY'}>BACHELOR OF SCIENCE IN MARINE BIOLOGY</option>
                  <option value={'BACHELOR OF SCIENCE IN MARINE ENGINEERING'}>BACHELOR OF SCIENCE IN MARINE ENGINEERING</option>
                  <option value={'BACHELOR OF SCIENCE IN MARINE TRANSPORTATION'}>BACHELOR OF SCIENCE IN MARINE TRANSPORTATION</option>
                  <option value={'BACHELOR OF SCIENCE IN MATERIALS ENGINEERING'}>BACHELOR OF SCIENCE IN MATERIALS ENGINEERING</option>
                  <option value={'BACHELOR OF SCIENCE IN MATHEMATICS'}>BACHELOR OF SCIENCE IN MATHEMATICS</option>
                  <option value={'BACHELOR OF SCIENCE IN MECHANICAL ENGINEERING'}>BACHELOR OF SCIENCE IN MECHANICAL ENGINEERING</option>
                  <option value={'BACHELOR OF SCIENCE IN MECHATRONICS ENGINEERING'}>BACHELOR OF SCIENCE IN MECHATRONICS ENGINEERING</option>
                  <option value={'BACHELOR OF SCIENCE IN MECHATRONICS ENGINEERING TECHNOLOGY'}>BACHELOR OF SCIENCE IN MECHATRONICS ENGINEERING TECHNOLOGY</option>
                  <option value={'BACHELOR OF SCIENCE IN MEDICAL TECHNOLOGY'}>BACHELOR OF SCIENCE IN MEDICAL TECHNOLOGY</option>
                  <option value={'BACHELOR OF SCIENCE IN METALLURGICAL ENGINEERING'}>BACHELOR OF SCIENCE IN METALLURGICAL ENGINEERING</option>
                  <option value={'BACHELOR OF SCIENCE IN METEOROLOGY'}>BACHELOR OF SCIENCE IN METEOROLOGY</option>
                  <option value={'BACHELOR OF SCIENCE IN MIDWIFERY'}>BACHELOR OF SCIENCE IN MIDWIFERY</option>
                  <option value={'BACHELOR OF SCIENCE IN MINING ENGINEERING'}>BACHELOR OF SCIENCE IN MINING ENGINEERING</option>
                  <option value={'BACHELOR OF SCIENCE IN MOLECULAR BIOLOGY AND BIOTECHNOLOGY'}>BACHELOR OF SCIENCE IN MOLECULAR BIOLOGY AND BIOTECHNOLOGY</option>
                  <option value={'BACHELOR OF SCIENCE IN NURSING'}>BACHELOR OF SCIENCE IN NURSING</option>
                  <option value={'BACHELOR OF SCIENCE IN NUTRITION AND DIETETICS'}>BACHELOR OF SCIENCE IN NUTRITION AND DIETETICS</option>
                  <option value={'BACHELOR OF SCIENCE IN OCCUPATIONAL THERAPY'}>BACHELOR OF SCIENCE IN OCCUPATIONAL THERAPY</option>
                  <option value={'BACHELOR OF SCIENCE IN PEACE EDUCATION'}>BACHELOR OF SCIENCE IN PEACE EDUCATION</option>
                  <option value={'BACHELOR OF SCIENCE IN PEACE STUDIES'}>BACHELOR OF SCIENCE IN PEACE STUDIES</option>
                  <option value={'BACHELOR OF SCIENCE IN PETROLEUM ENGINEERING'}>BACHELOR OF SCIENCE IN PETROLEUM ENGINEERING</option>
                  <option value={'BACHELOR OF SCIENCE IN PHYSICAL THERAPY'}>BACHELOR OF SCIENCE IN PHYSICAL THERAPY</option>
                  <option value={'BACHELOR OF SCIENCE IN PHYSICS'}>BACHELOR OF SCIENCE IN PHYSICS</option>
                  <option value={'BACHELOR OF SCIENCE IN PRODUCTION ENGINEERING'}>BACHELOR OF SCIENCE IN PRODUCTION ENGINEERING</option>
                  <option value={'BACHELOR OF SCIENCE IN RADIOLOGIC TECHNOLOGY'}>BACHELOR OF SCIENCE IN RADIOLOGIC TECHNOLOGY</option>
                  <option value={'BACHELOR OF SCIENCE IN RENEWABLE ENERGY'}>BACHELOR OF SCIENCE IN RENEWABLE ENERGY</option>
                  <option value={'BACHELOR OF SCIENCE IN ROBOTICS ENGINEERING'}>BACHELOR OF SCIENCE IN ROBOTICS ENGINEERING</option>
                  <option value={'BACHELOR OF SCIENCE IN SANITARY ENGINEERING'}>BACHELOR OF SCIENCE IN SANITARY ENGINEERING</option>
                  <option value={'BACHELOR OF SCIENCE IN SOCIAL WORK'}>BACHELOR OF SCIENCE IN SOCIAL WORK</option>
                  <option value={'BACHELOR OF SCIENCE IN SPEECH-LANGUAGE PATHOLOGY'}>BACHELOR OF SCIENCE IN SPEECH-LANGUAGE PATHOLOGY</option>
                  <option value={'BACHELOR OF SCIENCE IN STATISTICS'}>BACHELOR OF SCIENCE IN STATISTICS</option>
                  <option value={'BACHELOR OF SCIENCE IN STRUCTURAL ENGINEERING'}>BACHELOR OF SCIENCE IN STRUCTURAL ENGINEERING</option>
                  <option value={'BACHELOR OF SCIENCE IN SUSTAINABLE ENERGY'}>BACHELOR OF SCIENCE IN SUSTAINABLE ENERGY</option>
                  <option value={'BACHELOR OF SCIENCE IN TOURISM'}>BACHELOR OF SCIENCE IN TOURISM</option>
                  <option value={'BACHELOR OF SCIENCE IN TOURISM MANAGEMENT'}>BACHELOR OF SCIENCE IN TOURISM MANAGEMENT</option>
                  <option value={'BACHELOR OF SCIENCE/BACHELOR OF ARTS IN PSYCHOLOGY'}>BACHELOR OF SCIENCE/BACHELOR OF ARTS IN PSYCHOLOGY</option>
                  <option value={'BACHELOR OF SPECIAL NEEDS EDUCATION'}>BACHELOR OF SPECIAL NEEDS EDUCATION</option>
                  <option value={'BACHELOR OF SPORTS AND EXERCISE SCIENCE'}>BACHELOR OF SPORTS AND EXERCISE SCIENCE</option>
                  <option value={'DOCTOR OF DENTAL MEDICINE'}>DOCTOR OF DENTAL MEDICINE</option>
                  <option value={'DOCTOR OF OPTOMETRY'}>DOCTOR OF OPTOMETRY</option>

                </>
                )}
                {userData.yearLevel === 'SENIOR HIGHSCHOOL' && (<>
                  <option>SELECT YOUR COURSE</option>
                  <option value={'SCIENCE TECHNOLOGY ENGINEERING AND MATHEMATICS (STEM)'}>SCIENCE TECHNOLOGY ENGINEERING AND MATHEMATICS (STEM)</option>
                  <option value={'HUMANITIES AND SOCIAL SCIENCES (HUMSS)'}>HUMANITIES AND SOCIAL SCIENCES (HUMSS)</option>
                  <option value={'ACCOUNTANCY BUSINESS AND MANAGEMENT (ABM)'}>ACCOUNTANCY BUSINESS AND MANAGEMENT (ABM)</option>
                  <option value={'GENERAL ACADEMIC STRAND (GAS)'}>GENERAL ACADEMIC STRAND (GAS)</option>
                  <option value={'HOME ECONOMICS'}>HOME ECONOMICS</option>
                  <option value={'AGRI-FISHERY ARTS'}>AGRI-FISHERY ARTS</option>
                  <option value={'INDUSTRIAL ARTS'}>INDUSTRIAL ARTS</option>
                  <option value={'INFORMATION AND COMMUNICATIONS TECHNOLOGY'}>INFORMATION AND COMMUNICATIONS TECHNOLOGY</option>

                </>)}

              </Form.Select>
              {errors.course && <p style={{color: 'red',fontSize:'12px',marginLeft:'5px'}}>{errors.course}</p>}
            </Form.Group>)}
          </Row>
          </div>
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