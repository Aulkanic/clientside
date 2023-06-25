import React, { useState, useEffect } from 'react'
import './login.css'
import { useNavigate, Link } from 'react-router-dom'
import { useLoginMutation } from '../../features/authenticate/authApiSlice'
import BMCC from '../assets/marisko.png'
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import LoginTwoToneIcon from '@mui/icons-material/LoginTwoTone';
import FormHelperText from '@mui/material/FormHelperText';
import swal from 'sweetalert';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import { alpha, styled } from '@mui/material/styles';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import {loginUserAcc, GetUserAcc, GenerateOtp, ValidateUserOtp, ChangePassbyOtp} from '../../Api/request'
import Lheader from '../../LandingPage/components/header'
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import MuiAlert from '@mui/material/Alert';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TransitionLeft(props) {
  return <Slide {...props} direction="left" />;
}
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

const Login = () => {
console.log(process.env.REACT_APP_API_URL)
    const [email, setEmail] = useState('');
    const [fpemail, setFPEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newpassword, setNewPassword] = useState('');
    const [renewpassword, setRenewPassword] = useState('');
    const navigate = useNavigate();
    const [step, setStep] = useState(0); 
    const [errors, setErrors] = useState({});
    const [loading,setLoading] = useState(false);
    const [loading1,setLoading1] = useState(false);
    const [loading2,setLoading2] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [otp, setOtp] = useState('');
    const [remainingSeconds, setRemainingSeconds] = useState(60);
    const [resstat,setResstat] = useState('');

    const handleSnackbarClose = () => {
      setSnackbarOpen(false);
    };


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
        console.log(Object.keys(errors).length)
        if (Object.keys(errors).length > 0) {
          setErrors(errors);
          console.log(errors)
          return;
        }
        setErrors('')  
        setLoading(true)
        
        loginUserAcc.USER_LOGIN({email,password})
        .then(res => {
          console.log(res)
          if(res.data.message === 'Login Successfully'){
            setResstat('200')
            setSnackbarMessage(res.data.message);
            setSnackbarOpen(true); 
            localStorage.setItem('LoggedIn',true);
            localStorage.setItem('ApplicantNum',res.data.ApplicantID);
            localStorage.setItem('ApplicantionNumber',res.data.ApplicationNumber);
            setErrors('')  
            setTimeout(() => {
              navigate('/home');
            }, 2500);
          }else{
            localStorage.setItem('LoggedIn',false);
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
          console.log(errors)
          return;
        }
        setErrors('')
        setLoading1(true)
       await GetUserAcc.FETCH_USERACCS(fpemail)
        .then(res => {
          console.log(res)
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
              console.log(response)
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
          console.log(errors)
          return;
        }
        setLoading2(true)
        const formData = new FormData();
        formData.append('fpemail', fpemail);
        formData.append('otp', otp);
        ValidateUserOtp.VALIDATE_USEROTP(formData)
        .then(res => {
          console.log(res)
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
          console.log(errors)
          return;
        }
        setLoading(true)
        const formData = new FormData();
        formData.append('fpemail', fpemail);
        GenerateOtp.GENERATE_OTP(formData)
        .then(res => {
          console.log(res)
          if(res.data.success === 0){
            setResstat('500')
            setSnackbarMessage(res.data.message);
            setSnackbarOpen(true); 
            setLoading(false)
            setErrors('')
            setStep(2);
          
          }else{
            setResstat('200')
            setSnackbarMessage(res.data.message);
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
          console.log(errors)
          return;
        }
        setLoading(true);
        const formData = new FormData();
        formData.append('fpemail', fpemail);
        formData.append('updtpassword',renewpassword);
        ChangePassbyOtp.CHANGEPASSWORD_BYOTP(formData)
        .then(res => {
          console.log(res)
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
    const handlerOtpInput = (e) => setOtp(e.target.value)
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
{snackbarMessage === 'Login Successfully' || snackbarMessage === 'OTP is sent into your Email Account' || snackbarMessage === 'Verification Success'
 || snackbarMessage === 'Password Changed Successfully' ? (<Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
{snackbarMessage}!
</Alert>) :(<Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
          {snackbarMessage}!
</Alert>)}
</Snackbar>

    <Lheader/>
    <div className="loginpage">
                <div className="lgform">
                    <div className="logbmcc">
                        <img  src={BMCC} alt="" />
                    </div>
                    
                    {step === 0 && (<div className="lgcon">
                        <h1>Login your Account</h1>
                        <form action="">

                      <CssTextField      
                      id="input-with-icon-textfield"
                      label="Email"
                      value={email}
                      fullWidth
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
                        margin: '10px', 
                        marginBottom: '0px',
                        cursor: 'pointer', 
                      }}
                    />
                    {errors.email && <Alert variant='outlined' style={{ width: '77%', margin: '10px', color:'red', fontSize:'12px',height:'35px' }} elevation={0} severity="error">
                        {errors.email}
                      </Alert>}
                    <div>
                    <CssTextField      
                      id="input-with-icon-textfield"
                      label="Password"
                      type='password'
                      value={password}
                      onChange={handlerPasswordInput}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockRoundedIcon />
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
                    {errors.password && <Alert variant='outlined' style={{ width: '87%', margin: '10px', color:'red', fontSize:'12px',height:'35px' }} elevation={0} severity="error">
                        {errors.password}
                      </Alert>}
                        </div>
                        </form>
                        <div className="lgbtn">
        <LoadingButton
        loading={loading}
        loadingPosition="end"
        variant="elevated"
        endIcon={loading ? (null) : (<LoginTwoToneIcon />)}
        fullWidth
        sx={{
          margin: '10px',
          cursor: 'pointer',
          fontWeight: '700',
          backgroundColor: 'green',
          color: 'white',
          fontSize: '15px',
          letterSpacing: '2px',
          transition: 'background 0.3s ease-in-out, clip-path 0.3s ease-in-out',
          '&:hover': {
            backgroundColor: 'rgba(43, 194, 106, 0.73)',
          },
          fontFamily:
            'Source Sans Pro, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        }}
        onClick={handleSubmit}
      >
        Login
      </LoadingButton>
                            </div>
                        <div className="loglink">
                            <Link className='lglink' onClick={handlerForgotPasswordLink}>Forgot your Password?</Link>
                        </div>
                    </div>)}
                    {step === 1 && (
        <div className='findtocon'>
          <h2>Find your account</h2>
          <div className="otpfform">
          <p>Enter your e-mail address below to reset your password.</p>
          <CssTextField      
        id="input-with-icon-textfield"
        label="Email"
        fullWidth
        value={fpemail}
        onChange={handlerFPEmailInput}
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
      </div>
     {errors.fpemail && (<Alert
         style={{ 
          width: '73%', 
          margin: '10px', 
          color:'red', 
          fontSize:'10px',
          height:'30px',
          background:'white' }}
           variant="outlined" severity="error">
        {errors.fpemail}
      </Alert>)}
     <div className="otpfnsc">
      <div>
      <LoadingButton
        loading={loading1}
        loadingPosition="end"
        endIcon={loading ? (null) : (<SendIcon />)}
        variant="elevated"
        fullWidth
        style={{
          margin: '10px', 
          cursor: 'pointer', 
          fontWeight: '700',
          background: 'rgba(43, 194, 106, 0.73)',
          color: 'white',
          fontSize:'10px',
          letterSpacing:'2px',
          fontFamily: 'Source Sans Pro, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', 
        }}
        onClick={findUser}
      >
        SUBMIT
      </LoadingButton>
      </div>
      <div>
      <LoadingButton variant="elevated" 
              style={{
                margin: '10px', 
                cursor: 'pointer', 
                fontWeight: '700',
                background: 'rgba(43, 194, 106, 0.73)',
                color: 'white',
                fontSize:'10px',
                letterSpacing:'2px',
                fontFamily: 'Source Sans Pro, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', 
              }}
              onClick={handlerBackInput}
              >CANCEL
      </LoadingButton>
      </div>
      </div>
        </div>
                      )}
                    {step === 2 && (
        <div className='otpverifycon'>
          <h2>OTP VERIFICATION</h2>
          <div className="formotpvalif">
          <p>An OTP has been sent to your email. Please enter it below:</p>
          <label>
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
                  }} type="text" value={otp} onChange={handlerOtpInput}/>
     {errors.otp && (<Alert
         style={{ 
          width: '73%', 
          margin: '10px', 
          color:'red', 
          fontSize:'10px',
          height:'30px',
          background:'white',
          boxShadow:'none' }}
           variant="outlined" severity="error">
        {errors.otp}
      </Alert>)}
          </label>
          </div>
          <div className='bacreotp'>
            <div>
            <LoadingButton 
                          style={{
                            margin: '10px', 
                            cursor: 'pointer', 
                            fontWeight: '700',
                            background: 'rgba(43, 194, 106, 0.73)',
                            color: 'white',
                            fontSize:'15px',
                            letterSpacing:'2px',
                            fontFamily: 'Source Sans Pro, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', 
                          }}
                          onClick={handlerBackInput}
            variant="outlined" >Back</LoadingButton>
            </div>     
            <div>
            <LoadingButton
        loading={loading1}
        loadingPosition="end"
        variant="outlined"
        fullWidth
        style={{
          margin: '10px', 
          cursor: 'pointer', 
          fontWeight: '700',
          background: 'rgba(43, 194, 106, 0.73)',
          color: 'white',
          fontSize:'15px',
          letterSpacing:'2px',
          fontFamily: 'Source Sans Pro, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', 
        }}
        onClick={handleResendClick}
      >
        Resend
      </LoadingButton>
            </div>

      </div>
      <div>
      <LoadingButton
        loading={loading2}
        loadingPosition="end"
        variant="outlined"
        fullWidth
        style={{
          margin: '10px', 
          cursor: 'pointer', 
          fontWeight: '700',
          background: 'rgba(43, 194, 106, 0.73)',
          color: 'white',
          fontSize:'15px',
          letterSpacing:'2px',
          fontFamily: 'Source Sans Pro, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', 
        }}
        onClick={ValidateOtp}
      >
        VERIFY
      </LoadingButton>
      </div>
        </div>
                       )}
                    {step === 3 && (
        <div className='restfrmpass'>
          <h1>Reset your Password</h1>
          <div className="updatepassresfrm">
          <div>
          <CssTextField      
                      id="input-with-icon-textfield"
                      label="New Password"
                      type='password'
                      value={newpassword}
                      onChange={handlerNewPasswordInput}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockRoundedIcon />
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
          </div>
          {errors.newpassword && (<Alert
         style={{ 
          width: '79%', 
          margin: '10px', 
          color:'red', 
          fontSize:'10px',
          height:'30px',
          background:'white',
          boxShadow:'none' }}
           variant="outlined" severity="error">
        {errors.newpassword}
      </Alert>)}
          <div>
          <CssTextField      
                      id="input-with-icon-textfield"
                      label="Re-Type New Password"
                      type='password'
                      value={renewpassword}
                      onChange={handlerRenewPasswordInput}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockRoundedIcon />
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
          </div>
          {errors.renewpassword && (<Alert
         style={{ 
          width: '79%', 
          margin: '10px', 
          color:'red', 
          fontSize:'10px',
          height:'30px',
          background:'white',
          boxShadow:'none' }}
           variant="outlined" severity="error">
        {errors.renewpassword}
      </Alert>)}
          </div>
          <div>
        <LoadingButton
        loading={loading}
        fullWidth
        loadingPosition="end"
        endIcon={loading ? (null) : (<SendIcon />)}
        variant="elevated"
        style={{
          margin: '10px', 
          cursor: 'pointer', 
          fontWeight: '700',
          background: 'rgba(43, 194, 106, 0.73)',
          color: 'white',
          fontSize:'15px',
          letterSpacing:'5px',
          fontFamily: 'Source Sans Pro, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', 
        }}
        onClick={UpdateUserPass}
      >
        Submit
      </LoadingButton>
      </div>
        </div>
      )}
                </div>
            </div>
    </>
    ) 
}

export default Login


