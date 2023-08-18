import React, { useEffect, useState, useRef } from 'react'
import {  useNavigate } from 'react-router-dom'
import './register.css'
import TextField from '@mui/material/TextField';
import { Button, Link } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import LoadingButton from '@mui/lab/LoadingButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import SendIcon from '@mui/icons-material/Send';
import { CreatingRegistry, RegistryOtp,ResendOtp, ValidateOtp,FindRegisteredUser } from '../../Api/request';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import { styled } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import { useContext } from "react";
import { color } from "../../App";
import { useDispatch } from 'react-redux';
import { setName } from '../../Redux/userSlice';
import Swal from 'sweetalert2';

const CssTextField = styled(TextField)({
  backgroundColor: 'white',
  width: '400px',
  '& label.Mui-focused': {
    color: 'black',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#B2BAC2',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#E0E3E7',
    },
    '&:hover fieldset': {
      borderColor: '#B2BAC2',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#6F7E8C',
    },
  },
});
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { colorlist,imgList } = useContext(color);
    const [fname, setfname] = useState('');
    const [lname, setlname] = useState('');
    const [mname, setmname] = useState('');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState(new Array(6).fill(''));
    const inputRefs = useRef([]);
    const [step, setStep] = useState(1); 
    const [password, setPassword] = useState('');
    const [loading,setLoading] = useState(false);
    const [loading1,setLoading1] = useState(false);
    const [errors, setErrors] = useState({});
    const [remainingSeconds, setRemainingSeconds] = useState(60);
    const [disabled,setDisabled] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [resstat,setResstat] = useState('');
    const [open, setOpen] = React.useState(true);
  
    const handleClose = () => {
      setOpen(false);
    };
    const handleChange = (event, index) => {
      const value = event.target.value;
      if (value.length <= 1) {
        const newOTP = [...otp];
        newOTP[index] = value;
        setOtp(newOTP);
  
        if (value !== '' && index < 6 - 1) {
          inputRefs.current[index + 1].focus();
        }
      }
    };
  
    const handleKeyPress = (event, index) => {
      if (event.key === 'Backspace' && index > 0 && otp[index] === '') {
        const newOTP = [...otp];
        newOTP[index - 1] = '';
        setOtp(newOTP);
        inputRefs.current[index - 1].focus();
      }
    };

    const handleSnackbarClose = () => {
      setSnackbarOpen(false);
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
      if(res.data.success === 0){
        setResstat('500')
        setSnackbarMessage(res.data.message);
        setSnackbarOpen(true); 
        setStep(1);
        setLoading(false)
      
      }else{
        setResstat('200')
        setSnackbarMessage('OTP was sent to your Email');
        setSnackbarOpen(true); 
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
    const handleVerifyClick = (e) => {
      e.preventDefault()
      const errors = {}; 
      const checkotp = otp.join('')
      if(!checkotp || checkotp === ''){
        errors.otp = 'Please input OTP'
      }
      if (Object.keys(errors).length > 0) {
        setErrors(errors);
        console.log(errors)
        return;
      }
      setLoading(true)
      const formData = new FormData();
      formData.append('email', email);
      formData.append('otp', checkotp);
      ValidateOtp.VALIDATE_OTP(formData)
      .then(res => {
        console.log(res)
        if(res.data.success === 0){
          setResstat('500')
          setSnackbarMessage(res.data.message);
          setSnackbarOpen(true); 
          setRemainingSeconds(60);
          setStep(2);
          setLoading(false)
        
        }else{
          setResstat('200')
          setSnackbarMessage(res.data.message);
          setSnackbarOpen(true); 
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
      errors.fname = "First Name must be in title case format";
    }
    if (!lname) {
      errors.lname = "Last Name is required";
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
      errors.mname = "Middle Name is required";
    } else if (mname.length === 1) {
      errors.mname = "Input must not contain a single letter.";
    } else if (/[0-9]/.test(mname)) {
      errors.mname = "Input must not contain numeric value";
    } else if (/[!@#$%^&*(),.?":{}|<>]/.test(mname)) {
      errors.mname = "Special characters are not allowed.";
    } else if (!/^[A-Z][A-Za-z,\s]*$/.test(mname)) {
      errors.mname = "Middle Name must be in title case format";
    }
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    } else if (!/^[a-zA-Z0-9]*$/.test(password)) {
      errors.password = "Password can only contain alphanumeric characters";
    }
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      console.log(errors)
      return;
    }
    setLoading(true)
    CreatingRegistry.CREATE_REGISTRY({fname,lname,mname,email,password})
    .then(res => {
      if(res.data.message === 'Created'){
        const applicantNum = res.data.data.applicantNum
        setResstat('200')
        setSnackbarMessage('Account Created');
        setSnackbarOpen(true); 
        navigate('/ApplicationForm');
        dispatch(setName({fname,lname,mname,email,applicantNum}))
        setLoading(false)
      
      }else{
        setResstat('500')
        setSnackbarMessage(res.data.message);
        setSnackbarOpen(true); 
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
      setLoading1(true)
      const formData = new FormData();
      formData.append('email', email);
      ResendOtp.RESEND_OTP(formData)
      .then(res => {
        console.log(res)
        if(res.data.success === 0){
          setResstat('500')
          setSnackbarMessage(res.data.message);
          setSnackbarOpen(true); 
          setLoading1(false)
          setErrors('')
          setStep(2);
        
        }else{
          setResstat('200')
          setSnackbarMessage('OTP was sent to your Email');
          setSnackbarOpen(true); 
          setRemainingSeconds(60);
          setLoading1(false)
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
  setErrors('')
}

const findCreatedAcc = async() =>{
  const { value: email } = await Swal.fire({
    title: 'Input email address',
    input: 'email',
    inputLabel: 'Your email address',
    inputPlaceholder: 'Enter your email address'
  })
  
  if (email) {
    const formData = new FormData()
    formData.append('email',email)
     await FindRegisteredUser.FETCH_USERREG(formData)
     .then((res) =>{
      if(res.data.success === 1){
        const result = res.data.result;
        const fname = result.fname;
        const lname = result.lname;
        const mname = result.mname;
        const email = result.email;
        const applicantNum = result.applicantNum;
        dispatch(setName({fname,lname,mname,email,applicantNum}))
        navigate('/ApplicationForm')
      }else{
        Swal.fire(res.data.message)
      }
     })
  }
}

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle> Step#1: Creating Account</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">

            *Please Create your account first and use your valid email address.This 
            Account will serve as your Applicants to Scholar Account in which you can see your status
            of application and where you will submitted the documents.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        autoHideDuration={3000}
        TransitionComponent={Slide}
        TransitionProps={{ direction: 'right' }}
      >
{resstat === '200' ? (<MuiAlert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%',background:'green',color:'white' }}>
{snackbarMessage}!
</MuiAlert>) :(<MuiAlert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%',background:'red',color:'white' }}>
          {snackbarMessage}!
</MuiAlert>)}
      </Snackbar>
  <div className="registration">
        <div className="registrationcon">
          <div className="registrationfrm">
              <div className="regfrmcontainer">
              <img className="mydo" src="https://drive.google.com/uc?id=12yKj9K3Caiaq3hP1JRKRbaLpkIuvapkZ"
         alt=""/>
                {step === 1 && (
                  <div className='emailotpreg'>
                    <h2 style={{color:colorlist[0].bgColor}}>Registration</h2>
                    <p>Enter your Email address to create Account</p>
                    <p>We will send you one time password(OTP)</p>
                    <TextField      
                  id="input-with-icon-textfield"
                  label="Email"
                  value={email}
                  onChange={handlerEmailInput}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailRoundedIcon />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  style={{
                    cursor: 'pointer', 
                    width:'80%'
                  }}
                />
              {errors.email && <p variant='outlined' 
              style={{ 
                width: '92%', 
                color:'red', 
                fontSize:'12px',
                height:'max-Content',
              }}>
                    {errors.email}
                  </p>}

                    <br />
                  <div className="regbtnregnex">
                    <div>
                      <LoadingButton
                      loading={loading}
                      loadingPosition="end"
                      variant="elevated"
                      fullWidth
                      className='myButton1'
                      style={{
                        cursor: 'pointer', 
                        fontWeight: '700',
                        color: 'white',
                        fontSize:'12px',
                        textTransform:'capitalize',
                        fontFamily: 'Source Sans Pro, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', 
                      }}
                      onClick={handleRegisterClick}
                    >
                      Register
                    </LoadingButton>
                    </div>
                    <div>
                    <LoadingButton variant="elevated" 
                      className='myButton1'
                      fullWidth
                      style={{
                        marginTop: '10px', 
                        cursor: 'pointer', 
                        fontWeight: '700',
                        color: 'white',
                        fontSize:'12px',
                        textTransform:'capitalize',
                        fontFamily: 'Source Sans Pro, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', 
                      }}
                            onClick={handlerNextInput}>
                              Next</LoadingButton>
                    </div>
                  </div>
                  <Link onClick={findCreatedAcc}>
                  Already Registered an Account?
                  </Link>
                  </div>
                )}

                {step === 2 && (
                  <div className='otpfreg'>
                    <h2 style={{color:colorlist[0].bgColor}}>OTP Verification</h2>
                    <p>An OTP has been sent to your email. Please enter it below:</p>
                    <div className="otp-input-container">
                    {otp.map((digit, index) => (
                        <input
                          key={index}
                          className="otp-input"
                          type="text"
                          maxLength="1"
                          value={digit}
                          onChange={(e) => handleChange(e, index)}
                          onKeyDown={(e) => handleKeyPress(e, index)}
                          ref={(ref) => (inputRefs.current[index] = ref)}
                        />
                      ))}
                      </div>
                        {errors.otp && <p variant='outlined' 
                        style={{ 
                          width: '85%', 
                          margin: '10px', 
                          color:'red', 
                          fontSize:'12px',
                          height:'max-Content'}}>
                              {errors.otp}
                            </p>}
                    <br />
                    <div className='bacreotp'>
   
                      <div>
                      <LoadingButton
                        loading={loading1}
                        loadingPosition="end"
                        variant="outlined"
                        fullWidth
                        className='myButton1'
                        style={{
                          cursor: 'pointer', 
                          fontWeight: '700',
                          color: 'white',
                          fontSize:'12px',
                          textTransform:'capitalize',
                          fontFamily: 'Source Sans Pro, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', 
                        }}
                        onClick={handleResendClick}
                      >
                        Resend
                      </LoadingButton>
                  </div>
                  <div>
                <LoadingButton
                  loading={loading}
                  loadingPosition="end"
                  variant="outlined"
                  fullWidth
                  className='myButton1'
                  style={{
                    margin:'10px 0px 10px 0px',
                    cursor: 'pointer', 
                    fontWeight: '700',
                    color: 'white',
                    fontSize:'12px',
                    textTransform:'capitalize',
                    fontFamily: 'Source Sans Pro, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', 
                  }}
                  onClick={handleVerifyClick}
                >
                  Verify
                </LoadingButton>
                </div>
                <div>
                      <LoadingButton 
                      fullWidth
                      className='myButton'
                      style={{
                        cursor: 'pointer', 
                        fontWeight: '700',
                        color: 'white',
                        fontSize:'12px',
                        textTransform:'capitalize',
                        fontFamily: 'Source Sans Pro, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', 
                      }}
                      variant="outlined" onClick={handlerBackInput}>Back</LoadingButton>
                      </div>  
                </div>

                  </div>
                )}

                {step === 3 && (
                  <div className='createacccon'>
                    <h2>Create Account</h2>
                  <CssTextField      
                  id="input-with-icon-textfield"
                  label="First Name"
                  value={fname}
                  size="small"
                  onChange={handlerFnameInput}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                />
                    {errors.fname && <p variant='outlined' 
              style={{ 
                width: '73%', 
                margin: '0px', 
                color:'red', 
                fontSize:'10px' }}>
                    {errors.fname}
                  </p>}
                  <CssTextField      
                  id="input-with-icon-textfield"
                  label="Last Name"
                  size="small"
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
                    marginTop:'10px',
                    cursor: 'pointer', 
                  }}
                />
                    {errors.lname && <p variant='outlined' 
              style={{ 
                width: '73%', 
                margin: '0px', 
                color:'red', 
                fontSize:'10px'}}>
                    {errors.lname}
                  </p>}
                  <CssTextField      
                  id="input-with-icon-textfield"
                  label="Middle Name"
                  size="small"
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
                    marginTop:'10px',
                    cursor: 'pointer', 
                  }}
                />
            {errors.mname && <p variant='outlined' 
              style={{ 
                width: '73%', 
                margin: '0px', 
                color:'red', 
                fontSize:'10px' }}>
                    {errors.mname}
                  </p>}
                  <CssTextField      
                  id="input-with-icon-textfield"
                  label="Password"
                  size="small"
                  value={password}
                  type='password'
                  onChange={handlerPasswordInput}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockRoundedIcon />
                      </InputAdornment>
                    )
                  }}
                  variant="outlined"
                  style={{ 
                    marginTop:'10px',
                    cursor: 'pointer', 
                  }}
                />
            {errors.password && <p variant='outlined' 
              style={{ 
                width: '73%', 
                margin: '0px', 
                color:'red', 
                fontSize:'10px', }}>
                    {errors.password}
                  </p>} 
                  <div>  
                  <LoadingButton
                  loading={loading}
                  loadingPosition="end"
                  endIcon={loading ? (null) : (<SendIcon />)}
                  variant="elevated"
                  fullWidth
                  className='myButton1'
                  style={{
                    cursor: 'pointer', 
                    fontWeight: '700',
                    color: 'white',
                    fontSize:'12px',
                    textTransform:'capitalize',
                    fontFamily: 'Source Sans Pro, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', 
                  }}
                  onClick={handleSubmitReg}
                >
                  Submit
                </LoadingButton>
                </div>  
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