import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import { useContext } from 'react';
import { multiStepContext } from './StepContext';
import Select from '@mui/material/Select';
import { FetchingFamily,Rulelist } from '../../Api/request';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { FormHelperText } from '@mui/material';
import swal from 'sweetalert';
import '../css/family.css'
import '../css/buttonStyle.css'
function Family() {
    const { setStep, userData, setUserData} = useContext(multiStepContext);
    const [errors, setErrors] = useState({}); 
    const [famlist, setFamlist] = useState([]);
    const [rule,setRule] = useState([])

    useEffect(() =>{
      async function fetch(){
          const famdata = await FetchingFamily.FETCH_FAM();
          const datafam = famdata.data.Familylist;
          const rul = await Rulelist.FETCH_RULE()
          setRule(rul.data.result[0])
          setFamlist(datafam)
        }

        fetch()
    },[])
        console.log(rule)
      function Check(){
        const errors = {};
        let checkfammum = 0;
        let checkfamdad = 0;
        if (userData.motherName === '') {
          errors.motherName = "This Field is required";
        } 
        else if (userData.motherName.length === 1) {
          errors.motherName = "Input must not contain a single letter.";
        }
        else if (userData.motherName.length > 50) {
          errors.motherName = "Input should contain less than 50 characters.";
        }
        else if (/[0-9]/.test(userData.motherName)) {
          errors.motherName = "Input must not contain numeric value.";
        }
        else if (/[!@#$%^&*/_(),.?":{}|<>]/.test(userData.motherName)) {
          errors.motherName = "Special characters are not allowed.";
        }
         else if (!/^[A-Z][A-Za-z,\s]*$/.test(userData.motherName)) {
          errors.motherName = "First Letter must be Capital";
        }
        else if(famlist?.some((item) => item.motherName === userData.motherName)){
          checkfammum += 1;
        }
        if (userData.motherlName === '') {
          errors.motherlName = "This Field is required";
        } 
        else if (userData.motherlName.length === 1) {
          errors.motherlName = "Input must not contain a single letter.";
        }
        else if (userData.motherlName.length > 50) {
          errors.motherlName = "Input should contain less than 50 characters.";
        }
        else if (/[0-9]/.test(userData.motherlName)) {
          errors.motherlName = "Input must not contain numeric value.";
        }
        else if (/[!@#$%^&*/_(),?":{}|<>]/.test(userData.motherlName)) {
          errors.motherlName = "Special characters are not allowed.";
        }
         else if (userData.motherlName.charAt(0) !== userData.motherlName.charAt(0).toUpperCase()) {
          errors.motherlName = "First Letter must be Capital";
        }
        else if(famlist?.some((item) => item.motherlName === userData.motherlName)){
          checkfammum += 1;
        }
        if (userData.mothermName === '') {
          errors.mothermName = "This Field is required";
        } 
        else if (userData.mothermName.length === 1) {
          errors.mothermName = "Input must not contain a single letter.";
        }
        else if (userData.mothermName.length > 50) {
          errors.mothermName = "Input should contain less than 50 characters.";
        }
        else if (/[0-9]/.test(userData.mothermName)) {
          errors.mothermName = "Input must not contain numeric value.";
        }
        else if (/[!@#$%^&*/_(),.?":{}|<>]/.test(userData.mothermName)) {
          errors.mothermName = "Special characters are not allowed.";
        }
         else if (!/^[A-Z][A-Za-z,\s]*$/.test(userData.mothermName)) {
          errors.mothermName = "First Letter must be Capital";
        }
        else if(famlist?.some((item) => item.mothermName === userData.mothermName)){
          checkfammum += 1;
        }
        if (userData.motherOccu === '') {
          errors.motherOccu = "This Field is required";
        } else if (userData.motherOccu.length === 1) {
          errors.motherOccu = "Input must not contain a single letter.";
        } else if (userData.motherOccu.length > 50) {
          errors.motherOccu = "Input should contain less than 50 characters.";
        } else if (/[0-9]/.test(userData.motherOccu)) {
          errors.motherOccu = "Input must not contain numeric value";
        } else if (/[!@#$%^&*/_(),.?":{}|<>]/.test(userData.motherOccu)) {
          errors.motherOccu = "Special characters are not allowed.";
        } else if (!/^[A-Z][A-Za-z,\s]*$/.test(userData.motherOccu)) {
          errors.motherOccu = "First Letter must be Capital";
        }
        if (userData.motherEduc === '') {
          errors.motherEduc = "This Field is required";
        } else if (userData.motherEduc.length === 1) {
          errors.motherEduc = "Input must not contain a single letter.";
        } else if (/[0-9]/.test(userData.motherEduc)) {
          errors.motherEduc = "Input must not contain numeric value";
        } else if (/[!@#$%^&*/_(),.?":{}|<>]/.test(userData.motherEduc)) {
          errors.motherEduc = "Special characters are not allowed.";
        } else if (!/^[A-Z][A-Za-z,\s]*$/.test(userData.motherEduc)) {
          errors.motherEduc = "First Letter must be Capital";
        }
        if (userData.fatherName === '') {
          errors.fatherName = "This Field is required";
        } 
        else if (userData.fatherName.length === 1) {
          errors.fatherName = "Input must not contain a single letter.";
        }
        else if (userData.fatherName.length > 50) {
          errors.fatherName = "Input should contain less than 50 characters.";
        } 
        else if (/[0-9]/.test(userData.fatherName)) {
          errors.fatherName = "Input must not contain numeric value.";
        }
        else if (/[!@#$%^&*/_(),.?":{}|<>]/.test(userData.fatherName)) {
          errors.fatherName = "Special characters are not allowed.";
        }
         else if (!/^[A-Z][A-Za-z,\s]*$/.test(userData.fatherName)) {
          errors.fatherName = "First Letter must be Capital";
        }
        else if(famlist?.some((item) => item.fatherName === userData.fatherName)){
          checkfamdad += 1;
        }
        if (userData.fatherlName === '') {
          errors.fatherlName = "This Field is required";
        } 
        else if (userData.fatherlName.length === 1) {
          errors.fatherlName = "Input must not contain a single letter.";
        }
        else if (userData.fatherlName.length > 50) {
          errors.fatherlName = "Input should contain less than 50 characters.";
        } 
        else if (/[0-9]/.test(userData.fatherlName)) {
          errors.fatherlName = "Input must not contain numeric value.";
        }
        else if (/[!@#$%^&*/_(),?":{}|<>]/.test(userData.fatherlName)) {
          errors.fatherlName = "Special characters are not allowed.";
        }
         else if (userData.fatherlName.charAt(0) !== userData.fatherlName.charAt(0).toUpperCase()) {
          errors.fatherlName = "First Letter must be Capital";
        }
        else if(famlist?.some((item) => item.fatherlName === userData.fatherlName)){
          checkfamdad += 1;
        }
        if (userData.fathermName === '') {
          errors.fathermName = "This Field is required";
        } 
        else if (userData.fathermName.length === 1) {
          errors.fathermName = "Input must not contain a single letter.";
        }
        else if (userData.fathermName.length > 50) {
          errors.fathermName = "Input should contain less than 50 characters.";
        } 
        else if (/[0-9]/.test(userData.fathermName)) {
          errors.fathermName = "Input must not contain numeric value.";
        }
        else if (/[!@#$%^&*/_(),.?":{}|<>]/.test(userData.fathermName)) {
          errors.fathermName = "Special characters are not allowed.";
        }
         else if (!/^[A-Z][A-Za-z,\s]*$/.test(userData.fathermName)) {
          errors.fathermName = "First Letter must be Capital";
        }
        else if(famlist?.some((item) => item.fathermname === userData.fathermName)){
          checkfamdad += 1;
        }
        if (userData.fatherOccu === '') {
          errors.fatherOccu = "This Field is required";
        } else if (userData.fatherOccu.length === 1) {
          errors.fatherOccu = "Input must not contain a single letter.";
        } else if (userData.fatherOccu.length > 50) {
          errors.fatherOccu = "Input should contain less than 50 characters.";
        }  else if (/[0-9]/.test(userData.fatherOccu)) {
          errors.fatherOccu = "Input must not contain numeric value";
        } else if (/[!@#$%^&*/_(),.?":{}|<>]/.test(userData.fatherOccu)) {
          errors.fatherOccu = "Special characters are not allowed.";
        } else if (!/^[A-Z][A-Za-z,\s]*$/.test(userData.fatherOccu)) {
          errors.fatherOccu = "First Letter must be Capital";
        }
        if (userData.fatherEduc === '') {
          errors.fatherEduc = "This Field is required";
        } else if (userData.fatherEduc.length === 1) {
          errors.fatherEduc = "Input must not contain a single letter.";
        } else if (/[0-9]/.test(userData.fatherEduc)) {
          errors.fatherEduc = "Input must not contain numeric value";
        } else if (/[!@#$%^&*/_(),.?":{}|<>]/.test(userData.fatherEduc)) {
          errors.fatherEduc = "Special characters are not allowed.";
        } else if (!/^[A-Z][A-Za-z,\s]*$/.test(userData.fatherEduc)) {
          errors.fatherEduc = "First Letter must be Capital";
        }
        if (userData.guardianName === '') {
          errors.guardianName = "This Field is required";
        } 
        else if (userData.guardianName.length === 1) {
          errors.guardianName = "Input must not contain a single letter.";
        }
        else if (/[0-9]/.test(userData.guardianName)) {
          errors.guardianName = "Input must not contain numeric value.";
        }
        else if (/[!@#$%^&*/_(),.?":{}|<>]/.test(userData.guardianName)) {
          errors.guardianName = "Special characters are not allowed.";
        }
         else if (!/^[A-Z][A-Za-z,\s]*$/.test(userData.guardianName)) {
          errors.guardianName = "First Letter must be Capital";
        }
        if (userData.relationship === '') {
          errors.relationship = "This Field is required";
        } 
        else if (userData.relationship.length === 1) {
          errors.relationship = "Input must not contain a single letter.";
        }
        else if (/[0-9]/.test(userData.relationship)) {
          errors.relationship = "Input must not contain numeric value.";
        }
        else if (/[!@#$%^&*/_(),.?":{}|<>]/.test(userData.relationship)) {
          errors.relationship = "Special characters are not allowed.";
        }
         else if (!/^[A-Z][A-Za-z,\s]*$/.test(userData.relationship)) {
          errors.relationship = "First Letter must be Capital";
        }
        if (userData.guardianContact === '') {
          errors.guardianContact = "Phone Number is required";
        } else if (!/^09\d{9}$/.test(userData.guardianContact)) {
          errors.guardianContact = "Invalid phone number.";
        }
        if (userData.famNum === '') {
          errors.famNum = "This Field is required";
        }else if (/[!@#$%^&*/_(),.?":{}|<>]/.test(userData.famNum)) {
          errors.famNum = "Special characters are not allowed.";
        }
        const famrule = 3 * rule.famNum
        if(checkfammum === famrule && checkfamdad === famrule){
          errors.valid = 'Invalid'
          swal({
            title: "Warning",
            text: 'One Family Per head',
            icon: "warning",
            button: "OK",
          });
        }
        if (Object.keys(errors).length > 0) {
          setErrors(errors);
          return;
        }
        setErrors('')
        setStep(5)
    }; 

    return (
    <div className='Fam'>
        <div className="Famd">
            <div className="form">
            <div className='familyfrm'>
            <div className="ribbon-header">
              <div className="ribbon-header-text"><h2>Family Information</h2></div>
            </div>
            <div className="fammf">
            <h3>Mother Information</h3>
            <div className="frmfamcard">
              <div>         
            <TextField
             label='First Name' 
             value={userData['motherName']} 
             onChange={(e) =>setUserData({...userData,"motherName" : e.target.value})} 
             margin='normal' 
             variant='outlined'
             size='small'
             error={!!errors.motherName}
            helperText={errors.motherName}
             color='secondary'/>
            <TextField
             label='Last Name' 
             value={userData['motherlName']} 
             onChange={(e) =>setUserData({...userData,"motherlName" : e.target.value})} 
             margin='normal' 
             variant='outlined'
             size='small'
             error={!!errors.motherlName}
            helperText={errors.motherlName}
             color='secondary'/>
            <TextField
             label='Middle Name' 
             value={userData['mothermName']} 
             onChange={(e) =>setUserData({...userData,"mothermName" : e.target.value})} 
             margin='normal' 
             variant='outlined'
             size='small'
             error={!!errors.mothermName}
            helperText={errors.mothermName}
             color='secondary'/>
             </div>
             <div>
            <TextField
             label='Occupation' 
             value={userData['motherOccu']} 
             onChange={(e) =>setUserData({...userData,"motherOccu" : e.target.value})} 
             margin='normal' 
             variant='outlined'
             size='small'
             error={!!errors.motherOccu}
            helperText={errors.motherOccu}
             color='secondary'/>
             <div className='selecthea'>
             <FormControl sx={{ minWidth: 150}} size="small">
            <InputLabel id="demo-simple-select-required-label">Highest Educational Attainment</InputLabel>
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
                    maxHeight: 250, // Adjust the maximum height of the menu
                  },
                },
              }}
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={userData['motherEduc']}
                label="Highest Educational Attainment"
                error={!!errors.motherEduc}
                helperText={errors.motherEduc}
                onChange={(e) =>setUserData({...userData,"motherEduc" : e.target.value})}
              >
                <MenuItem value={'No Grade Completed'}>No Grade Completed</MenuItem>
                <MenuItem value={'Elementary Undergraduate'}>Elementary Undergraduate</MenuItem>
                <MenuItem value={'Elementary Graduate'}>Elementary Graduate</MenuItem>
                <MenuItem value={'High School Undergraduate'}>High School Undergraduate</MenuItem>
                <MenuItem value={'High School Graduate'}>High School Graduate</MenuItem>
                <MenuItem value={'Post Secondary Undergraduate'}>Post Secondary Undergraduate</MenuItem>
                <MenuItem value={'Post Secondary Graduate'}>Post Secondary Graduate</MenuItem>
                <MenuItem value={'College Undergraduate'}>College Undergraduate</MenuItem>
                <MenuItem value={'College Graduate'}>College Graduate</MenuItem>
                <MenuItem value={'Post Baccalaureate'}>Post Baccalaureate</MenuItem>
              </Select>
              {errors && <FormHelperText sx={{color: 'red',m:2}}>{errors.motherEduc}</FormHelperText>}
            </FormControl>
            </div>
             </div>
            </div>
            <h3>Father Information</h3>
            <div className="frmfamcard">
              <div>
            <TextField
             label='First Name' 
             value={userData['fatherName']} 
             onChange={(e) =>setUserData({...userData,"fatherName" : e.target.value})} 
             margin='normal' 
             variant='outlined'
             size='small'
             error={!!errors.fatherName}
            helperText={errors.fatherName}
             color='secondary'/>
            <TextField
             label='Last Name' 
             value={userData['fatherlName']} 
             onChange={(e) =>setUserData({...userData,"fatherlName" : e.target.value})} 
             margin='normal' 
             variant='outlined'
             size='small'
             error={!!errors.fatherlName}
            helperText={errors.fatherlName}
             color='secondary'/>
            <TextField
             label='Middle Name' 
             value={userData['fathermName']} 
             onChange={(e) =>setUserData({...userData,"fathermName" : e.target.value})} 
             margin='normal' 
             variant='outlined'
             size='small'
             error={!!errors.fathermName}
            helperText={errors.fathermName}
             color='secondary'/>
             </div>
             <div>
            <TextField
             label='Occupation' 
             value={userData['fatherOccu']} 
             onChange={(e) =>setUserData({...userData,"fatherOccu" : e.target.value})} 
             margin='normal' 
             variant='outlined'
             size='small'
             error={!!errors.fatherOccu}
            helperText={errors.fatherOccu}
             color='secondary'/>
             <div className="selecthea">
             <FormControl className='selectfamed' sx={{ minWidth: 150}} size="small">
            <InputLabel id="demo-simple-select-required-label">Highest Educational Attainment</InputLabel>
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
                    maxHeight: 250, // Adjust the maximum height of the menu
                  },
                },
              }}
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={userData['fatherEduc']}
                label="Highest Educational Attainment"
                error={!!errors.fatherEduc}
                helperText={errors.fatherEduc}
                onChange={(e) =>setUserData({...userData,"fatherEduc" : e.target.value})}
              >
                <MenuItem value={'No Grade Completed'}>No Grade Completed</MenuItem>
                <MenuItem value={'Elementary Undergraduate'}>Elementary Undergraduate</MenuItem>
                <MenuItem value={'Elementary Graduate'}>Elementary Graduate</MenuItem>
                <MenuItem value={'High School Undergraduate'}>High School Undergraduate</MenuItem>
                <MenuItem value={'High School Graduate'}>High School Graduate</MenuItem>
                <MenuItem value={'Post Secondary Undergraduate'}>Post Secondary Undergraduate</MenuItem>
                <MenuItem value={'Post Secondary Graduate'}>Post Secondary Graduate</MenuItem>
                <MenuItem value={'College Undergraduate'}>College Undergraduate</MenuItem>
                <MenuItem value={'College Graduate'}>College Graduate</MenuItem>
                <MenuItem value={'Post Baccalaureate'}>Post Baccalaureate</MenuItem>
              </Select>
              {errors && <FormHelperText sx={{color: 'red',m:2}}>{errors.fatherEduc}</FormHelperText>}
            </FormControl>
             </div>
             </div>
            </div>
            <div className='numsiblengthin'>
            <FormControl sx={{ minWidth: 350 }} size="small">
            <InputLabel id="demo-simple-select-required-label">Numbers of Family Members</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-large"
                value={userData['famNum']}
                label="House Ownership"
                error={!!errors.famNum}
                helperText={errors.famNum}
                onChange={(e) =>setUserData({...userData,"famNum" : e.target.value})}
              >
                <MenuItem value={'11 Members Above'}>11 Members Above</MenuItem>
                <MenuItem value={'7 - 10 Members'}>7 - 10 Members</MenuItem>
                <MenuItem value={'4 - 6 Members'}>4 - 6 Members</MenuItem>
                <MenuItem value={'1 - 3 Members'}>1 - 3 Members</MenuItem>
              </Select>
              {errors && <FormHelperText sx={{color: 'red',m:2}}>{errors.famNum}</FormHelperText>}
            </FormControl>
            </div>
            </div>

            </div>
            <div className='guradianfrm'>
            <div className="ribbon-header">
              <div className="ribbon-header-text"><h2>Guardian Information</h2></div>
            </div>
            <div className="famgnum">
            <div className="frmfamgcard">
            <div>
            <TextField
             label='Guardian Name' 
             value={userData['guardianName']} 
             onChange={(e) =>setUserData({...userData,"guardianName" : e.target.value})} 
             margin='normal' 
             variant='outlined'
             size='small'
             error={!!errors.guardianName}
            helperText={errors.guardianName}
             color='secondary'/>
             </div>
             <div>
            <TextField
             label='Contact Number' 
             value={userData['guardianContact']} 
             onChange={(e) =>setUserData({...userData,"guardianContact" : e.target.value})} 
             margin='normal' 
             variant='outlined'
             size='small'
             error={!!errors.guardianContact}
            helperText={errors.guardianContact}
             color='secondary'/>
             </div>
             <div>
            <TextField
             label='Relationship' 
             value={userData['relationship']} 
             onChange={(e) =>setUserData({...userData,"relationship" : e.target.value})} 
             margin='normal' 
             variant='outlined'
             size='small'
             error={!!errors.relationship}
            helperText={errors.relationship}
             color='secondary'/>
             </div> 
            </div>
            </div>
            </div>
            <div className='frmbtnfm'>
            <Button className='myButton' variant="contained" onClick={() => setStep(3)}>Previous</Button>
            <Button className='myButton1' variant="contained" onClick={Check}>Next</Button>
            </div>
            </div>

        </div>
    </div>
  )
}

export default Family