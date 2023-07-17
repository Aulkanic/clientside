import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { multiStepContext } from './StepContext';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { FormHelperText } from '@mui/material';
import swal from 'sweetalert';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import '../css/persona.css'
import '../css/buttonStyle.css'
import dayjs from 'dayjs';
import { Rulelist } from '../../Api/request';
import { styled, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme();

const StyledDatePicker = styled(DatePicker)(({ theme }) => ({
  color:'black',
  width: '290px',
  marginTop: theme.spacing(2),

}));

function Persona() {
    const { setStep, userData, setUserData} = useContext(multiStepContext);
    const [errors, setErrors] = useState({}); 
    const today = dayjs();
    const [rule,setRule] = useState([])

    useEffect(() =>{
          async function Fetch(){
            const rul = await Rulelist.FETCH_RULE()
            setRule(rul.data.result[0])
          }
          Fetch()
    },[])

    function Check(){
        const errors = {};
        if (userData.firstName === '') {
          errors.firstName = "First Name is required";
        } 
        else if (userData.firstName.length === 1) {
          errors.firstName = "Input must not contain a single letter.";
        }
        else if (userData.firstName.length > 50) {
          errors.firstName = "Input should contain less than 50 characters.";
        }
        else if (/[0-9]/.test(userData.firstName)) {
          errors.firstName = "Input must not contain numeric value.";
        }
        else if (/[!@#$%^&*/_(),.?":{}|<>]/.test(userData.firstName)) {
          errors.firstName = "Special characters are not allowed.";
        }
         else if (!/^[A-Z][A-Za-z,\s]*$/.test(userData.firstName)) {
          errors.firstName = "First Letter must be Capital";
        }
        if (userData.lastName === '') {
          errors.lastName = "Last Name is required";
        } else if (userData.lastName.length === 1) {
          errors.lastName = "Input must not contain a single letter.";
        } else if (userData.lastName.length > 50) {
          errors.lastName = "Input should contain less than 50 characters.";
        } else if (/[0-9]/.test(userData.lastName)) {
          errors.lastName = "Input must not contain numeric value";
        } else if (/[!@#$%^&*/_(),?":{}|<>]/.test(userData.lastName)) {
          errors.lastName = "Special characters are not allowed.";
        } else if (userData.lastName.charAt(0) !== userData.lastName.charAt(0).toUpperCase()) {
          errors.lastName = "First Letter must be Capital";
        }
        if (userData.middleName === '') {
          errors.middleName = "Middle Name is required";
        } else if (userData.middleName.length === 1) {
          errors.middleName = "Input must not contain a single letter.";
        }else if (userData.middleName.length > 50) {
          errors.middleName = "Input should contain less than 50 characters.";
        }  else if (/[0-9]/.test(userData.middleName)) {
          errors.middleName = "Input must not contain numeric value";
        } else if (/[!@#$%^&*/_(),.?":{}|<>]/.test(userData.middleName)) {
          errors.middleName = "Special characters are not allowed.";
        } else if (!/^[A-Z][A-Za-z,\s]*$/.test(userData.middleName)) {
          errors.middleName = "First Letter must be Capital";
        }
        if (!userData.gender) {
          errors.gender = "Please Select your Gender";
        }
        if (userData.citizenship === '') {
          errors.citizenship = "Citizenship is required";
        }else if (userData.citizenship.length === 1) {
          errors.citizenship = "Input must not contain a single letter.";
        }else if (userData.citizenship.length > 50) {
          errors.citizenship = "Input should contain less than 50 characters.";
        } else if (/[0-9]/.test(userData.citizenship)) {
          errors.citizenship = "Input must not contain numeric value";
        } else if (/[!@#$%^&*/_(),.?":{}|<>]/.test(userData.citizenship)) {
          errors.citizenship = "Special characters are not allowed.";
        } else if (!/^[A-Z][A-Za-z,\s]*$/.test(userData.citizenship)) {
          errors.citizenship = "First Letter must be Capital";
        }
        if (userData.birthday === '') {
          errors.birthday = "Birthday is required";
        }
        if (userData.age === '') {
          errors.age = "Age is required";
        } else if (userData.age <= 0) {
          errors.age = "Invalid Age";
        }else if (/[a-zA-Z]/.test(userData.age)) {
          errors.age = "Input must not contain letter value";
        }else if (/[!@#$%^&*/_(),.?":{}|<>]/.test(userData.age)) {
          errors.age = "Special characters are not allowed.";
        }else if (userData.age > rule.ageNum) {
          errors.age = "Not Qualified";
          swal({
            title: "Warning",
            text: `You are not Qualify to Apply Scholarship.Only ${rule.ageNum} below must considered.`,
            icon: "warning",
            button: "OK",
          });
          setStep(2);
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
        if (userData.email === '') {
          errors.email = "Email is required";
        } else if (!/^[A-Za-z0-9._%+-]+@gmail\.com$/.test(userData.email)) {
           errors.email = "Email is invalid";
        }
        if (userData.paddress === '') {
          errors.paddress = "Permanent Address is required";
        }else if (/[!@#$%^&*/_()?":{}|<>]/.test(userData.paddress)) {
          errors.paddress = "Special characters are not allowed.";
        }
        if (userData.caddress === '') {
          errors.caddress = "Current Address is required";
        }else if (/[!@#$%^&*/_()?":{}|<>]/.test(userData.caddress)) {
          errors.caddress = "Special characters are not allowed.";
        }
        console.log(Object.keys(errors).length)
        if (Object.keys(errors).length > 0) {
          setErrors(errors);
          console.log(errors)
          return;
        }
        setErrors('')
        setStep(3)
    };
    const calculateAge = (birthday) => {
      console.log(birthday)
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
      console.log(age)
      setUserData((prevData) => ({ ...prevData, age: age.toString() }));
    }, [userData.birthday]);

    const handleInputChange = (date) => {

      setUserData((prevData) => ({ ...prevData, birthday: date }));
    };

    // const isDateDisabled = (date) => {
    //   const cutoffDate = dayjs(date); // July 12, 2012
    //   const today = dayjs().startOf('day'); // Get today's date
    
    //   return dayjs(date).isAfter(cutoffDate, 'day') || dayjs(date).isAfter(today, 'day') || isBeforeDay(dayjs(date), comparingDate);
    // };
    return (
    <div className='Persona'>
        <div className="personad"> 
           <form>
            <div className="ribbon-header">
              <div className="ribbon-header-text"><h2>Personal Information</h2></div>
            </div>
            <div className="personfrmcon">
            <div className="frmpcard">     
            <TextField
             label='First Name' 
             value={userData['firstName']} 
             onChange={(e) =>setUserData({...userData,"firstName" : e.target.value})} 
             margin='normal' 
             variant='outlined'
             size='small'
             error={!!errors.firstName}
            helperText={errors.firstName}
             color='secondary'/>
            <TextField 
            label='Last Name' 
            value={userData['lastName']} 
            onChange={(e) =>setUserData({...userData,"lastName" : e.target.value})} 
            margin='normal' 
            size='small'
            error={!!errors.lastName}
            helperText={errors.lastName}
            variant='outlined' 
            color='secondary'/>
            <TextField 
            label='Middle Name' 
            value={userData['middleName']} 
            onChange={(e) =>setUserData({...userData,"middleName" : e.target.value})} 
            margin='normal' 
            size='small'
            variant='outlined' 
            error={!!errors.middleName}
            helperText={errors.middleName}
            color='secondary'/>
            <div className='selectgend'>
            <FormControl sx={{ minWidth: 293 }} size="small">
            <InputLabel id="demo-simple-select-required-label">Gender</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-large"
                value={userData['gender']}
                label="gender"
                error={!!errors.gender}
                helperText={errors.gender}
                onChange={(e) =>setUserData({...userData,"gender" : e.target.value})}
              >
                <MenuItem value={'Male'}>Male</MenuItem>
                <MenuItem value={'Female'}>Female</MenuItem>
                <MenuItem value={'Other'}>Other</MenuItem>
              </Select>
              {errors && <FormHelperText sx={{color: 'red'}}>{errors.gender}</FormHelperText>}
            </FormControl>
            </div>
              </div>
            <div className="frmpcard">
            <TextField 
            label='Citizenship'
            size='small' 
            value={userData['citizenship']} 
            onChange={(e) =>setUserData({...userData,"citizenship" : e.target.value})} 
            margin='normal' 
            variant='outlined'
            error={!!errors.citizenship}
            helperText={errors.citizenship} 
            color='secondary'/>
      <div >
        <FormControl sx={{ minWidth: 450, minHeight: 50 }} size='small' fullWidth>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <StyledDatePicker                
                   label="Birthday" 
                   error={!!errors.birthday}
                   id="dateofbirth"
                   value={userData['birthday']} 
                   onChange={handleInputChange}  
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        error={!!errors.birthday}
                      />
                    )}                 
                   />
                </DemoContainer>
              </LocalizationProvider>
          {errors.birthday && <FormHelperText sx={{ color: 'red' }}>{errors.birthday}</FormHelperText>}
        </FormControl>
      </div>
      <TextField
        label='Age'
        size='small'
        value={userData['age']}
        onChange={handleInputChange}
        margin='normal'
        error={!!errors.age}
        helperText={errors.age}
        variant='outlined'
        color='secondary'
        disabled
      />
            <TextField
             label='Birth of Place'
             size='small'
              value={userData['birthPlace']} 
              onChange={(e) =>setUserData({...userData,"birthPlace" : e.target.value})} 
              margin='normal' 
              error={!!errors.birthPlace}
              helperText={errors.birthPlace} 
              variant='outlined' 
              color='secondary'/>
            </div>
            <div className="frmpcard">
            <TextField
             label='Contact Number'
             size='small' 
             value={userData['contactNum']} 
             onChange={(e) =>setUserData({...userData,"contactNum" : e.target.value})} 
             margin='normal'
             error={!!errors.contactNum}
             helperText={errors.contactNum} 
             variant='outlined' 
             color='secondary'/>
            <TextField 
            type='email' 
            label='Email' 
            size='small'
            value={userData['email']} onChange={(e) =>setUserData({...userData,"email" : e.target.value})} 
            margin='normal' 
            variant='outlined' 
            error={!!errors.email}
            helperText={errors.email}
            color='secondary'/>
            <TextField 
            label='Permanent Address (Complete Address) '
            size='small' 
            value={userData['paddress']} 
            onChange={(e) =>setUserData({...userData,"paddress" : e.target.value})} 
            margin='normal' 
            variant='outlined'
            error={!!errors.paddress}
            helperText={errors.paddress} 
            color='secondary'/>
            <TextField 
            label='Current Address (Complete Address) ' 
            size='small'
            value={userData['caddress']} 
            onChange={(e) =>setUserData({...userData,"caddress" : e.target.value})} 
            margin='normal' 
            variant='outlined' 
            error={!!errors.caddress}
            helperText={errors.caddress}
            color='secondary'/>
            </div>
            </div>
            <div className='btnfrmn'>
            <Button className='myButton' variant="contained" onClick={() => setStep(1)}>Previous</Button>
            <Button className='myButton1' variant="contained" onClick={Check}>Next</Button>
            </div>
            </form>
        </div>
    </div>
  )
}

export default Persona