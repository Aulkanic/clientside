import React, { useEffect, useState } from 'react'
import { Switch, TextField,CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';
import { useContext } from 'react';
import { multiStepContext } from './StepContext';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import swal from 'sweetalert';
import Axios from 'axios'
import { FormHelperText,Typography } from '@mui/material';
import { ApplyForm } from '../../Api/request';
import '../css/educational.css'
import { useNavigate } from 'react-router-dom';
import '../css/buttonStyle.css'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import LoopingRhombusesSpinner from '../../userhome/loadingDesign/loading';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Link from '@mui/material/Link';
import LoadingButton from '@mui/lab/LoadingButton';
import { styled } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';

function Educational() {
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);

  const [errors, setErrors] = useState({}); 
  const navigate = useNavigate();
  const [applicantNum, setApplicantNum] = useState('');
  const [switchState, setSwitchState] = useState(false);
  const [switchState1, setSwitchState1] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');
  const [isChecked, setIsChecked] = useState(false);

  const handleButtonClick = () => {
    setIsChecked(true);
    setOpen(false)
    console.log(isChecked)
  };
  const handleCheckboxChange = () => {
    setIsChecked((prevChecked) => !prevChecked);
  };

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const HighhandleSwitchChange = () => {
    setSwitchState(!switchState);
    console.log(switchState)
  };
  const CollhandleSwitchChange = () => {
    setSwitchState1(!switchState1);
    console.log(switchState)
  };

  useEffect(() => {
    const item = localStorage.getItem('ApplicationNumber');
    setApplicantNum(item);
  }, []);

    const { setStep, userData, setUserData,SubmitData} = useContext(multiStepContext);
    const address = userData.address
    const age = userData.age
    const baranggay = userData.baranggay
    const birthPlace = userData.birthPlace
    const birthday = userData.birthday
    const caddress = userData.address
    const citizenship = userData.citizenship
    const collegeAddress = userData.collegeAddress
    const collegeAward = userData.collegeAward
    const collegeSchool = userData.collegeSchool
    const collegeYear = userData.collegeYear
    const contactNum = userData.contactNum
    const course = userData.course
    const currentSchool = userData.currentSchool
    const currentYear = userData.currentYear
    const elemAddress = userData.elemAddress
    const elemAward = userData.elemAward
    const elemSchool = userData.elemSchool
    const elemYear = userData.elemYear
    const email = userData.email
    const fatherEduc = userData.fatherEduc
    const fatherName = userData.fatherName
    const fatherlName = userData.fatherlName
    const fathermName = userData.fathermName
    const fatherOccu = userData.fatherOccu
    const financialSupport = userData.financialSupport
    const firstName = userData.firstName
    const gender = userData.gender
    const guardianContact = userData.guardianContact
    const guardianName = userData.guardianName
    const gwa = userData.gwa
    const highAddress = userData.highAddress
    const highAward = userData.highAward
    const highSchool = userData.highSchool
    const highYear = userData.highYear
    const howLong = userData.howLong
    const lastName = userData.lastName
    const middleName = userData.middleName
    const monthIncome = userData.monthIncome
    const motherEduc = userData.motherEduc
    const motherName = userData.motherName
    const motherlName = userData.motherlName
    const mothermName = userData.mothermName
    const motherOccu = userData.motherOccu
    const famNum = userData.famNum
    const ownerShip = userData.ownerShip
    const paddress = userData.paddress
    const relationship = userData.relationship
    const scholarID = userData.scholarID
    const typeSchool = userData.typeSchool
    const wereLive = userData.wereLive
    const AAsinfo = userData.AAsinfo;
    const Asinfo = userData.Asinfo;
    const Es1info = userData.Eslinfo
    const Esinfo = userData.Esinfo
    const YLsinfo = userData.YLsinfo
    const Fdeceased = userData.Fdeceased
    const Mdeceased = userData.Mdeceased

    function submitData(){
      const errors = {};
        if (userData.currentYear === '') {
          errors.currentYear = "This Field is required";
        } 
        if (userData.course === '') {
          errors.course = "This Field is required";
        } else if (userData.course.length === 1) {
          errors.course = "Input must not contain a single letter.";
        } else if (/[0-9]/.test(userData.course)) {
          errors.course = "Input must not contain numeric value";
        } else if (/[!@#$%^&*(),.?":{}|<>]/.test(userData.course)) {
          errors.course = "Special characters are not allowed.";
        } else if (!/^[A-Z][A-Za-z,\s]*$/.test(userData.course)) {
          errors.course = "Fields must be in title case format";
        }
        if (userData.typeSchool === '') {
          errors.typeSchool = "This Field is required";
        } 
        if (userData.currentSchool === '') {
          errors.currentSchool = "This Field is required";
        } else if (userData.currentSchool.length === 1) {
          errors.currentSchool = "Input must not contain a single letter.";
        }else if (/[!@#$%^&*(),.?":{}|<>]/.test(userData.currentSchool)) {
          errors.currentSchool = "Special characters are not allowed.";
        } else if (!/^[A-Z][A-Za-z,\s]*$/.test(userData.currentSchool)) {
          errors.currentSchool = "Fields must be in title case format";
        }
        if (userData.address === '') {
          errors.address = "This Field is required";
        } 
        else if (userData.address.length === 1) {
          errors.address = "Input must not contain a single letter.";
        }
        if (userData.financialSupport === '') {
          errors.financialSupport = "This Field is required";
        } else if (userData.financialSupport.length === 1) {
          errors.financialSupport = "Input must not contain a single letter.";
        } else if (/[0-9]/.test(userData.financialSupport)) {
          errors.financialSupport = "Input must not contain numeric value";
        } else if (/[!@#$%^&*()?":{}|<>]/.test(userData.financialSupport)) {
          errors.financialSupport = "Special characters are not allowed.";
        } else if (!/^[A-Z][A-Za-z,\s]*$/.test(userData.financialSupport)) {
          errors.financialSupport = "Fields must be in title case format";
        }
        if (userData.elemSchool === '') {
          errors.elemSchool = "This Field is required";
        } 
        else if (userData.elemSchool.length === 1) {
          errors.elemSchool = "Input must not contain a single letter.";
        }
        else if (/[!@$%^&*()?":{}|<>]/.test(userData.elemSchool)) {
          errors.elemSchool = "Special characters are not allowed.";
        }

        if (userData.elemAddress === '') {
          errors.elemAddress = "This Field is required";
        } 
        else if (userData.elemAddress.length === 1) {
          errors.elemAddress = "Input must not contain a single letter.";
        }
        else if (/[!@#$%^&*()?":{}|<>]/.test(userData.elemAddress)) {
          errors.elemAddress = "Special characters are not allowed.";
        }

        if (userData.elemYear === '') {
          errors.elemYear = "This Field is required";
        }else if(!/^\d{4}-\d{4}$/.test(userData.elemYear)){
          errors.elemYear = "Invalid format";
        }
        if (userData.elemAward === '') {
          errors.elemAward = "This Field is required";
        } 
        if(!switchState){
        if (userData.highSchool === '') {
          errors.highSchool = "This Field is required";
        } 
        else if (userData.highSchool.length === 1) {
          errors.highSchool = "Input must not contain a single letter.";
        }
        else if (/[!@#$%^&*()?":{}|<>]/.test(userData.highSchool)) {
          errors.highSchool = "Special characters are not allowed.";
        }

        if (userData.highAddress === '') {
          errors.highAddress = "This Field is required";
        } 
        else if (userData.highAddress.length === 1) {
          errors.highAddress = "Input must not contain a single letter.";
        }
        else if (/[!@#$%^&*()?":{}|<>]/.test(userData.highAddress)) {
          errors.highAddress = "Special characters are not allowed.";
        }

        if (userData.highYear === '') {
          errors.highYear = "This Field is required";
        }  else if(!/^\d{4}-\d{4}$/.test(userData.highYear)){
          errors.highYear = "Invalid format";
        }
        else if (/[a-zA-Z]/.test(userData.highYear)) {
          errors.highYear = "Input must not contain letter value";
        }
        if (userData.highAward === '') {
          errors.highAward = "This Field is required";
        } 
      }
      if(!switchState1){
        if (userData.collegeSchool === '') {
          errors.collegeSchool = "This Field is required";
        } 
        else if (userData.collegeSchool.length === 1) {
          errors.collegeSchool = "Input must not contain a single letter.";
        }
        else if (/[!@#$%^&*()?":{}|<>]/.test(userData.collegeSchool)) {
          errors.collegeSchool = "Special characters are not allowed.";
        }

        if (userData.collegeAddress === '') {
          errors.collegeAddress = "This Field is required";
        } 
        else if (userData.collegeAddress.length === 1) {
          errors.collegeAddress = "Input must not contain a single letter.";
        }
        else if (/[!@#$%^&*()?":{}|<>]/.test(userData.collegeAddress)) {
          errors.collegeAddress = "Special characters are not allowed.";
        }

        if (userData.collegeYear === '') {
          errors.collegeYear = "This Field is required";
        } else if(!/^\d{4}-\d{4}$/.test(userData.collegeYear)){
          errors.collegeYear = "Invalid format";
        }
        if (userData.collegeAward === '') {
          errors.collegeAward = "This Field is required";
        }
      }
        if (userData.gwa === '') {
          errors.gwa = "This Field is required";
        }
        let formattedDate = '';
        let formattedBirthday = '';
        
        if (userData.birthday) {
          formattedDate = userData.birthday.toISOString();
          formattedBirthday = new Date(formattedDate).toLocaleString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          });
        }       
        let birthdayValue = formattedBirthday;
        if (Object.keys(errors).length > 0) {
          setErrors(errors);
          console.log(errors)
          return;
        }
        let otherinfo = ''
        if(userData.scholarID === 'Academic Scholarship'){
            otherinfo = userData.Asinfo
        }else if(userData.scholarID === 'Economic Scholarship'){
          otherinfo = [...userData.Esinfo,...userData.Es1info];
        }else if(userData.scholarID === 'Athletic and Arts Scholarship'){
          otherinfo = userData.AAsinfo
        }else if(userData.scholarID === 'Youth Leadership Scholarship'){
          otherinfo = userData.YLsinfo
        }
        const formData = new FormData();
        formData.append('applicantNum', applicantNum);
        formData.append('address', address);
        formData.append('age', age);
        formData.append('baranggay', baranggay);
        formData.append('birthday', birthdayValue);
        formData.append('birthPlace', birthPlace);
        formData.append('caddress', caddress);
        formData.append('citizenship', citizenship);
        formData.append('collegeAddress', collegeAddress);
        formData.append('collegeAward', collegeAward);
        formData.append('collegeSchool', collegeSchool);
        formData.append('collegeYear', collegeYear);
        formData.append('contactNum', contactNum);
        formData.append('course', course);
        formData.append('currentSchool', currentSchool);
        formData.append('currentYear', currentYear);
        formData.append('elemAddress', elemAddress);
        formData.append('elemAward', elemAward);
        formData.append('elemSchool', elemSchool);
        formData.append('elemYear', elemYear);
        formData.append('email', email);
        formData.append('fatherEduc', fatherEduc);
        formData.append('fatherName', fatherName);
        formData.append('fatherlName', fatherlName);
        formData.append('fathermName', fathermName);
        formData.append('fatherOccu', fatherOccu);
        formData.append('financialSupport', financialSupport);
        formData.append('firstName', firstName);
        formData.append('gender', gender);
        formData.append('guardianContact', guardianContact);
        formData.append('guardianName', guardianName);
        formData.append('gwa', gwa);
        formData.append('highAddress', highAddress);
        formData.append('highAward', highAward);
        formData.append('highSchool', highSchool);
        formData.append('highYear', highYear);
        formData.append('howLong', howLong);
        formData.append('lastName', lastName);
        formData.append('middleName', middleName);
        formData.append('monthIncome', monthIncome);
        formData.append('motherEduc', motherEduc);
        formData.append('motherName', motherName);
        formData.append('motherlName', motherlName);
        formData.append('mothermName', mothermName);
        formData.append('motherOccu', motherOccu);
        formData.append('famNum', famNum);
        formData.append('ownerShip', ownerShip);
        formData.append('paddress', paddress);
        formData.append('relationship', relationship);
        formData.append('scholarID', scholarID);
        formData.append('typeSchool', typeSchool);
        formData.append('wereLive', wereLive);
        formData.append('AAsinfo', AAsinfo);
        formData.append('Asinfo', Asinfo);
        formData.append('Eslinfo', Es1info);
        formData.append('Esinfo', Esinfo);
        formData.append('YLsinfo', YLsinfo);
        formData.append('otherinfo', otherinfo);
        formData.append('Mdeceased', Mdeceased);
        formData.append('Fdeceased', Fdeceased);
      setLoading1(true)
      ApplyForm.CREATE_APPINFO(formData)
      .then(res => {
          console.log(res.data)
          if(res.data.success === 1){
           
            setUserData('');
            navigate('/Scho1');
            swal({
              title: "Success",
              text: "Successfully Submitted!",
              icon: "success",
              button: "OK",
            });
            setLoading1(false)
          }
          else{
            swal({
              title: "Success",
              text: "Something Went Wrong!",
              icon: "success",
              button: "OK",
            });
        setLoading1(false)
        navigate('/ApplicationForm');
      }
      }
       )
      .catch(err => console.log(err));
      setLoading1(false)
      }
  return (
    <>
    
    {!loading && <div className='Educ'>
        <div className="Educd">
            <div className="form">
            <div className="ribbon-header">
              <div className="ribbon-header-text"><h2>Current School Year Information</h2></div>
            </div>
            <div className="frmeduccs">
            <div className="frmeduccard1">
            <div className="frmeduccard11">

            <FormControl sx={{ minWidth: 150 }} size="small">
            <InputLabel id="demo-simple-select-required-label">Year Level</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={userData['currentYear']}
                label="Year Level"
                error={!!errors.currentYear}
                helperText={errors.currentYear}
                onChange={(e) =>setUserData({...userData,"currentYear" : e.target.value})}
              >
                <MenuItem value={'Elementary'}>Elementary</MenuItem>
                <MenuItem value={'Highschool'}>Highschool</MenuItem>
                <MenuItem value={'College'}>College</MenuItem>
              </Select>
              {errors && <FormHelperText sx={{color: 'red'}}>{errors.currentYear}</FormHelperText>}
            </FormControl>
              <div><FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-simple-select-required-label">Type of School</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={userData['typeSchool']}
                label="Type of School"
                onChange={(e) =>setUserData({...userData,"typeSchool" : e.target.value})}
              >
                <MenuItem value={'Public'}>Public</MenuItem>
                <MenuItem value={'Private'}>Private</MenuItem>
                <MenuItem value={'ALS'}>ALS</MenuItem>
                <MenuItem value={'Private(Scholarship,Voucher,Sponsored)'}>Private(Scholarship,Voucher,Sponsored)</MenuItem>
                <MenuItem value={'Public(Scholarship,Voucher,Sponsored)'}>Public(Scholarship,Voucher,Sponsored)</MenuItem>
                <MenuItem value={'Out of School Children'}>Out of School Children</MenuItem>
              </Select>
              {errors && <FormHelperText sx={{color: 'red'}}>{errors.typeSchool}</FormHelperText>}
            </FormControl></div>
            <div style={{width:'100%'}}><FormControl sx={{ minWidth: '100%' }} size="small">
              <InputLabel id="demo-simple-select-required-label">Degree Program/Course (Priority Course)</InputLabel>
              <Select
               MenuProps={{
                getContentAnchorEl: null,
                anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'left',
                },
                transformOrigin: {
                  vertical: 'top',
                  horizontal: 'left',
                },
                PaperProps: {
                  style: {
                    maxHeight: 250,
                  },
                },
              }}
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={userData['course']}
                label="Degree Program/Course (Priority Course)"
                onChange={(e) =>setUserData({...userData,"course" : e.target.value})}
              >
                <MenuItem value={'None'}>None</MenuItem>
                <MenuItem value={'Bachelor fo Science in Respiratory Therapy'}>Bachelor fo Science in Respiratory Therapy</MenuItem>
                <MenuItem value={'Bachelor in Landscape Architecture'}>Bachelor in Landscape Architecture</MenuItem>
                <MenuItem value={'Bachelor in Secondary Education Major in Mathematics'}>Bachelor in Secondary Education Major in Mathematics</MenuItem>
                <MenuItem value={'Bachelor in Secondary Education Major in Science'}>Bachelor in Secondary Education Major in Science</MenuItem>
                <MenuItem value={'Bachelor of Culture and the Arts Education'}>Bachelor of Culture and the Arts Education</MenuItem>
                <MenuItem value={'Bachelor of Data Science and Analytics'}>Bachelor of Data Science and Analytics</MenuItem>
                <MenuItem value={'Bachelor of Early Childhood Education'}>Bachelor of Early Childhood Education</MenuItem>
                <MenuItem value={'Bachelor of Fine Arts'}>Bachelor of Fine Arts</MenuItem>
                <MenuItem value={'Bachelor of Library and Information Science'}>Bachelor of Library and Information Science</MenuItem>
                <MenuItem value={'Bachelor of Medical Laboratory Science'}>Bachelor of Medical Laboratory Science</MenuItem>
                <MenuItem value={'Bachelor of Science in Accountancy'}>Bachelor of Science in Accountancy</MenuItem>
                <MenuItem value={'Bachelor of Science in Agribusiness'}>Bachelor of Science in Agribusiness</MenuItem>
                <MenuItem value={'Bachelor of Science in Agricultural and Biosystems Engineering'}>Bachelor of Science in Agricultural and Biosystems Engineering</MenuItem>
                <MenuItem value={'Bachelor of Science in Agroforestry'}>Bachelor of Science in Agroforestry</MenuItem>
                <MenuItem value={'Bachelor of Science in Aircraft Maintenance Technology'}>Bachelor of Science in Aircraft Maintenance Technology</MenuItem>
                <MenuItem value={'Bachelor of Science in Applied Mathematics'}>Bachelor of Science in Applied Mathematics</MenuItem>
                <MenuItem value={'Bachelor of Science in Applied Physics'}>Bachelor of Science in Applied Physics</MenuItem>
                <MenuItem value={'Bachelor of Science in Applied Statistics'}>Bachelor of Science in Applied Statistics</MenuItem>
                <MenuItem value={'Bachelor of Science in Architecture'}>Bachelor of Science in Architecture</MenuItem>
                <MenuItem value={'Bachelor of Science in Aviation'}>Bachelor of Science in Aviation</MenuItem>
                <MenuItem value={'Bachelor of Science in Aviation Technology'}>Bachelor of Science in Aviation Technology</MenuItem>
                <MenuItem value={'Bachelor of Science in Biochemistry'}>Bachelor of Science in Biochemistry</MenuItem>
                <MenuItem value={'Bachelor of Science in Biology'}>Bachelor of Science in Biology</MenuItem>
                <MenuItem value={'Bachelor of Science in Botany'}>Bachelor of Science in Botany</MenuItem>
                <MenuItem value={'Bachelor of Science in Business Administration Major in Business Analytics'}>Bachelor of Science in Business Administration Major in Business Analytics</MenuItem>
                <MenuItem value={'Bachelor of Science in Business Analytics'}>Bachelor of Science in Business Analytics</MenuItem>
                <MenuItem value={'Bachelor of Science in Ceramic Engineering'}>Bachelor of Science in Ceramic Engineering</MenuItem>
                <MenuItem value={'Bachelor of Science in Chemical Engineering'}>Bachelor of Science in Chemical Engineering</MenuItem>
                <MenuItem value={'Bachelor of Science in Chemistry'}>Bachelor of Science in Chemistry</MenuItem>
                <MenuItem value={'Bachelor of Science in Civil Engineering'}>Bachelor of Science in Civil Engineering</MenuItem>
                <MenuItem value={'Bachelor of Science in Climate Change'}>Bachelor of Science in Climate Change</MenuItem>
                <MenuItem value={'Bachelor of Science in Community Development'}>Bachelor of Science in Community Development</MenuItem>
                <MenuItem value={'Bachelor of Science in Computer Engineering'}>Bachelor of Science in Computer Engineering</MenuItem>
                <MenuItem value={'Bachelor of Science in Computer Science'}>Bachelor of Science in Computer Science</MenuItem>
                <MenuItem value={'Bachelor of Science in Cyber Security'}>Bachelor of Science in Cyber Security</MenuItem>
                <MenuItem value={'Bachelor of Science in Disaster Risk Management'}>Bachelor of Science in Disaster Risk Management</MenuItem>
                <MenuItem value={'Bachelor of Science in Electrical Engineering'}>Bachelor of Science in Electrical Engineering</MenuItem>
                <MenuItem value={'Bachelor of Science in Electronics and Communications Engineering'}>Bachelor of Science in Electronics and Communications Engineering</MenuItem>
                <MenuItem value={'Bachelor of Science in Electronics Engineering'}>Bachelor of Science in Electronics Engineering</MenuItem>
                <MenuItem value={'Bachelor of Science in Engineering Technology'}>Bachelor of Science in Engineering Technology</MenuItem>
                <MenuItem value={'Bachelor of Science in Entertainment and Multimedia Computing'}>Bachelor of Science in Entertainment and Multimedia Computing</MenuItem>
                <MenuItem value={'Bachelor of Science in Environmental Planning'}>Bachelor of Science in Environmental Planning</MenuItem>
                <MenuItem value={'Bachelor of Science in Environmental Science'}>Bachelor of Science in Environmental Science</MenuItem>
                <MenuItem value={'Bachelor of Science in Food Engineering'}>Bachelor of Science in Food Engineering</MenuItem>
                <MenuItem value={'Bachelor of Science in Game Development and Animation'}>Bachelor of Science in Game Development and Animation</MenuItem>
                <MenuItem value={'Bachelor of Science in Geodetic Engineering'}>Bachelor of Science in Geodetic Engineering</MenuItem>
                <MenuItem value={'Bachelor of Science in Geology'}>Bachelor of Science in Geology</MenuItem>
                <MenuItem value={'Bachelor of Science in Hospitality Management'}>Bachelor of Science in Hospitality Management</MenuItem>
                <MenuItem value={'Bachelor of Science in Human Biology'}>Bachelor of Science in Human Biology</MenuItem>
                <MenuItem value={'Bachelor of Science in Human Services'}>Bachelor of Science in Human Services</MenuItem>
                <MenuItem value={'Bachelor of Science in Indigenous Peoples Education'}>Bachelor of Science in Indigenous Peoples Education</MenuItem>
                <MenuItem value={'Bachelor of Science in Indigenous Peoples Studies'}>Bachelor of Science in Indigenous Peoples Studies</MenuItem>
                <MenuItem value={'Bachelor of Science in Industrial Engineering'}>Bachelor of Science in Industrial Engineering</MenuItem>
                <MenuItem value={'Bachelor of Science in Industrial Technology'}>Bachelor of Science in Industrial Technology</MenuItem>
                <MenuItem value={'Bachelor of Science in Information Systems'}>Bachelor of Science in Information Systems</MenuItem>
                <MenuItem value={'Bachelor of Science in Information Technology'}>Bachelor of Science in Information Technology</MenuItem>
                <MenuItem value={'Bachelor of Science in Interior Design'}>Bachelor of Science in Interior Design</MenuItem>
                <MenuItem value={'Bachelor of Science in Manufacturing Engineering'}>Bachelor of Science in Manufacturing Engineering</MenuItem>
                <MenuItem value={'Bachelor of Science in Marine Biology'}>Bachelor of Science in Marine Biology</MenuItem>
                <MenuItem value={'Bachelor of Science in Marine Engineering'}>Bachelor of Science in Marine Engineering</MenuItem>
                <MenuItem value={'Bachelor of Science in Marine Transportation'}>Bachelor of Science in Marine Transportation</MenuItem>
                <MenuItem value={'Bachelor of Science in Materials Engineering'}>Bachelor of Science in Materials Engineering</MenuItem>
                <MenuItem value={'Bachelor of Science in Mathematics'}>Bachelor of Science in Mathematics</MenuItem>
                <MenuItem value={'Bachelor of Science in Mechanical Engineering'}>Bachelor of Science in Mechanical Engineering</MenuItem>
                <MenuItem value={'Bachelor of Science in Mechatronics Engineering'}>Bachelor of Science in Mechatronics Engineering</MenuItem>
                <MenuItem value={'Bachelor of Science in Mechatronics Engineering Technology'}>Bachelor of Science in Mechatronics Engineering Technology</MenuItem>
                <MenuItem value={'Bachelor of Science in Medical Technology'}>Bachelor of Science in Medical Technology</MenuItem>
                <MenuItem value={'Bachelor of Science in Metallurgical Engineering'}>Bachelor of Science in Metallurgical Engineering</MenuItem>
                <MenuItem value={'Bachelor of Science in Meteorology'}>Bachelor of Science in Meteorology</MenuItem>
                <MenuItem value={'Bachelor of Science in Midwifery'}>Bachelor of Science in Midwifery</MenuItem>
                <MenuItem value={'Bachelor of Science in Mining Engineering'}>Bachelor of Science in Mining Engineering</MenuItem>
                <MenuItem value={'Bachelor of Science in Molecular Biology and Biotechnology'}>Bachelor of Science in Molecular Biology and Biotechnology</MenuItem>
                <MenuItem value={'Bachelor of Science in Nursing'}>Bachelor of Science in Nursing</MenuItem>
                <MenuItem value={'Bachelor of Science in Nutrition and Dietetics'}>Bachelor of Science in Nutrition and Dietetics</MenuItem>
                <MenuItem value={'Bachelor of Science in Occupational Therapy'}>Bachelor of Science in Occupational Therapy</MenuItem>
                <MenuItem value={'Bachelor of Science in Peace Education'}>Bachelor of Science in Peace Education</MenuItem>
                <MenuItem value={'Bachelor of Science in Peace Studies'}>Bachelor of Science in Peace Studies</MenuItem>
                <MenuItem value={'Bachelor of Science in Petroleum Engineering'}>Bachelor of Science in Petroleum Engineering</MenuItem>
                <MenuItem value={'Bachelor of Science in Physical Therapy'}>Bachelor of Science in Physical Therapy</MenuItem>
                <MenuItem value={'Bachelor of Science in Physics'}>Bachelor of Science in Physics</MenuItem>
                <MenuItem value={'Bachelor of Science in Production Engineering'}>Bachelor of Science in Production Engineering</MenuItem>
                <MenuItem value={'Bachelor of Science in Radiologic Technology'}>Bachelor of Science in Radiologic Technology</MenuItem>
                <MenuItem value={'Bachelor of Science in Renewable Energy'}>Bachelor of Science in Renewable Energy</MenuItem>
                <MenuItem value={'Bachelor of Science in Robotics Engineering'}>Bachelor of Science in Robotics Engineering</MenuItem>
                <MenuItem value={'Bachelor of Science in Sanitary Engineering'}>Bachelor of Science in Sanitary Engineering</MenuItem>
                <MenuItem value={'Bachelor of Science in Social Work'}>Bachelor of Science in Social Work</MenuItem>
                <MenuItem value={'Bachelor of Science in Speech-Language Pathology'}>Bachelor of Science in Speech-Language Pathology</MenuItem>
                <MenuItem value={'Bachelor of Science in Statistics'}>Bachelor of Science in Statistics</MenuItem>
                <MenuItem value={'Bachelor of Science in Structural Engineering'}>Bachelor of Science in Structural Engineering</MenuItem>
                <MenuItem value={'Bachelor of Science in Sustainable Energy'}>Bachelor of Science in Sustainable Energy</MenuItem>
                <MenuItem value={'Bachelor of Science in Tourism'}>Bachelor of Science in Tourism</MenuItem>
                <MenuItem value={'Bachelor of Science in Tourism Management'}>Bachelor of Science in Tourism Management</MenuItem>
                <MenuItem value={'Bachelor of Science/Bachelor of Arts in Psychology'}>Bachelor of Science/Bachelor of Arts in Psychology</MenuItem>
                <MenuItem value={'Bachelor of Special Needs Education'}>Bachelor of Special Needs Education</MenuItem>
                <MenuItem value={'Bachelor of Sports and Exercise Science'}>Bachelor of Sports and Exercise Science</MenuItem>
                <MenuItem value={'Doctor of Dental Medicine'}>Doctor of Dental Medicine</MenuItem>
                <MenuItem value={'Doctor of Optometry'}>Doctor of Optometry</MenuItem>
              </Select>
              {errors && <FormHelperText sx={{color: 'red'}}>{errors.course}</FormHelperText>}
            </FormControl></div>
            </div>
            <div className="frmeduccard2">
            <div> 
            <TextField
             label='School Name' 
             value={userData['currentSchool']} 
             onChange={(e) =>setUserData({...userData,"currentSchool" : e.target.value})} 
             margin='normal' 
             variant='outlined'
             size='small'
             error={!!errors.currentSchool}
            helperText={errors.currentSchool}
             color='secondary'/>
             </div>
             <div> 
            <TextField
             label='School Address' 
             value={userData['address']} 
             onChange={(e) =>setUserData({...userData,"address" : e.target.value})} 
             margin='normal' 
             variant='outlined'
             size='small'
             error={!!errors.address}
            helperText={errors.address}
             color='secondary'/>
             </div>
            </div>
            <div className="frmeduccard21">
            <div className='selectgwaed'><FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-simple-select-required-label">General Weighted Average</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={userData['gwa']}
                label="General Weighted Average"
                onChange={(e) =>setUserData({...userData,"gwa" : e.target.value})}
              >
                <MenuItem value={'96-100 or 1.00'}>96-100 or 1.00</MenuItem>
                <MenuItem value={'91-95 or 1.25'}>91-95 or 1.25</MenuItem>
                <MenuItem value={'86-90 or 2.00'}>86-90 or 2.00</MenuItem>
                <MenuItem value={'81-85 or 2.25'}>81-85 or 2.25</MenuItem>
                <MenuItem value={'80 below or 2.50 below'}>80 below or 2.50 below</MenuItem>
              </Select>
              {errors && <FormHelperText sx={{color: 'red'}}>{errors.gwa}</FormHelperText>}
            </FormControl></div>
            <div className='selectgwaed'><FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-simple-select-required-label">Financial Support</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={userData['financialSupport']}
                label="General Weighted Average"
                onChange={(e) =>setUserData({...userData,"financialSupport" : e.target.value})}
              >
                <MenuItem value={'Supported by Parent'}>Supported by Parent</MenuItem>
                <MenuItem value={'Supported by Relatives'}>Supported by Relatives</MenuItem>
                <MenuItem value={'Working Student'}>Working Student</MenuItem>
                <MenuItem value={'Scholarship'}>Scholarship</MenuItem>
                <MenuItem value={'Sponsorship'}>Sponsorship</MenuItem>
                <MenuItem value={'Others'}>Others</MenuItem>
              </Select>
              {errors && <FormHelperText sx={{color: 'red'}}>{errors.financialSupport}</FormHelperText>}
            </FormControl></div>
            </div>
            </div>
            </div>
            <div className="ribbon-header">
              <div className="ribbon-header-text"><h2>Educational Background</h2></div>
            </div>
            <div className="frmeducbehc">
            <div className="frmeduccard">
            <div className='highlabelswit'>
            <h5>Elementary School</h5>
             </div>
            <div> 
            <TextField
             label='School Name' 
             value={userData['elemSchool']} 
             onChange={(e) =>setUserData({...userData,"elemSchool" : e.target.value})} 
             margin='normal' 
             variant='outlined'
             size='small'
             error={!!errors.elemSchool}
            helperText={errors.elemSchool}
             color='secondary'/>
             </div>
             <div> 
            <TextField
             label='Address' 
             value={userData['elemAddress']} 
             onChange={(e) =>setUserData({...userData,"elemAddress" : e.target.value})} 
             margin='normal' 
             variant='outlined'
             size='small'
             error={!!errors.elemAddress}
            helperText={errors.elemAddress}
             color='secondary'/>
             </div>
             <div> 
            <TextField
             label='School Year' 
             placeholder='ex.2002-2004'
             value={userData['elemYear']} 
             onChange={(e) =>setUserData({...userData,"elemYear" : e.target.value})} 
             margin='normal' 
             variant='outlined'
             size='small'
             error={!!errors.elemYear}
            helperText={errors.elemYear}
             color='secondary'/>
             </div>
             <div> 
            <TextField
             label='Award' 
             value={userData['elemAward']} 
             onChange={(e) =>setUserData({...userData,"elemAward" : e.target.value})} 
             margin='normal' 
             variant='outlined'
             size='small'
             error={!!errors.elemAward}
            helperText={errors.elemAward}
             color='secondary'/>
             </div>
            </div>
            <div className="frmeduccard">
              <div className='highlabelswit'>
            <h5>HighSchool</h5>
            <Switch
             checked={!switchState}
             onChange={HighhandleSwitchChange}
            color="primary"
             />
             </div>
            <div> 
            <TextField
            disabled={switchState}
             label='School Name' 
             value={userData['highSchool']} 
             onChange={(e) =>setUserData({...userData,"highSchool" : e.target.value})} 
             margin='normal' 
             variant='outlined'
             size='small'
             error={!!errors.highSchool}
            helperText={errors.highSchool}
             color='secondary'/>
             </div>
             <div> 
            <TextField
            disabled={switchState}
             label='Address' 
             value={userData['highAddress']} 
             onChange={(e) =>setUserData({...userData,"highAddress" : e.target.value})} 
             margin='normal' 
             variant='outlined'
             size='small'
             error={!!errors.highAddress}
            helperText={errors.highAddress}
             color='secondary'/>
             </div>
             <div> 
            <TextField
            disabled={switchState}
            placeholder='ex.2002-2004'
             label='School Year' 
             value={userData['highYear']} 
             onChange={(e) =>setUserData({...userData,"highYear" : e.target.value})} 
             margin='normal' 
             variant='outlined'
             size='small'
             error={!!errors.highYear}
             helperText={errors.highYear}
             color='secondary'/>
             </div>
             <div> 
            <TextField
            disabled={switchState}
             label='Award' 
             value={userData['highAward']} 
             onChange={(e) =>setUserData({...userData,"highAward" : e.target.value})} 
             margin='normal' 
             variant='outlined'
             size='small'
             error={!!errors.highAward}
            helperText={errors.highAward}
             color='secondary'/>
             </div>
            </div>
            <div className="frmeduccard">
            <div className='highlabelswit'>
            <h5>College</h5>
            <Switch
             checked={!switchState1}
             onChange={CollhandleSwitchChange}
            color="primary"
             />
             </div>
            <div> 
            <TextField
            disabled={switchState1}
             label='School Name' 
             value={userData['collegeSchool']} 
             onChange={(e) =>setUserData({...userData,"collegeSchool" : e.target.value})} 
             margin='normal' 
             variant='outlined'
             size='small'
             error={!!errors.collegeSchool}
            helperText={errors.collegeSchool}
             color='secondary'/>
             </div>
             <div> 
            <TextField
            disabled={switchState1}
             label='Address' 
             value={userData['collegeAddress']} 
             onChange={(e) =>setUserData({...userData,"collegeAddress" : e.target.value})} 
             margin='normal' 
             variant='outlined'
             size='small'
             error={!!errors.collegeAddress}
            helperText={errors.collegeAddress}
             color='secondary'/>
             </div>
             <div> 
            <TextField
            disabled={switchState1}
            placeholder='ex.2002-2004'
             label='School Year' 
             value={userData['collegeYear']} 
             onChange={(e) =>setUserData({...userData,"collegeYear" : e.target.value})} 
             margin='normal' 
             variant='outlined'
             size='small'
             error={!!errors.collegeYear}
            helperText={errors.collegeYear}
             color='secondary'/>
             </div>
             <div> 
            <TextField
            disabled={switchState1}
             label='Award' 
             value={userData['collegeAward']} 
             onChange={(e) =>setUserData({...userData,"collegeAward" : e.target.value})} 
             margin='normal' 
             variant='outlined'
             size='small'
             error={!!errors.collegeAward}
            helperText={errors.collegeAward}
             color='secondary'/>
             </div>
            </div>
            </div>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            <FormControlLabel control={<Checkbox checked={isChecked} onChange={handleCheckboxChange} />} label="" />
            <Link href="#" underline="hover" sx={{color:'black'}} onClick={handleClickOpen('paper')}>
              {' I hereby attest to the accuracy of the information supplied in the form. I understand that giving false information will make me ineligible for application.'}
            </Link>
            <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">TERMS AND CONDITIONS</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
   <Typography component="div" variant="body1">
    By filling out the form, you agree to the following terms and conditions:
    <br />
    <br />
    1. Accuracy of Information: You agree to provide accurate, complete, and up-to-date information in the form. Any false or misleading information provided may result in the rejection of your submission or termination of any subsequent agreement or relationship.
    <br />
    <br />
    2. Consent for Data Collection: By submitting the form, you consent to the collection, storage, and processing of the information provided in accordance with applicable privacy laws and the stated purpose of the form.
    <br />
    <br />
    3. Purpose of Data Usage: The information you provide in the form may be used for the intended purpose stated in the form, such as processing your request, evaluating your eligibility for a service, or contacting you regarding the matter in question.
    <br />
    <br />
    4. Data Protection: Reasonable measures will be taken to protect the confidentiality and security of the information you provide. However, please note that no method of transmission or storage over the internet is completely secure, and there is always a risk of unauthorized access or data breaches.
    <br />
    <br />
    5. Third-Party Sharing: In some cases, your information may be shared with third parties, such as service providers or partners, to fulfill the purpose of the form. However, your information will not be sold or rented to third parties for marketing purposes without your explicit consent.
    <br />
    <br />
    6. Retention of Information: The information you provide may be retained for as long as necessary to fulfill the purpose of the form or as required by applicable laws or regulations.
    <br />
    <br />
    7. Right to Access and Update Information: You have the right to access, update, and correct any personal information you have provided in the form. You may also have the right to request the deletion of your information, subject to applicable legal requirements.
    <br />
    <br />
    8. Limitation of Liability: The organization or entity collecting the information through the form will not be liable for any direct, indirect, incidental, or consequential damages arising from the use or misuse of the information provided, or any errors, omissions, or delays in the processing of the information.
    <br />
    <br />
    9. Changes to Terms and Conditions: The terms and conditions for filling out the form may be updated or modified from time to time. By continuing to use the form, you agree to be bound by the most recent version of the terms and conditions.
    <br />
    <br />
    It is important to carefully review and understand the terms and conditions before filling out the form. If you have any questions or concerns, you should seek clarification from the organization or entity responsible for the form.
  </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleButtonClick}>Agree</Button>
        </DialogActions>
            </Dialog>
            </div>
            <div className="frmedcbtn">
            <Button className='myButton' variant="contained" onClick={() => setStep(4)}>Previous</Button>
            
            <LoadingButton
                loading={loading1}
                loadingPosition="end"
                variant="elevated"
                fullWidth
                sx={{color:'white',width:'max-Content'}}
                className='myButton1'
                onClick={submitData}
                disabled={!isChecked}
              >
                Submit
              </LoadingButton>
            </div>
            </div>
        </div>
    </div>}{loading && <LoopingRhombusesSpinner/>}
    </>
  )
}

export default Educational