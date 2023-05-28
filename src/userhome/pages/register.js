import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import Axios from 'axios'
import Municipal from '../assets/municipal.jpg'
import swal from 'sweetalert';
import BMCC from '../assets/marisko.png'
import Lheader from '../../LandingPage/components/header';
import './register.css'
import TextField from '@mui/material/TextField';
import { useContext } from 'react';
import Button from '@mui/material/Button';
import { CreatingRegistry } from '../../Api/request';
import LoopingRhombusesSpinner from '../loadingDesign/loading';

const Register = () => {
    const navigate = useNavigate();
    const [fname, setfname] = useState('');
    const [lname, setlname] = useState('');
    const [mname, setmname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading,setLoading] = useState(false)
    const [errors, setErrors] = useState({});

function handleSubmitReg(event){
    event.preventDefault();
    const errors = {};
    if (!fname) {
      errors.fname = "First Name is required";
    } else if (fname.length === 1) {
      errors.fname = "Input must not contain a single letter.";
    } else if (/[0-9]/.test(fname)) {
      errors.fname = "Input must not contain numeric value";
    } else if (/[!@#$%^&*(),.?":{}|<>]/.test(fname)) {
      errors.fname = "Special characters are not allowed.";
    } else if (!/^[A-Z][A-Za-z,\s]*$/.test(fname)) {
      errors.fname = "Last Name must be in title case format";
    }
    if (!lname) {
      errors.lname = "First Name is required";
    } else if (lname.length === 1) {
      errors.lname = "Input must not contain a single letter.";
    } else if (/[0-9]/.test(lname)) {
      errors.lname = "Input must not contain numeric value";
    } else if (/[!@#$%^&*(),.?":{}|<>]/.test(lname)) {
      errors.lname = "Special characters are not allowed.";
    } else if (!/^[A-Z][A-Za-z,\s]*$/.test(lname)) {
      errors.lname = "Last Name must be in title case format";
    }
    if (!mname) {
      errors.mname = "First Name is required";
    } else if (mname.length === 1) {
      errors.mname = "Input must not contain a single letter.";
    } else if (/[0-9]/.test(mname)) {
      errors.mname = "Input must not contain numeric value";
    } else if (/[!@#$%^&*(),.?":{}|<>]/.test(mname)) {
      errors.mname = "Special characters are not allowed.";
    } else if (!/^[A-Z][A-Za-z,\s]*$/.test(mname)) {
      errors.mname = "Last Name must be in title case format";
    }
    if (!email) {
      errors.email = "Email is required";
    } else if (!/^[A-Za-z0-9._%+-]+@gmail\.com$/.test(email)) {
       errors.email = "Email is invalid";
    }
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    } else if (!/^[a-zA-Z0-9]*$/.test(password)) {
      errors.password = "Password can only contain alphanumeric characters";
    }
    console.log(Object.keys(errors).length)
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      console.log(errors)
      return;
    }
    setLoading(true)
    CreatingRegistry.CREATE_REGISTRY({fname,lname,mname,email,password})
    .then(res => {
      console.log(res)
      if(res.data.message === 'Created'){
        swal(res.data.message);
        navigate('/ApplicationForm');
        localStorage.setItem('ApplicationNumber', res.data.data.applicantNum)
        setLoading(false)
      
      }else{
        swal(res.data.message);
        setLoading(false)
        navigate('/register')
      }

    }
     )
    .catch(err => console.log(err));
}
  return (
    <>
    <Lheader/>
      {!loading && <div className="registration">
        <div className="registrationcon">
          <div className="registrationimg">
            <div className="sloganreg">
            <div className='sloganreglogo'>
                <img src={BMCC} alt="" />
            </div>
              <div className="sloganregcontainer">
              <div>
              <h1>Batang Marilenyo Protektado</h1>
              </div>
              <div>
              <p>Be part of our Scholarship Program.</p>
              <span>What are you waiting for?Apply now!</span>
              </div>
            </div>
            </div>
          </div>
          <div className="registrationfrm">
            <h1>Create Your Account</h1>
              <form onSubmit={handleSubmitReg} action="">
              <div className="regfrmcontainer">
              <div>
              <TextField
              value={fname} 
              onChange={(e) =>setfname(e.target.value)}  
              error={!!errors.fname}
              helperText={errors.fname}
              size='small' 
              id="outlined-basic" 
              label="FirstName" 
              variant="outlined" />
              </div>
              <div>
              <TextField 
              value={lname} 
              onChange={(e) =>setlname(e.target.value)}  
              error={!!errors.lname}
              helperText={errors.lname}
              size='small' 
              id="outlined-basic" 
              label="LastName" 
              variant="outlined" />
              </div>
              <div>
              <TextField 
              value={mname} 
              onChange={(e) =>setmname(e.target.value)}  
              error={!!errors.mname}
              helperText={errors.mname}
              size='small' 
              id="outlined-basic" 
              label="MiddleName" 
              variant="outlined" />
              </div>
              <div>
              <TextField 
              value={email} 
              onChange={(e) =>setEmail(e.target.value)}  
              error={!!errors.email}
              helperText={errors.email}
              size='small' 
              id="outlined-basic" 
              label="Email" 
              variant="outlined" />
              </div>
              <div>
              <TextField 
              value={password} 
              onChange={(e) =>setPassword(e.target.value)}  
              error={!!errors.password}
              helperText={errors.password}
              size='small' 
              id="outlined-basic" 
              label="Password" 
              variant="outlined" />
              </div>
              </div>
              <Button type='submit' className='btnregsbmt' variant="contained">Submit</Button>
              </form>
          </div>
        </div>
      </div>}{loading && <><LoopingRhombusesSpinner/></>}
    </>
  )
}

export default Register

// reactjs stepper form with validation?