import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import { useContext } from 'react';
import { multiStepContext } from './StepContext';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Card, FormHelperText } from '@mui/material';
import { ScholarCategory} from '../../Api/request.js'
import { Checkbox } from '@mui/material';
import { FetchingUser,Rulelist,UserProflist } from '../../Api/request.js';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from "axios";
import '../css/Firststep.css'
import '../css/buttonStyle.css'
import swal from 'sweetalert';
function Firststep() {
  const { setStep, userData, setUserData} = useContext(multiStepContext);
  const [errors, setErrors] = useState({}); 
  const [usersAcc, setUserAcc] = useState([]);
  const [scholarprog, setScholarProg] = useState([]);
  const [checkedValues, setCheckedValues] = useState([]);
  const [checkedValues1, setCheckedValues1] = useState([]);
  const [checkedValues2, setCheckedValues2] = useState([]);
  const [checkedValues3, setCheckedValues3] = useState([]);
  const [checkedValues4, setCheckedValues4] = useState([]);
  const [rule,setRule] = useState([])
  const [userlist,setUserlist] = useState([])
 
  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    if (event.target.checked) {
      setCheckedValues([...checkedValues, value]); 
      setUserData((prevUserData) => ({
        ...prevUserData,
        Asinfo: [...prevUserData.Asinfo, value],
      }));
    } else {
      setCheckedValues(checkedValues.filter((val) => val !== value));
    }
  };
  const handleCheckboxChange1 = (event) => {
    const value = event.target.value;
    if (event.target.checked) {
      setCheckedValues1([...checkedValues1, value]); 
      setUserData((prevUserData) => ({
        ...prevUserData,
        Esinfo: [...prevUserData.Esinfo, value],
      }));
    } else {
      setCheckedValues1(checkedValues1.filter((val) => val !== value));
    }
  };
  const handleCheckboxChange2 = (event) => {
    const value = event.target.value;
    if (event.target.checked) {
      setCheckedValues2([...checkedValues2, value]); 
      setUserData((prevUserData) => ({
        ...prevUserData,
        Es1info: [...prevUserData.Es1info, value],
      }));
    } else {
      setCheckedValues2(checkedValues2.filter((val) => val !== value));
    }
  };
  const handleCheckboxChange3 = (event) => {
    const value = event.target.value;
    if (event.target.checked) {
      setCheckedValues3([...checkedValues3, value]); 
      setUserData((prevUserData) => ({
        ...prevUserData,
        AAsinfo: [...prevUserData.AAsinfo, value],
      }));
    } else {
      setCheckedValues3(checkedValues3.filter((val) => val !== value));
    }
  };
  const handleCheckboxChange4 = (event) => {
    const value = event.target.value;
    if (event.target.checked) {
      setCheckedValues4([...checkedValues4, value]); 
      setUserData((prevUserData) => ({
        ...prevUserData,
        YLsinfo: [...prevUserData.YLsinfo, value],
      }));
    } else {
      setCheckedValues4(checkedValues4.filter((val) => val !== value));
    }
  };
  const Asoptions = [
    { value: 'With Honors', label: 'With Honors' },
    { value: 'With Higher Honors', label: 'With Higher Honors' },
    { value: 'With Highest Honors', label: 'With Highest Honors' },
  ];
  const Esoptions = [
    { value: 'Child of solo Parent', label: 'Child of solo Parent' },
    { value: 'Out of School Children', label: 'Out of School Children' },
    { value: 'Person with Disability', label: 'Person with Disability' },
    { value: 'Special Child', label: 'Special Child' },
    { value: 'Working Students', label: 'Working Students' },
    { value: 'Victims of Abuse', label: 'Victims of Abuse' },
    { value: 'Others', label: 'Others' },
  ];
  const Esoptions1 = [
    { value: 'Member of 4p\'s', label: 'Member of 4p\'s' },
    { value: 'OFW', label: 'OFW' },
    { value: 'Domestic Worker', label: 'Domestic Worker' },
    { value: 'Senior Citizen', label: 'Senior Citizen' },
    { value: 'Has a sever Medical Condition', label: 'Has a sever Medical Condition' },
    { value: 'Person with Disability', label: 'Person with Disability' },
    { value: 'Others', label: 'Others' }
  ];
  const AAoptions = [
    { value: 'International Awardee', label: 'International Awardee' },
    { value: 'National Awardee', label: 'National Awardee' },
    { value: 'Provincial Awardee', label: 'Provincial Awardee' },
    { value: 'Municipal Awardee', label: 'Municipal Awardee' },
    { value: 'Barangay Awardee', label: 'Barangay Awardee' }
  ];
  const YLoptions = [
    { value: 'International Awardee', label: 'International Awardee' },
    { value: 'National Awardee', label: 'National Awardee' },
    { value: 'Provincial Awardee', label: 'Provincial Awardee' },
    { value: 'Municipal Awardee', label: 'Municipal Awardee' },
    { value: 'Barangay Awardee', label: 'Barangay Awardee' }
  ];
  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await FetchingUser.FETCH_USER();
        const scholist = await ScholarCategory.ScholarshipProgram();
        const resdata = response.data.UserAccount;
        const schodata = scholist.data.SchoCat;
        const rul = await Rulelist.FETCH_RULE()
        const user = await UserProflist.FETCH_USER()
        setUserlist(user.data.UserAccounts)
        setRule(rul.data.result[0])
        setUserAcc(resdata);
        setScholarProg(schodata);
      } catch (error) {
        console.error(error);
      }
    }
    
    fetchData();

  }, []);

  function Check(){
    const errors = {};
    if (userData.scholarID === '') {
      errors.scholarID = "This Field is required";
    } 
    if (userData.checkemail === '') {
      errors.checkemail = "This Field is required";
    } 
    else if(!usersAcc.some((item) => item.email === userData.checkemail)){
      errors.checkemail = "This email is not registered";
    }
    const appem = userlist.filter(
      (data) =>
          data.email === userData.checkemail
      )
    const scho = userlist.filter(
      (item) =>
        item.email === userData.checkemail &&
        item.ScholarshipApplied === userData.scholarID &&
        item.status !== 'Revoke' &&
        item.status !== 'Failed'
    );
    if(appem.length !== rule.schoNum){
      if(scho.length === rule.schoNum){
        swal({
          title: "Success",
          text: `${userData.checkemail}, You have already applied for this scholarship  Program`,
          icon: "warning",
          button: "OK",
        });
        setErrors('')
        setStep(1)
        return
      }

    }else{
      swal({
        title: "Success",
        text: `Only ${rule.schoNum} Scholarship Grant per Applicants/Scholars`,
        icon: "warning",
        button: "OK",
      });
      setErrors('')
      setStep(1)
      return
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    setErrors('')
    setStep(2)
};

  return (
  <div className='FirstepFrm'>
      <div className="FFd">
          <div className="form">
          <div className='FFcon'>
          <div className="FFcard">
        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
          <div>
        <TextField
             label='Created Account Email' 
             value={userData['checkemail']} 
             onChange={(e) =>setUserData({...userData,"checkemail" : e.target.value})} 
             margin='normal' 
             variant='outlined'
             size='large'
             error={!!errors.checkemail}
            helperText={errors.checkemail}
             color='secondary'/></div>
             <div>
          <FormControl sx={{minWidth: 120 }}>
            <InputLabel sx={{color:'green'}} id="demo-simple-select-label">Choose Scholarship Category</InputLabel>
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
                      width: 850,
                      maxHeight: 250,// Adjust the maximum height of the menu
                    },
                  },
                }}
              autoWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label='Choose Scholarship Category'
              error={!!errors.scholarID}
              value={userData['scholarID']} 
              onChange={(e) =>setUserData({...userData,"scholarID" : e.target.value})}
            >
              {scholarprog?.map((item) => (
                  <MenuItem key={item.schoProgId} value={item.name} disabled={item.status === 'closed'}>
                    {item.name}
                  </MenuItem>
                ))}
            </Select>
            {errors && <FormHelperText sx={{color: 'red'}}>{errors.scholarID}</FormHelperText>}
         </FormControl></div>
         </div>             
          </div>
          </div>
          <div className="checkboxcontainer">
          {userData.scholarID === 'Academic Scholarship' && 
          <>
          <Card className='pcard' elevation={0}>
          <p>{userData.scholarID}(Elementary & Highschool)</p>
          </Card>
          <div className='checkbox'>
          <div className='gridcheckbox'>
          {Asoptions.map((option) => (   
            <FormControlLabel
              key={option.value}
              control={
                <Checkbox
                  checked={checkedValues.includes(option.value)}
                  onChange={handleCheckboxChange}
                  value={option.value}
                />
          
              }
              label={option.label}
            />
              ))}
            </div>
         </div></>}
         {userData.scholarID === 'Economic Scholarship' && 
         <>
          <Card className='pcard' elevation={0}>
          <p>{userData.scholarID}</p>
          </Card>

         <div className='checkbox'>
         <Card className='pqcard' elevation={0}>
          <p>Do you belong to any of the following?</p>
          </Card>
          <div className='gridcheckbox'>
          {Esoptions.map((option) => (
            <>
           
        <FormControlLabel
          key={option.value}
          control={
            <Checkbox
              checked={checkedValues1.includes(option.value)}
              onChange={handleCheckboxChange1}
              value={option.value}
            />
          }
          label={option.label}
        />
        </>
            ))}
            </div>
          <Card className='pqcard' elevation={0}>
          <p>Do your Parents belong to any of the following?</p>
          </Card>
          <div className='gridcheckbox'>
          {Esoptions1.map((option) => (
            <>
           
              <FormControlLabel
                key={option.value}
                control={
                  <Checkbox
                    checked={checkedValues2.includes(option.value)}
                    onChange={handleCheckboxChange2}
                    value={option.value}
                  />
                }
                label={option.label}
              />
              </>
             ))}
              </div>
          </div>
          </>}
         {userData.scholarID === 'Athletic and Arts Scholarship' && 
         <>
          <Card className='pcard' elevation={0}>
          <p>{userData.scholarID}</p>
          </Card>
         <div className='checkbox'>
         <Card className='pqcard' elevation={0}>
         <p>Accepted Award/Details:</p>
          </Card>
          <div className="gridcheckbox">
          {AAoptions.map((option) => (
            <>
          <FormControlLabel
            key={option.value}
            control={
              <Checkbox
                checked={checkedValues3.includes(option.value)}
                onChange={handleCheckboxChange3}
                value={option.value}
              />
            }
            label={option.label}
              />
              </>
            ))}
            </div>
         </div></>}
         {userData.scholarID === 'Youth Leadership Scholarship' && 
         <>
          <Card className='pcard' elevation={0}>
          <p>{userData.scholarID}</p>
          </Card>
         <div className='checkbox'>
         <Card className='pqcard' elevation={0}>
         <p>Accepted Award/Details:</p>
          </Card>
          <div className="gridcheckbox">
          {YLoptions.map((option) => (
            <>
        <FormControlLabel
          key={option.value}
          control={
            <Checkbox
              checked={checkedValues4.includes(option.value)}
              onChange={handleCheckboxChange4}
              value={option.value}
            />
          }
          label={option.label}
        />
        </>
      ))}
      </div>
         </div></>}
         </div>
          <div className='frmbtnec'>
          <Button className='myButton' variant="contained" onClick={Check}>Next</Button>
          </div>
          </div>
      </div>
  </div>
)
}


export default Firststep