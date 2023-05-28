import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { useContext } from 'react';
import { multiStepContext } from './StepContext';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { FormHelperText } from '@mui/material';
import { ScholarCategory} from '../../Api/request.js'
import axios from "axios";
import '../css/Firststep.css'
function Firststep() {
  const { setStep, userData, setUserData} = useContext(multiStepContext);
  const [errors, setErrors] = useState({}); 
  const [scholarprog, setScholarProg] = useState([]);

  React.useEffect(() => {
    ScholarCategory.ScholarshipProgram()
    .then((response) => {
        console.log(response)
      setScholarProg(response.data.SchoCat);
    });
  }, []);
  console.log(scholarprog)
  function Check(){
    console.log(userData);
    const errors = {};
    if (userData.scholarID === '') {
      errors.scholarID = "This Field is required";
    } 

    console.log(Object.keys(errors).length)
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      console.log(errors)
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
        <div>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
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
         </FormControl> 
         </div>             
          </div>
          </div>
          <div className='frmbtnec'>
          <Button variant="contained" onClick={Check}>Next</Button>
          </div>
          </div>
         
      </div>
  </div>
)
}


export default Firststep