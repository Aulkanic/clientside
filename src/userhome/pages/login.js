import React, { useState, useEffect } from 'react'
import './login.css'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../../features/authenticate/authSlice'
import { useLoginMutation } from '../../features/authenticate/authApiSlice'
import BMCC from '../assets/marisko.png'
import Municipal from '../assets/municipal.jpg'
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import swal from 'sweetalert';
import {loginUserAcc} from '../../Api/request'
import axios from 'axios'
import LoopingRhombusesSpinner from '../loadingDesign/loading'
import Lheader from '../../LandingPage/components/header'



const Login = () => {
   
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [login, { isLoading }] = useLoginMutation()
    const dispatch = useDispatch()


    useEffect(() => {
        setErrMsg('')
    }, [email, password])



    const handleSubmit = async (e) => {
        e.preventDefault()
        const errors = {};
        if (!email) {
          errors.fname = "First Name is required";
        }
        if (!password) {
          errors.lname = "First Name is required";
        }
        console.log(Object.keys(errors).length)
        if (Object.keys(errors).length > 0) {
          setErrors(errors);
          console.log(errors)
          return;
        }
        loginUserAcc.USER_LOGIN({email,password})
        .then(res => {
          console.log(res)
          if(res.data.message === 'login'){
            localStorage.setItem('LoggedIn',true);
            localStorage.setItem('ApplicantNum',res.data.ApplicantID);
            localStorage.setItem('ApplicantionNumber',res.data.ApplicationNumber);
            swal('Login Success');
            navigate('/home');
          
          }else{
            localStorage.setItem('LoggedIn',false);
            swal(res.data.message);
            navigate('/login')
          }
      
        }
         )
        .catch(err => console.log(err));
      }
    
    const handlerEmailInput = (e) => setEmail(e.target.value)
    const handlerPasswordInput = (e) => setPassword(e.target.value)


    const content = isLoading ? <LoopingRhombusesSpinner/>: (
            <>
          
            <div className="loginpage">
                    {/* <img className='lgbm' src={Municipal} alt="" /> */}
                <div className="lgform">
                    <div className="logbmcc">
                        <img  src={BMCC} alt="" />
                    </div>
                    
                    <div className="lgcon">
                        <h1>Login your Account</h1>
                        <form action="">
                            <div className="lgemail">
                                    <EmailIcon/>
                                    <label htmlFor="">Email</label>
                                    <input onChange={handlerEmailInput} type="email" required/>
                            </div>
                            <div className="lpassw">
                                    <LockIcon/>
                                    <label htmlFor="">Password</label>
                                    <input onChange={handlerPasswordInput} type="password" required/>
                            </div>
                            <div className="lgbtn">
                            <button onClick={handleSubmit}>Login</button>
                            </div>
                        </form>
                        <div className="loglink">
                            <Link className='lglink'>Forgot your Password?</Link>
                            {/* <Link to='/register' className='lglink'>Don't have account already?Signup</Link> */}
                        </div>
                    </div>
                </div>
            </div>
            </>
    )
    
  return(
    <>
    <Lheader/>
    {content}
    </>
    ) 
}

export default Login


