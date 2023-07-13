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
import '../css/economic.css'
import '../css/buttonStyle.css'


function Economic() {
    const { setStep, userData, setUserData} = useContext(multiStepContext);
    const [errors, setErrors] = useState({}); 

    function Check(){
      console.log(userData);
      const errors = {};
      if (userData.wereLive === '') {
        errors.wereLive = "This Field is required";
      } 
      if (userData.howLong === '') {
        errors.howLong = "This Field is required";
      }
      if (userData.ownerShip === '') {
        errors.ownerShip = "This Field is required";
      }
      if (userData.monthIncome === '') {
        errors.monthIncome = "This Field is required";
      }
      if (userData.baranggay === '') {
        errors.baranggay = "This Field is required";
      }
      console.log(Object.keys(errors).length)
      if (Object.keys(errors).length > 0) {
        setErrors(errors);
        console.log(errors)
        return;
      }
      setErrors('')
      setStep(4)
  };
    return (
    <div className='Econ'>
        <div className="Econd">
            <div className="form">
            <div className="ribbon-header">
              <div className="ribbon-header-text"><h2>Economic Information</h2></div>
            </div>
            <div className='econcon'>
            <div className="frmeconcard">
              <div>
            <FormControl sx={{ minWidth: 150 }} size="small">
            <InputLabel id="demo-simple-select-required-label">Where Do you Live</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={userData['wereLive']}
                label="Where Do you Live"
                error={!!errors.wereLive}
                helperText={errors.wereLive}
                onChange={(e) =>setUserData({...userData,"wereLive" : e.target.value})}
              >
                <MenuItem value={'Subdivision'}>Subdivision</MenuItem>
                <MenuItem value={'Sitio/Purok'}>Sitio/Purok</MenuItem>
                <MenuItem value={'Depressed Area'}>Depressed Area</MenuItem>
              </Select>
              {errors && <FormHelperText sx={{color: 'red',m:2}}>{errors.wereLive}</FormHelperText>}
            </FormControl>
            </div>
            <FormControl sx={{ minWidth: 150 }} size="small">
            <InputLabel id="demo-simple-select-required-label">Living in Marilao</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-large"
                value={userData['howLong']}
                label="Living in Marilao"
                error={!!errors.howLong}
                helperText={errors.howLong}
                onChange={(e) =>setUserData({...userData,"howLong" : e.target.value})}
              >
                <MenuItem value={'6 months'}>6 months</MenuItem>
                <MenuItem value={'1-2 years'}>1-2 years</MenuItem>
                <MenuItem value={'3-4 years'}>3-4 years</MenuItem>
                <MenuItem value={'More than 5 years'}>More than 5 years</MenuItem>
              </Select>
              {errors && <FormHelperText sx={{color: 'red',m:2}}>{errors.howLong}</FormHelperText>}
            </FormControl>
    
            <FormControl sx={{ minWidth: 150 }} size="small">
            <InputLabel id="demo-simple-select-required-label">House Ownership</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-large"
                value={userData['ownerShip']}
                label="House Ownership"
                error={!!errors.ownerShip}
                helperText={errors.ownerShip}
                onChange={(e) =>setUserData({...userData,"ownerShip" : e.target.value})}
              >
                <MenuItem value={'Staying as a guest/Boarding'}>Staying as a guest/Boarding</MenuItem>
                <MenuItem value={'Renting a House'}>Renting a House</MenuItem>
                <MenuItem value={'Owned'}>Owned</MenuItem>
                <MenuItem value={'Others'}>Others</MenuItem>
              </Select>
              {errors && <FormHelperText sx={{color: 'red',m:2}}>{errors.ownerShip}</FormHelperText>}
            </FormControl>
            <FormControl sx={{ minWidth: 150 }} size="small">
            <InputLabel id="demo-simple-select-required-label">Parent(s)/Guardian Annual Gross Income</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-large"
                value={userData['monthIncome']}
                label="Parent(s)/Guardian Annual Gross Income"
                error={!!errors.monthIncome}
                helperText={errors.monthIncome}
                onChange={(e) =>setUserData({...userData,"monthIncome" : e.target.value})}
              >
                <MenuItem value={'₱1,000 - 4,000'}>₱1,000 - 4,000</MenuItem>
                <MenuItem value={'₱5,000 - 8,000'}>₱5,000 - 8,000</MenuItem>
                <MenuItem value={'₱9,000 - 12,000'}>₱9,000 - 12,000</MenuItem>
                <MenuItem value={'₱13,000 - 18,000'}>₱13,000 - 18,000</MenuItem>
                <MenuItem value={'₱19,000 above'}>₱19,000 above</MenuItem>
              </Select>
              {errors && <FormHelperText sx={{color: 'red',m:2}}>{errors.monthIncome}</FormHelperText>}
            </FormControl>
            <FormControl sx={{ minWidth: 150 }} size="small">
            <InputLabel id="demo-simple-select-required-label">Baranggay</InputLabel>
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
                id="demo-select-large"
                value={userData['baranggay']}
                label="Baranggay"
                error={!!errors.baranggay}
                helperText={errors.baranggay}
                onChange={(e) =>setUserData({...userData,"baranggay" : e.target.value})}
              >
                <MenuItem value={'Abangan Norte'}>Abangan Norte</MenuItem>
                <MenuItem value={'Abangan Sur'}>Abangan Sur</MenuItem>
                <MenuItem value={'Ibayo'}>Ibayo</MenuItem>
                <MenuItem value={'Lambakin'}>Lambakin</MenuItem>
                <MenuItem value={'Lias'}>Lias</MenuItem>
                <MenuItem value={'Loma de Gato'}>Loma de Gato</MenuItem>
                <MenuItem value={'Nagbalon'}>Nagbalon</MenuItem>
                <MenuItem value={'Patubig'}>Patubig</MenuItem>
                <MenuItem value={'Poblacion I'}>Poblacion I</MenuItem>
                <MenuItem value={'Poblacion II'}>Poblacion II</MenuItem>
                <MenuItem value={'Prenza I'}>Prenza I</MenuItem>
                <MenuItem value={'Prenza II'}>Prenza II</MenuItem>
                <MenuItem value={'Saog'}>Saog</MenuItem>
                <MenuItem value={'Sta. Rosa I'}>Sta. Rosa I</MenuItem>
                <MenuItem value={'Sta. Rosa II'}>Sta. Rosa II</MenuItem>
                <MenuItem value={'Tabing-Ilog'}>Tabing-Ilog</MenuItem>
              </Select>
              {errors && <FormHelperText sx={{color: 'red',m:2}}>{errors.baranggay}</FormHelperText>}
            </FormControl>
            </div>
            </div>
            <div className='frmbtnec'>
            <Button className='myButton' variant="contained" onClick={() => setStep(2)}>Previous</Button>
            <Button className='myButton1' variant="contained" onClick={Check}>Next</Button>
            </div>
            </div>
           
        </div>
    </div>
  )
}

export default Economic