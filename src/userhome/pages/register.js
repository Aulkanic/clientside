import React, { useEffect, useState } from 'react'
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
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import SaveIcon from '@mui/icons-material/Save';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import { CreatingRegistry, RegistryOtp,ResendOtp, ValidateOtp } from '../../Api/request';
import LoopingRhombusesSpinner from '../loadingDesign/loading';

const Register = () => {
    const navigate = useNavigate();
    const [fname, setfname] = useState('');
    const [lname, setlname] = useState('');
    const [mname, setmname] = useState('');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState(1); 
    const [password, setPassword] = useState('');
    const [loading,setLoading] = useState(false)
    const [errors, setErrors] = useState({});
    const [remainingSeconds, setRemainingSeconds] = useState(60);
    const [display,setDisplay] = useState(false);
    const [disabled,setDisabled] = useState(false);
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
    const handleRegisterClick = async (event) => {
      event.preventDefault();
      const errors = {};

      if (!email) {
        errors.email = "Email is required";
      } else if (!/^[A-Za-z0-9._%+-]+@gmail\.com$/.test(email)) {
         errors.email = "Email is invalid";
      }
      if (Object.keys(errors).length > 0) {
        setErrors(errors);
        console.log(errors)
        return;
      }
    const formData = new FormData();
    formData.append('email', email);
    setLoading(true)
     await RegistryOtp.REGISTRY_OTP(formData)
     .then(res => {
      console.log(res)
      if(res.data.success === 0){
        swal(res.data.message);
        setStep(1);
        setLoading(false)
      
      }else{
        console.log('okay')
        setRemainingSeconds(60);
        setStep(2);
        setErrors('')
        setLoading(false)
      }
  
    }
     )
    .catch(err => console.log(err));

    };

    useEffect(() => {
      if (remainingSeconds > 0) {
        const timer = setInterval(() => {
          setRemainingSeconds(prevSeconds => prevSeconds - 1);
        }, 1000);
        
        return () => clearInterval(timer);
      }
    }, [remainingSeconds]);
    const handleVerifyClick = () => {

      if(otp === ''){
        errors.otp = 'This field is required'
      }
      if (Object.keys(errors).length > 0) {
        setErrors(errors);
        console.log(errors)
        return;
      }
      setLoading(true)
      const formData = new FormData();
      formData.append('email', email);
      formData.append('otp', otp);
      ValidateOtp.VALIDATE_OTP(formData)
      .then(res => {
        console.log(res)
        if(res.data.success === 0){
          swal(res.data.message);
          setStep(2);
          setLoading(false)
        
        }else{
          setLoading(false)
          setStep(3);
        }
    
      }
       )
      .catch(err => console.log(err));
    };
    const handleSubmitReg = (event) =>{
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
    };
    const handleResendClick = (event) =>{
      event.preventDefault();
      const errors = {};
      if(remainingSeconds > 0){
        setDisabled(true)
        errors.otp = `${remainingSeconds} seconds before requesting another OTP.`
      }
      if (Object.keys(errors).length > 0) {
        setErrors(errors);
        console.log(errors)
        return;
      }
      setLoading(true)
      const formData = new FormData();
      formData.append('email', email);
      ResendOtp.RESEND_OTP(formData)
      .then(res => {
        console.log(res)
        if(res.data.success === 0){
          swal(res.data.message);
          setLoading(false)
          setErrors('')
          setStep(2);
        
        }else{
          swal('An OTP has been sent to your email.')
          setRemainingSeconds(60)
          setLoading(false)
          setErrors('')
          setStep(2);
        }
    
      }
       )
      .catch(err => console.log(err));
    }
const handlerFnameInput = (e) => setfname(e.target.value)
const handlerLnameInput = (e) => setlname(e.target.value)
const handlerMnameInput = (e) => setmname(e.target.value)
const handlerOtpInput = (e) => setOtp(e.target.value)
const handlerEmailInput = (e) => setEmail(e.target.value)
const handlerPasswordInput = (e) => setPassword(e.target.value)
const handlerBackInput = (e) => {
  setStep(1)
}
const handlerNextInput = (e) => {
  e.preventDefault();
  const errors ={};
  if (!email) {
    errors.email = "Email is required";
  } else if (!/^[A-Za-z0-9._%+-]+@gmail\.com$/.test(email)) {
     errors.email = "Email is invalid";
  }
  if (Object.keys(errors).length > 0) {
    setErrors(errors);
    console.log(errors)
    return;
  }
  setStep(2)
}

  return (
    <>
    <Lheader/>
  <div className="registration">
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
              <div className="regfrmcontainer">
              {step === 1 && (
        <div className='emailotpreg'>
          <h2>Registration</h2>
          <TextField      
        id="input-with-icon-textfield"
        label="Email"
        fullWidth
        value={email}
        onChange={handlerEmailInput}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
        variant="outlined"
        style={{
          margin: '10px', 
          marginBottom: '0px',
          cursor: 'pointer', 
        }}
      />
     {errors && <FormHelperText sx={{color: 'red',m:2}}>{errors.email}</FormHelperText>}
          <br />
          <LoadingButton
        loading={loading}
        loadingPosition="start"
        endIcon={<SendIcon />}
        variant="outlined"
        style={{
          margin: '10px', 
          cursor: 'pointer', 
        }}
        onClick={handleRegisterClick}
      >
        Register
      </LoadingButton>
      <Button variant="outlined" 
              style={{
                margin: '10px', 
                cursor: 'pointer', 
              }}
              onClick={handlerNextInput}>Next</Button>
        </div>
      )}

      {step === 2 && (
        <div className='emailotpreg'>
          <h2>OTP Verification</h2>
          <p>An OTP has been sent to your email. Please enter it below:</p>
          <label>
            OTP:
            <input
            maxLength={6}
                  style={{
                    width: '100%',
                    height: '40px',
                    fontSize: '18px',
                    textAlign: 'center',
                    letterSpacing: '15px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    outline: 'none',
                  }} type="text" value={otp} onChange={handlerOtpInput} />
                  {errors.otp ? (<p>{errors.otp}</p>) : (null)}
          </label>
          <br />
          <div className='bacreotp'>
            <div>
            <Button variant="outlined" onClick={handlerBackInput}>Back</Button>
            </div>     
            <div>
            <LoadingButton
        loading={loading}
        loadingPosition="start"
        variant="outlined"
        style={{
          margin: '10px', 
          cursor: 'pointer', 
        }}
        onClick={handleResendClick}
      >
        Resend
      </LoadingButton>
            </div>

      </div>
      <LoadingButton
        loading={loading}
        loadingPosition="start"
        variant="outlined"
        style={{
          margin: '10px', 
          cursor: 'pointer', 
        }}
        onClick={handleVerifyClick}
      >
        VERIFY
      </LoadingButton>
          
        </div>
      )}

      {step === 3 && (
        <div className='emailotpreg'>
        <TextField      
        id="input-with-icon-textfield"
        label="First Name"
        fullWidth
        value={fname}
        onChange={handlerFnameInput}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
        variant="outlined"
        style={{
          margin: '10px', 
          cursor: 'pointer', 
        }}
      />
        <TextField      
        id="input-with-icon-textfield"
        label="Last Name"
        fullWidth
        value={lname}
        onChange={handlerLnameInput}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
        variant="outlined"
        style={{
          margin: '10px', 
          cursor: 'pointer', 
        }}
      />
        <TextField      
        id="input-with-icon-textfield"
        label="Middle Name"
        fullWidth
        value={mname}
        onChange={handlerMnameInput}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
        variant="outlined"
        style={{
          margin: '10px', 
          cursor: 'pointer', 
        }}
      />
          <br />
          <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            value={password}
            onChange={handlerPasswordInput}
          />
        </FormControl>
        <LoadingButton
        loading={loading}
        fullWidth
        loadingPosition="start"
        endIcon={<SendIcon />}
        variant="outlined"
        style={{
          margin: '10px', 
          cursor: 'pointer', 
        }}
        onClick={handleSubmitReg}
      >
        Submit
      </LoadingButton>
        </div>
      )}
              </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register

// reactjs stepper form with validation?