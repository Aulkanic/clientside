import React, { useState, useEffect, useRef } from 'react'
import './login.css'
import { useNavigate, Link } from 'react-router-dom'
import BMCC from '../assets/mydo.png'
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
import ErrorIcon from '@mui/icons-material/Error';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { setLoggedIn,setUserDetails } from '../../Redux/loginSlice';



const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const CssTextField = styled(TextField)({
  backgroundColor: 'white',
  width: 'auto',
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
            dispatch(setLoggedIn(true));
            dispatch(setUserDetails(user))
            setTimeout(() => {
              navigate('/home');
            }, 2500);
          }else{
            dispatch(setLoggedIn(false));
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

    <div className="loginpage">
                <div className="lgform">
                    {step === 0 && (
                    <div className="lgcon">
                    <div className="logbmcc">
                        <img  src={BMCC} alt="" />
                        <p>USER LOGIN</p>
                    </div>
                  <form action="">
                    <div className="email-input-container">
                    <label className='labellogin' htmlFor="Email">Email</label>
                      <input      
                      id="Email"
                      label="Email"
                      value={email}
                      className='inputemail'
                      onChange={handlerEmailInput}
                    />
                    {errors.email && <p
                    style={{ width: '87%', margin: '10px', color:'red', fontSize:'12px',height:'max-Content' }}
                     >
                        {errors.email}
                      </p>}
                    </div>
                    <div className="password-input-container">
                    <label className='labellogin' htmlFor="password">Password</label>
                   <input type={!showPassword ? "password" : "text"} 
                    id='password'
                   className='inputpass'
                   value={password}
                   onChange={handlerPasswordInput}
                   />
                   {!password ? null : (<button type='button' onClick={() => setShowPassword(!showPassword)} style={{position:'absolute',right:'10px',backgroundColor:'transparent',color:'black',top:'27px',width:'max-content',padding:'0px',margin:'0px'}}>
                   {!showPassword ? <FaEyeSlash style={{height:'30px',width:'20px',padding:'0px',margin:'0px'}} /> : <FaEye style={{height:'30px',width:'20px',padding:'0px',margin:'0px'}} />}
                   </button>)}
                    {errors.password && <p 
                    style={{ width: '87%', margin: '10px', color:'red', fontSize:'12px',height:'max-Content' }} 
                    >
                        {errors.password}
                      </p>}
                    </div>

                  </form>
                  <div className="loglink">
                    <Link className='lglink' onClick={handlerForgotPasswordLink}>Forgot your Password?</Link>
                  </div>
                  <div className='signforgot'>
                        <div className="lgbtn">
                            <LoadingButton
                            loading={loading}
                            loadingPosition="end"
                            variant="elevated"
                            fullWidth
                            sx={{
                              margin: '10px',
                              cursor: 'pointer',
                              fontWeight: '700',
                              backgroundColor: 'blue',
                              color: 'white',
                              fontSize: '15px',
                              letterSpacing: '2px',
                              textTransform:'capitalize',
                              transition: 'background 0.3s ease-in-out, clip-path 0.3s ease-in-out',
                              '&:hover': {
                                backgroundColor: 'rgba(32, 76, 234, 1) ',
                              },
                              fontFamily:
                                'Source Sans Pro, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                            }}
                            onClick={handleSubmit}
                          >
                            Login
                          </LoadingButton>
                        </div>
                  </div>

                    </div>
                      )}
                    {step === 1 && (
        <div className='findtocon'>
                    <div className="logbmcc">
                        <img  src={BMCC} alt="" />
                        <p>FIND YOUR ACCOUNT</p>
                    </div>
          <div className="otpfform">
          <p>Enter your email here to send a confirmation for a password reset.</p>
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
              endAdornment:(
                <InputAdornment position="end">
                {errors.fpemail && <ErrorIcon sx={{color:'red'}}/>}
                </InputAdornment>   
              )
            }}
            variant="outlined"
            style={{
              cursor: 'pointer', 
            }}
          />
          {errors.fpemail && (<p style={{ width: '100%', margin: '10px', color:'red', fontSize:'12px',height:'max-Content' }}>
            {errors.fpemail}
          </p>)}
          </div>

        <div className="otpfnsc">
          <div>
          <LoadingButton
            loading={loading1}
            loadingPosition="end"
            variant="elevated"
            fullWidth
            sx={{
              '&:hover': {
                background: 'rgba(76, 234, 32, 1)',
                transform: 'scale(1.1)'
              },
              background:'#B9E6B0',
              color: 'white',
              marginLeft:'10px',
              textTransform:'capitalize'
            }}
            onClick={findUser}
          >
            Submit
          </LoadingButton>
          </div>
          <div>
          <LoadingButton variant="elevated" 
                  sx={{
                    background: '#B0C4DE',
                    color: 'white',
                    textTransform:'capitalize',
                    '&:hover': {
                      background: 'rgba(32, 76, 234, 1)',
                      transform: 'scale(1.1)'
                    },
                  }}
                  onClick={handlerBackInput}
                  >Cancel
          </LoadingButton>
          </div>
        </div>
        </div>
                      )}
                    {step === 2 && (
        <div className='otpverifycon'>
                    <div className="logbmcc">
                        <img  src={BMCC} alt="" />
                        <p>OTP VERIFICATION</p>
                    </div>
          <div className="formotpvalif">
          <p style={{color:'black'}}>An OTP has been sent to your email. Please enter it below:</p>
          <label>
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
          <div style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
          {remainingSeconds > 0 ? (<p className={errors.otp ? 'red' : ''}>{remainingSeconds} seconds before requesting another OTP</p>) : (null)}
          </div>
          
          </label>
          </div>
          <div className='bacreotp'>    
            <div>
            <p style={{color:'black'}}>Didn't get a code?<Link
              style={{color:'#252525'}}
              onClick={handleResendClick}
            >
              Resend
            </Link></p>

            </div>
            <div>
            <LoadingButton
              loading={loading2}
              loadingPosition="end"
              variant="outlined"
              fullWidth
              sx={{
                '&:hover': {
                  background: 'rgba(76, 234, 32, 1)',
                  transform: 'scale(1.1)'
                },
                background:'#B9E6B0',
                color: 'white',
                marginLeft:'10px',
                marginTop:'20px',
                textTransform:'capitalize'
              }}
              onClick={ValidateOtp}
            >
              Verify
            </LoadingButton>
            </div>
            </div>
        </div>
                       )}
                    {step === 3 && (
        <div className='restfrmpass'>
                    <div className="logbmcc">
                        <img  src={BMCC} alt="" />
                        <p>CHANGE PASSWORD</p>
                    </div>
          <div className="updatepassresfrm">
          <div style={{position:'relative'}}>
          <CssTextField      
                      id="input-with-icon-textfield"
                      label="New Password"
                      type={showPassword ? 'text' : 'password'}
                      fullWidth
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
                   {!newpassword ? null : (<button type='button' onClick={() => setShowPassword(!showPassword)} style={{position:'absolute',right:'25px',backgroundColor:'transparent',color:'black',top:'23px',width:'max-content',padding:'0px',margin:'0px',border:'none'}}>
                   {!showPassword ? <FaEyeSlash style={{height:'30px',width:'20px',padding:'0px',margin:'0px'}} /> : <FaEye style={{height:'30px',width:'20px',padding:'0px',margin:'0px'}} />}
                   </button>)}
          </div>
          {errors.newpassword && (<p
         style={{ 
          width: '79%', 
          margin: '10px', 
          color:'red', 
          fontSize:'10px',
          height:'max-Content',
          background:'white',
          boxShadow:'none' }}
           variant="outlined" severity="error">
        {errors.newpassword}
      </p>)}
          <div style={{marginTop:'10px',position:'relative'}}>
          <CssTextField      
                      id="input-with-icon-textfield"
                      label="Re-Type New Password"
                      type={showPassword1 ? 'text' : 'password'}
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
                     {!renewpassword ? null : (<button type='button' onClick={() => setShowPassword1(!showPassword1)} style={{position:'absolute',right:'25px',backgroundColor:'transparent',color:'black',top:'23px',width:'max-content',padding:'0px',margin:'0px',border:'none'}}>
                   {!showPassword1 ? <FaEyeSlash style={{height:'30px',width:'20px',padding:'0px',margin:'0px'}} /> : <FaEye style={{height:'30px',width:'20px',padding:'0px',margin:'0px'}} />}
                   </button>)}
          </div>
          {errors.renewpassword && (<p
         style={{ 
          width: '79%', 
          margin: '10px', 
          color:'red', 
          fontSize:'10px',
          height:'max-Content',
          background:'white',
          boxShadow:'none' }}
           variant="outlined" severity="error">
        {errors.renewpassword}
      </p>)}
          </div>
          <div>
        <LoadingButton
        loading={loading}
        fullWidth
        loadingPosition="end"
        variant="elevated"
        sx={{
          '&:hover': {
            background: 'rgba(76, 234, 32, 1)',
            transform: 'scale(1.1)'
          },
          background:'#B9E6B0',
          color: 'white',
          marginBottom:'10px',
          marginTop:'10px',
          textTransform:'capitalize'
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


