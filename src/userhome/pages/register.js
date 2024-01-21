import React, { useEffect, useState, useRef } from 'react'
import {  useNavigate } from 'react-router-dom'
import './register.css'
import TextField from '@mui/material/TextField';
import { Button, Link } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import LoadingButton from '@mui/lab/LoadingButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { CreatingRegistry, RegistryOtp,ResendOtp, ValidateOtp,FindRegisteredUser } from '../../Api/request';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import { styled } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import swal from 'sweetalert';
import { useDispatch } from 'react-redux';
import { setName } from '../../Redux/userSlice';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Swal from 'sweetalert2';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Backdrop, CircularProgress } from '@mui/material';
import { setForm } from '../../Redux/formSlice';
import CustomButton from '../../Components/Button/button';
import SelectInput from '../../Components/InputField/select';
import { useSelector } from 'react-redux';

const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 50,
  color: '#fff',
}));


const CssTextField = styled(TextField)({
  backgroundColor: 'white',
  width: '100%',
  color:'black',
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
    const form = useSelector((state) => state.form)
    const [userDetails,setUserDetails] = useState('')
    const [fname, setfname] = useState('');
    const [mname, setmname] = useState('');
    const [lname, setlname] = useState('');
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
    const [showBackdrop, setShowBackdrop] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [resstat,setResstat] = useState('');
    const [open, setOpen] = useState(true);
    const [validationResults, setValidationResults] = useState([]);
    const [validationResults1, setValidationResults1] = useState([]);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const [showPassword,setShowPassword] = useState(false)
  
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
    const handleRegisterClick = async () => {
      const errors = {};
      if (!email) {
        errors.email = "Email is required";
      } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
         errors.email = "Email is invalid";
      }
      if (Object.keys(errors).length > 0) {
        setErrors(errors);
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
    useEffect(() => {
      const validationCriteria = [
        {
          description: '8 - 45 characters',
          isValid: !password || (password.length >= 8 && password.length <= 45),
        },
        {
          description: 'At least one uppercase letter (A to Z)',
          isValid: !password || /[A-Z]/.test(password),
        },
        {
          description: 'At least one lowercase letter (a to z)',
          isValid: !password || /[a-z]/.test(password),
        },
        {
          description: 'At least one number (0 to 9)',
          isValid: !password || /[0-9]/.test(password),
        },
        {
          description: "Don't use : ; , * \" / \\",
          isValid: !password || !/[:;,*"\/\\]/.test(password),
        },
        {
          description: 'No spaces',
          isValid: !password || !/\s/.test(password),
        },
      ];
    
      const validateName = (name, lname, mname) => [
        {
          description: 'Capitalize all letters of firstname and lastname.',
          isValid: (!name || !lname) || (/^[A-Z\s!@#$%^&*()_+{}\[\]:;"'<>,.?|\\/0-9]*$/.test(name) && /^[A-Z\s!@#$%^&*()_+{}\[\]:;"'<>,.?|\\/0-9]*$/.test(lname) && /^[A-Z\s!@#$%^&*()_+{}\[\]:;"'<>,.?|\\/0-9]*$/.test(mname)),
        },
        {
          description: 'At least 3 to 45 characters only.',
          isValid: (!name || !lname) || (name.length >= 2 && name.length <= 45 && lname.length >= 2 && lname.length <= 45),
        },
        {
          description: 'No numbers.',
          isValid: (!/\d/.test(name) && !/\d/.test(lname) && !/\d/.test(mname)) || (!name || !lname),
        },
      ];
    
      const validationforName = validateName(fname, lname, mname);
      setValidationResults1(validationforName);
      setValidationResults(validationCriteria);
    
      // Check if any of the validation results are invalid
      const isPasswordValid = validationCriteria.every((result) => result.isValid);
      const isNameValid = validationforName.every((result) => result.isValid);
    
      // Enable or disable the submit button based on validation results
      setIsSubmitDisabled(!isPasswordValid || !isNameValid);
    }, [password, fname, lname, mname, validationResults, validationResults1]);
    
    
    const handleVerifyClick = (e) => {
      e.preventDefault()
      const errors = {}; 
      const checkotp = otp.join('')
      if(!checkotp || checkotp === ''){
        errors.otp = 'Please input otp first'
      }
      if (Object.keys(errors).length > 0) {
        setErrors(errors);
    
        return;
      }
      setLoading(true)
      const formData = new FormData();
      formData.append('email', email);
      formData.append('otp', checkotp);
      ValidateOtp.VALIDATE_OTP(formData)
      .then(res => {
  
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
    }
    if (!lname) {
      errors.lname = "Last Name is required";
    } else if (lname.length === 1) {
      errors.lname = "Input must not contain a single letter.";
    } else if (/[0-9]/.test(lname)) {
      errors.lname = "Input must not contain numeric value";
    } else if (/[!@#$%^&*(),.?":{}|<>]/.test(lname)) {
      errors.lname = "Special characters are not allowed.";
    }
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    } else if (!/^[a-zA-Z0-9]*$/.test(password)) {
      errors.password = "Password can only contain alphanumeric characters";
    }
    if(!userDetails){
      errors.userDetails = 'Please select user type first'
    }
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
     
      return;
    }
    setLoading(true)
    const formData = new FormData();
    formData.append('fname',fname);
    formData.append('lname',lname);
    formData.append('mname',mname);
    formData.append('email',email);
    formData.append('password',password);
    formData.append('userType',userDetails);
    CreatingRegistry.CREATE_REGISTRY(formData)
    .then(res => {
      if(res.data.message === 'Created'){
        const { applicantNum, fname, lname, mname, email,userType } = res.data.data;
        setResstat('200');
        setSnackbarMessage('Account Created');
        setSnackbarOpen(true);
        navigate('/ApplicationForm');
      
        const formFields = {
          applicantNum,
          firstName: fname,
          lastName: lname,
          middleName: mname,
          email,
          userType,
          famType: ''
        };
        if(userType !== 'Guardian'){
          Object.entries(formFields).forEach(([key, value]) => dispatch(setForm({ [key]: value })));
        }else{
          dispatch(setForm({ 'userType': userType }))
          dispatch(setForm({ 'applicantNum': applicantNum }))
          dispatch(setForm({ 'famType': 'OTHERS' }))
          dispatch(setForm({ 'email': email }))
          dispatch(setForm({ 'guardianName': fname.toUpperCase() }))
          dispatch(setForm({ 'guardianlName': lname.toUpperCase() }))
          dispatch(setForm({ 'guardianmName': mname.toUpperCase() }))
        }
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
      if(remainingSeconds === 1){
        setDisabled(true)
        errors.otp = `${remainingSeconds} second before requesting another OTP.`
      }
      if(remainingSeconds > 0){
        setDisabled(true)
        errors.otp = `${remainingSeconds} seconds before requesting another OTP.`
      }
      if (Object.keys(errors).length > 0) {
        setErrors(errors);
       
        return;
      }
      if(!email){
        swal({
          text: 'Please provide an email first.',
          timer: 2000,
          buttons: false,
          icon: "error",
        });
        return
      }
      setLoading1(true)
      const formData = new FormData();
      formData.append('email', email);
      ResendOtp.RESEND_OTP(formData)
      .then(res => {
     
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
const handlerFnameInput = (e) => setfname(e.target.value.toUpperCase())
const handlerMnameInput = (e) => setmname(e.target.value.toUpperCase())
const handlerLnameInput = (e) => setlname(e.target.value.toUpperCase())
const handlerEmailInput = (e) => setEmail(e.target.value)
const handlerPasswordInput = (e) => setPassword(e.target.value)
const handlerBackInput = (e) => {
  setStep(1)
}
const findCreatedAcc = async() =>{
  const { value: email } = await Swal.fire({
    title: 'Input email address',
    input: 'email',
    inputLabel: 'Your email address',
    inputPlaceholder: 'Enter your email address'
  })
  
  if (email) {
     await FindRegisteredUser.FETCH_USERREG(email)
     .then((res) =>{
      if(res.data.success === 1){
        const result = res.data.result[0];
        const { applicantNum, fname, lname, mname, email,userType } = result;
        const formFields = {
          applicantNum,
          firstName: fname,
          lastName: lname,
          middleName: mname,
          email,
          userType,
          famType:''
        };
        if(userType !== 'Guardian'){
          Object.entries(formFields).forEach(([key, value]) => dispatch(setForm({ [key]: value })));
        }else{
          dispatch(setForm({ 'userType': userType }))
          dispatch(setForm({ 'applicantNum': applicantNum }))
          dispatch(setForm({ 'famType': 'OTHERS' }))
          dispatch(setForm({ 'email': email }))
          dispatch(setForm({ 'guardianName': fname.toUpperCase() }))
          dispatch(setForm({ 'guardianlName': lname.toUpperCase() }))
          dispatch(setForm({ 'guardianmName': mname.toUpperCase() }))
        }
        navigate('/ApplicationForm')
      }else{
        Swal.fire(res.data.message)
      }
     })
  }
}
const handleOptionChange = (data) => {
  const { name, value } = data;    
  setUserDetails(value)
}
const user = [
{name:'userType',label:'Select user type',value:''},
{name:'userType',label:'Student',value:'Student'},
{name:'userType',label:'Guardian',value:'Guardian'}
]

  return (
    <>
      <StyledBackdrop open={showBackdrop}>
        <CircularProgress color="inherit" />
      </StyledBackdrop>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{padding:'20px'}}
      >
        <DialogTitle sx={{padding:'25px',fontWeight:'bold'}}> Step 1: Create an Account</DialogTitle>
        <DialogContent sx={{padding:'28px 5px 0px 28px',width:'maxContent'}}>
          <DialogContentText sx={{fontStyle:'italic'}} id="alert-dialog-slide-description">
          Please use your valid email address. This will serve as your account in Scholarship Program to see your application status and your other information.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{padding:'0px'}}>
          <Button sx={{fontSize:'20px',fontWeight:'bold'}} onClick={handleClose}>Ok</Button>
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
      <div className="flex h-screen flex-col justify-center items-center bg-registration-image">
        <div className="sm:w-full md:w-1/2 rounded-lg">
          <div className="w-full relative">
            {step === 1 && (
              <div className='w-full flex flex-col items-center bg-white p-4 rounded-lg'>
              <h2 className='text-sky-700 font-bold text-3xl'>Registration</h2>
              <p>Please enter your email address for creating account for Scholarship.</p>
                <div className='w-full my-4 flex flex-col justify-center items-center relative'>
                <CssTextField      
                  id="input-with-icon-textfield"
                  label="Email"
                  value={email}
                  placeholder='Your email address ...'
                  size='small'
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
                    width:'80%',
                    marginTop:'20px',
                    fontStyle:'italic'
                  }}
                />
                {errors.email && <p className='text-rose-700 text-base absolute -bottom-6 left-20'>
                      {errors.email}
                </p>}
                </div>
                <div className="my-4">
                  <div className='w-full flex justify-center items-center'>
                    <CustomButton
                      label={'Continue'}
                      color={'blue'}
                      loading={loading}
                      disabled={loading}
                      onClick={handleRegisterClick}
                    />
                  </div>
                </div>
                <Link className='italic cursor-pointer' onClick={findCreatedAcc}>
                  Already registered an Account?
                </Link>
              </div>
            )}

            {step === 2 && (
              <div className='bg-white flex flex-col justify-center items-center rounded-lg'>
                <h2 className='text-sky-700 font-bold text-2xl mt-4'>Check your email!</h2>
                <div className='w-full h-auto flex flex-col justify-center items-center'>
                  <p className='whitespace-normal text-black text-sm sm:text-md md:text-lg lg:text-xl xl:text-1xl px-2'>
                    Please enter a 6-digit code that was sent to your email.
                  </p>
                  <p className='whitespace-normal text-black text-sm sm:text-md md:text-lg lg:text-xl xl:text-1xl px-2'>
                    The code is valid for 5 minutes only.
                  </p>
                </div>


                <div className="flex flex-col gap-2 mt-8">
                  <div className='flex gap-2 mt-8'>
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      className="w-10 h-10 text-center border-2 border-gray-400 outline-0 rounded-sm"
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleChange(e, index)}
                      onKeyDown={(e) => handleKeyPress(e, index)}
                      ref={(ref) => (inputRefs.current[index] = ref)}
                    />
                  ))}
                  </div>
                  {errors.otp && <p className='text-red-600'>{errors.otp}</p>}
                  </div>
                  <p className='m-4 italic text-black'>Didn't get the code?
                  <button
                  className='text-blue-600 cursor-pointer bg-transparent ml-1 italic'
                  onClick={handleResendClick}
                  >
                   {loading1 ? 'Sending...' : 'Resend'}
                  </button>
                  </p>
                  <div style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center',fontStyle:'italic'}}>
                    {remainingSeconds > 0 ? (<p className={errors.otp ? 'red' : ''}>{remainingSeconds} seconds before requesting another OTP</p>) : (null)}
                  </div>
            <div className='w-full h-auto flex items-center gap-4 justify-center mb-8'>
              <CustomButton
                label={'Back'}
                color={'blue'}
                loading={false}
                disabled={false}
                onClick={handlerBackInput}
              />
              <CustomButton
                label={'Verify'}
                color={'green'}
                loading={loading}
                disabled={loading}
                onClick={handleVerifyClick}
              />
            </div>
              </div>
            )}

            {step === 3 && (
              <div className='w-full bg-white flex flex-col p-4 rounded-lg'>
              <h2  className='text-sky-700 font-bold text-2xl mt-4'>Create Account</h2>
              <div className='flex gap-2 w-full md:w-1/2 items-center justify-center'>
              <h1 className='font-bold text-lg'>User Type:</h1>
                <SelectInput 
                  options={user}
                  value={user.find(data => data.value === userDetails)}
                  onChange={(handleOptionChange)}
                  error={errors.userDetails}
                />
              </div>

                <div className=' flex flex-wrap justify-between md:flex-row sm:flex-col '>
                <div className='w-full md:w-1/2 sm:w-full'>
                  <div>
                  <label className='labelsinp' htmlFor="">First Name *</label>
                  <input      
                  id="input-with-icon-textfield"
                  label="First Name"
                  className='inputss'
                  style={{fontStyle:'italic',fontSize:'14px',paddingLeft:'15px'}}
                  placeholder='Please enter your first name ...'
                  value={fname}
                  onChange={handlerFnameInput}
                />
                  {errors.fname && <p variant='outlined' 
                    className='perrors'
                    style={{ 
                      margin: '0px', 
                      color:'red', 
                      fontSize:'10px'}}>
                          {errors.fname}
                        </p>}
                  </div>
                  <div>
                  <label className='labelsinp' htmlFor="">Middle Name</label>
                  <input      
                  id="input-with-icon-textfield"
                  label="Middle Name"
                  className='inputss'
                  style={{fontStyle:'italic',fontSize:'14px',paddingLeft:'15px'}}
                  placeholder='Please enter your middle name ...'
                  value={mname}
                  onChange={handlerMnameInput}
                />

                  </div>
                  <div>
                  <label className='labelsinp' htmlFor="">Last Name *</label>
                  <input      
                      id="input-with-icon-textfield"
                      label="Last Name"
                      className='inputss'
                      value={lname}
                      style={{fontStyle:'italic',fontSize:'14px',paddingLeft:'15px'}}
                      placeholder='Please enter your last name ...'
                      onChange={handlerLnameInput}
                    />
                    {errors.lname && <p variant='outlined' 
                    className='perrors'
                    style={{ 
                      margin: '0px', 
                      color:'red', 
                      fontSize:'10px'}}>
                          {errors.lname}
                        </p>}
                  </div>
                  <div>
                  <p>Instructions</p>
                  {validationResults1.map((result, index) => (
                  <p key={index} style={{ color: result.isValid ? 'green' : 'red',fontSize:'12px' }}>
                    {result.isValid ? (<CheckIcon sx={{fontSize:'12px'}}/>) : (<CloseIcon sx={{fontSize:'12px'}}/>)} {result.description}
                  </p>
                ))}
                  </div>
                </div>
                <div className='w-full md:w-1/2 sm:w-full md:pl-4 sm:pl-0'>
                <div style={{position:'relative'}}>
                <label className='labelsinp' htmlFor="">Password *</label>
                  <input      
                      id="input-with-icon-textfield"
                      label="Password"
                      className='inputss'
                      value={password}
                      type={!showPassword ? 'password' : 'text'}
                      style={{fontStyle:'italic',fontSize:'14px',paddingLeft:'15px'}}
                      placeholder='Enter your password...'
                      onChange={handlerPasswordInput}
                    />
                    {!password ? null : (<button type='button' onClick={() => setShowPassword(!showPassword)} style={{position:'absolute',right:'10px',backgroundColor:'transparent',color:'black',top:'27px',width:'max-content',padding:'0px',margin:'0px',border:'none'}}>
                  {!showPassword ? <FaEyeSlash style={{height:'30px',width:'20px',padding:'0px',margin:'0px'}} /> : <FaEye style={{height:'30px',width:'20px',padding:'0px',margin:'0px'}} />}
                  </button>)}
                  {errors.password && <p variant='outlined'
            className='perrors' 
              style={{ 
                margin: '0px', 
                color:'red', 
                fontSize:'10px', }}>
                    {errors.password}
                  </p>} 
                </div>
                <div>
                <p>Instructions</p>
                {validationResults.map((result, index) => (
                  <p key={index} style={{ color: result.isValid ? 'green' : 'red',fontSize:'12px' }}>
                  {result.isValid ? (<CheckIcon sx={{fontSize:'12px'}}/>) : (<CloseIcon sx={{fontSize:'12px'}}/>)}  {result.description}
                  </p>
                ))}
                </div>
                </div>
                </div>
                <div className='w-full flex items-center justify-center'>  
                  <CustomButton
                    label={'Creat Account'}
                    color={'green'}
                    loading={loading}
                    disabled={loading}
                    onClick={handleSubmitReg}
                  />
                </div> 
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Register
