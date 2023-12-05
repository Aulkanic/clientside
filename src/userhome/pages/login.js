import React, { useState, useEffect, useRef } from 'react'
import './login.css'
import { useNavigate, Link } from 'react-router-dom'
import MYDO from '../assets/mydo.png'
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import LoadingButton from '@mui/lab/LoadingButton';
import { styled } from '@mui/material/styles';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import {loginUserAcc, GetUserAcc, GenerateOtp, ValidateUserOtp, ChangePassbyOtp} from '../../Api/request'
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import MuiAlert from '@mui/material/Alert';
import CustomButton from '../../Components/Button/button';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../../Redux/loginSlice';
import TextInput from '../../Components/InputField/text';
import PasswordInput from '../../Components/InputField/password';
import BMCC from '../../Images/logo.png';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [fpemail, setFPEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newpassword, setNewPassword] = useState('');
    const [renewpassword, setRenewPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);
    const navigate = useNavigate();
    const [step, setStep] = useState(0); 
    const [errors, setErrors] = useState({});
    const [loading,setLoading] = useState(false);
    const [loading1,setLoading1] = useState(false);
    const [loading2,setLoading2] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [otp, setOtp] = useState(new Array(6).fill(''));
    const inputRefs = useRef([]);
    const [remainingSeconds, setRemainingSeconds] = useState(60);
    const [resstat,setResstat] = useState('');
 
    const handleSnackbarClose = () => {
      setSnackbarOpen(false);
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

    useEffect(() => {
      if (errors.otp) {
        document.body.classList.add('animate-red');
  
        const timeoutId = setTimeout(() => {
          document.body.classList.remove('animate-red');
        }, 5000);

        return () => clearTimeout(timeoutId);
      }
    }, [errors.otp]);
    useEffect(() => {
      if (remainingSeconds > 0) {
        const timer = setInterval(() => {
          setRemainingSeconds(prevSeconds => prevSeconds - 1);
        }, 1000);
        
        return () => clearInterval(timer);
      }
    }, [remainingSeconds]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const errors = {};
        if (!email) {
          errors.email = "Email is required";
        }
        if (!password) {
          errors.password = "Password is required";
        }
        if (Object.keys(errors).length > 0) {
          setErrors(errors);
          console.log(errors)
          return;
        }
        setErrors('')  
        setLoading(true)
        loginUserAcc.USER_LOGIN({email,password})
        .then(res => {
          if(res.data.message === 'Login Successfully'){
            setResstat('200')
            setSnackbarMessage(res.data.message);
            setSnackbarOpen(true); 
            const user = res.data.result[0]
            setErrors('') 
            dispatch(setUserDetails(user))
            setTimeout(() => {
              navigate('/dashboard/home');
              setLoading(false)
            }, 2500);
          }else{
            setResstat('500')
            setSnackbarMessage(res.data.message);
            setSnackbarOpen(true); 
            navigate('/login')
            setLoading(false)
            setErrors('')
          }
      
        }
         )
        .catch(err => console.log(err));
      }
      const findUser = async (e) =>{
        e.preventDefault();
        const errors = {};
        if (!fpemail) {
          errors.fpemail = "Email is required";
        }
        if (Object.keys(errors).length > 0) {
          setErrors(errors);
        
          return;
        }
        setErrors('')
        const formData = new FormData()
        formData.append('fpemail',fpemail)
        setLoading1(true)
       await GetUserAcc.FETCH_USERACCS(formData)
        .then(res => {
     
          if(res.data.success === 0){
            setResstat('500')
            setSnackbarMessage(res.data.message);
            setSnackbarOpen(true); 
            setStep(1);
            setLoading1(false)
          
          }else{
            const formData = new FormData();
            formData.append('fpemail', fpemail);
            GenerateOtp.GENERATE_OTP(formData)
            .then(response => {
         
              if(response.data.success === 0){
                setResstat('500')
                setSnackbarMessage(res.data.message);
                setSnackbarOpen(true); 
                setStep(1);
                setLoading1(false)
                setErrors('')
              
              }else{
                setRemainingSeconds(60);
                setStep(2);
                setErrors('')
                setLoading1(false)
                setResstat('200')
                setSnackbarMessage('OTP is sent into your Email Account');
                setSnackbarOpen(true); 
              }
            })
          }
      
        }
         )
        .catch(err => console.log(err));
      }
      const ValidateOtp = async(e) =>{
        e.preventDefault();
        const errors = {};
        if (!otp) {
          errors.otp = 'This Field is Required'
        }
        if (Object.keys(errors).length > 0) {
          setErrors(errors);
        
          return;
        }
        const checkotp = otp.join('')
        setLoading2(true)
        const formData = new FormData();
        formData.append('fpemail', fpemail);
        formData.append('otp', checkotp);
        ValidateUserOtp.VALIDATE_USEROTP(formData)
        .then(res => {
          if(res.data.success === 0){
            setResstat('500')
            setSnackbarMessage(res.data.message);
            setSnackbarOpen(true); 
            setStep(2);
            setLoading2(false)
            setErrors('')
          
          }else{
            setLoading2(false)
            setStep(3);
            setResstat('200')
            setSnackbarMessage(res.data.message);
            setSnackbarOpen(true); 
            setErrors('')
          }
      
        }
         )
        .catch(err => console.log(err));
      }
      const handleResendClick = (event) =>{
        event.preventDefault();
        const errors = {};
        if(remainingSeconds > 0){
          errors.otp = `${remainingSeconds} seconds before requesting another OTP.`
        }
        if (Object.keys(errors).length > 0) {
          setErrors(errors);
          return;
        }
        setLoading(true)
        const formData = new FormData();
        formData.append('fpemail', fpemail);
        GenerateOtp.GENERATE_OTP(formData)
        .then(res => {
       
          if(res.data.success === 0){
            setResstat('500')
            setSnackbarMessage(res.data.message);
            setSnackbarOpen(true); 
            setLoading(false)
            setErrors('')
            setStep(2);
          
          }else{
            setResstat('200')
            setSnackbarMessage('OTP is sent into your Email Account');
            setSnackbarOpen(true); 
            setRemainingSeconds(60)
            setLoading(false)
            setErrors('')
            setStep(2);
          }
      
        }
         )
        .catch(err => console.log(err));
      }
      const UpdateUserPass = async(event) =>{
        event.preventDefault();
        const errors = {};
        if(newpassword === ''){
          errors.newpassword = 'Please enter a new password';
        } else if (newpassword.length < 8) {
          errors.newpassword = "Password must be at least 8 characters long";
        } else if (!/^[a-zA-Z0-9]*$/.test(newpassword)) {
          errors.newpassword = "Password can only contain alphanumeric characters";
        }
        if(renewpassword === ''){
          errors.renewpassword = 'This Field is required';
        } else if (renewpassword.length < 8) {
          errors.renewpassword = "Password must be at least 8 characters long";
        } else if (!/^[a-zA-Z0-9]*$/.test(renewpassword)) {
          errors.renewpassword = "Password can only contain alphanumeric characters";
        }
        if(newpassword !== renewpassword){
          errors.renewpassword = "Passwords do not match";
        }
        if (Object.keys(errors).length > 0) {
          setErrors(errors);
        
          return;
        }
        setLoading(true);
        const formData = new FormData();
        formData.append('fpemail', fpemail);
        formData.append('updtpassword',renewpassword);
        ChangePassbyOtp.CHANGEPASSWORD_BYOTP(formData)
        .then(res => {
       
          if(res.data.success === 0){
            setResstat('500')
            setSnackbarMessage(res.data.message);
            setSnackbarOpen(true); 
            setLoading(false)
            setErrors('')
            setStep(2);
          
          }else{
            setLoading(false)
            setErrors('')
            setStep(0);
            setResstat('200')
            setSnackbarMessage(res.data.message);
            setSnackbarOpen(true); 
          }
      
        }
         )
        .catch(err => console.log(err));
      }
    
    const handlerEmailInput = (e) => setEmail(e.target.value)
    const handlerFPEmailInput = (e) => setFPEmail(e.target.value)
    const handlerPasswordInput = (e) => setPassword(e.target.value)
    const handlerNewPasswordInput = (e) => setNewPassword(e.target.value)
    const handlerRenewPasswordInput = (e) => setRenewPassword(e.target.value)
    const handlerForgotPasswordLink = (e) => setStep(1)
    const handlerBackInput = (e) => {
      setStep(0)
    }
  return(
    <>
    <Snackbar
      open={snackbarOpen}
      onClose={handleSnackbarClose}
      autoHideDuration={3000}
      TransitionComponent={Slide}
      TransitionProps={{ direction: 'right' }}
    >
        {snackbarMessage === 'Login Successfully' || snackbarMessage === 'OTP is sent into your Email Account' || snackbarMessage === 'OTP Verified Successfully.'
        || snackbarMessage === 'Password Changed Successfully' ? (<Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
        {snackbarMessage}!
        </Alert>) :(<Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
                  {snackbarMessage}!
        </Alert>)}
    </Snackbar>

    <div className="w-full h-screen flex justify-center items-center bg-registration-image">
      <div className="bg-white w-4/5 md:w-2/3 lg:w-1/2 h-4/5 md:h-auto rounded-lg">
          {step === 0 && (
          <div className="w-full h-full flex flex-wrap rounded-md ">
            <div className="hidden md:flex w-full flex-1 bg-background-image md:bg-blueish md:rounded-r-3xl relative">
            </div>
            <div className='flex-1 bg-blue-300 rounded-lg md:bg-transparent md:rounded-none'>
              <div className='flex justify-center items-center flex-col mt-4 '>
                <img className='w-16 h-10 rounded-full' 
                src={BMCC} alt="" />
                <p className='text-blueish font-bold'>LOGIN</p>
              </div>
                <form className='px-4 pb-4' 
                action="">
                  <TextInput
                    label={'Email'}
                    value={email}
                    onChange={handlerEmailInput}
                    error={errors.email}
                  />
                  <PasswordInput
                    label={'Password'}
                    value={password}
                    name={'Password'}
                    onChange={handlerPasswordInput}
                    onClick={() => setShowPassword(!showPassword)}
                    show={showPassword}
                    error={errors.password}
                  />
                  <div className='flex flex-col w-full'>
                    <Link className='text-blue-700 mt-2 mb-4' onClick={handlerForgotPasswordLink}>Forgot your Password?</Link>
                    <div className='w-full flex justify-center items-center'>
                    <CustomButton
                    label={'Login'}
                    color={'blue'}
                    loading={loading}
                    disabled={loading}
                    onClick={handleSubmit}
                   />
                    </div>

                  </div>

                </form>
            </div>
          </div>
            )}
          {step === 1 && (
              <div className="w-full h-full flex flex-wrap rounded-md ">
                <div className="hidden md:flex w-full flex-1 bg-background-image md:bg-blueish md:rounded-r-3xl relative">
                </div>
                <div className='flex-1 bg-blue-300 rounded-lg md:bg-transparent md:rounded-none'>
                  <div className='flex justify-center items-center flex-col mt-4 '>
                    <img className='w-16 h-10 rounded-full' 
                    src={BMCC} alt="" />
                    <p className='text-blueish font-bold'>FIND YOUR ACCOUNT</p>
                  </div>
                    <form className='px-4 pb-4' 
                    action="">
                      <p>Enter your email here to send a confirmation for a password reset.</p>
                          <TextInput
                          label={'Email'}
                          value={fpemail}
                          onChange={handlerFPEmailInput}
                          error={errors.fpemail}
                          />
                      <div className='flex flex-col md:flex-row md:justify-end md:items-end gap-2 m-4'>
                        <button 
                        className='order-last md:order-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'
                        type='submit'
                        onClick={handlerBackInput}
                        >
                          Cancel
                        </button>
                        <button 
                        className='order-1 md:order-last bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'
                        type='submit'
                        onClick={findUser}
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                </div>
              </div>
            )}
          {step === 2 && (
              <div className="w-full h-full flex flex-wrap rounded-md ">
              <div className="hidden md:flex w-full flex-1 bg-background-image md:bg-blueish md:rounded-r-3xl relative">
              </div>
              <div className='flex-1 bg-blue-300 rounded-lg md:bg-transparent md:rounded-none'>
                <div className='flex justify-center items-center flex-col mt-4 '>
                  <img className='w-16 h-10 rounded-full' 
                  src={BMCC} alt="" />
                  <p className='text-blueish font-bold'>OTP VERIFICATION</p>
                </div>
                  <form className='px-4 pb-4' 
                  action="">
                    <p>An OTP has been sent to your email. Please enter it below:</p>
                    <div className="flex gap-2 mt-8 flex flex-col">
                      <label htmlFor="">OTP:</label>
                      <div className='flex gap-2'>
                      {otp.map((digit, index) => (
                          <input
                            key={index}
                            className="w-12 px-4 py-2 h-10 border-2 border-gray-400 outline-0 rounded-sm focus:outline-none focus:ring focus:border-'blue-300' transition duration-300 ease-in-out"
                            type="text"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleChange(e, index)}
                            onKeyDown={(e) => handleKeyPress(e, index)}
                            ref={(ref) => (inputRefs.current[index] = ref)}
                          />
                        ))}
                      </div>
                      </div>
                        <p style={{color:'black',margin:'20px 10px 10px 10px',fontStyle:'italic'}}>Didn't get the code?
                        <Link
                        className='text-blueish cursor-pointer'
                        onClick={handleResendClick}
                      >
                          Resend
                      </Link>
                        </p>
                    <div className='flex flex-col md:flex-row md:justify-end md:items-end gap-2 m-4'>
                      <button 
                      className='order-1 md:order-last bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'
                      type='submit'
                      onClick={ValidateOtp}
                      >
                        Verify
                      </button>
                    </div>
                  </form>
              </div>
            </div>
            )}
          {step === 3 && (
              <div className="w-full h-full flex flex-wrap rounded-md ">
              <div className="hidden md:flex w-full flex-1 bg-background-image md:bg-blueish md:rounded-r-3xl relative">
              </div>
              <div className='flex-1 bg-blue-300 rounded-lg md:bg-transparent md:rounded-none'>
                <div className='flex justify-center items-center flex-col mt-4 '>
                  <img className='w-16 h-10 rounded-full' 
                  src={BMCC} alt="" />
                  <p className='text-blueish font-bold'>CHANGE PASSWORD</p>
                </div>
                  <form className='px-4 pb-4' 
                  action="">
                    <PasswordInput
                      label={'New Password'}
                      name={'New Password'}
                      value={newpassword}
                      onChange={handlerNewPasswordInput}
                      onClick={() => setShowPassword(!showPassword)}
                      show={showPassword}
                      error={errors.newpassword}
                    />
                    <PasswordInput
                      label={'Re-Type New Password'}
                      name={'Re-Type New Password'}
                      value={renewpassword}
                      onChange={handlerRenewPasswordInput}
                      onClick={() => setShowPassword1(!showPassword1)}
                      show={showPassword1}
                      error={errors.renewpassword}
                    />
                    <div className='flex flex-col md:flex-row md:justify-end md:items-end gap-2 m-4'>
                      <button 
                      className='order-1 md:order-last bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'
                      type='submit'
                      onClick={UpdateUserPass}
                      >
                        Submit
                      </button>
                    </div>
                  </form>
              </div>
            </div>
            )}
      </div>
    </div>
    </>
    ) 
}

export default Login
