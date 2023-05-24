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
import axios from 'axios'
import LoopingRhombusesSpinner from '../loadingDesign/loading'
import Lheader from '../../LandingPage/components/header'



const Login = () => {
   
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const navigate = useNavigate();
    const [login, { isLoading }] = useLoginMutation()
    const dispatch = useDispatch()


    useEffect(() => {
        setErrMsg('')
    }, [email, password])



    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const userData = await login({email, password}).unwrap()
            localStorage.setItem('ApplicantNum', JSON.stringify(userData));
            localStorage.setItem('LoggedIn', "true");
            dispatch(setCredentials({...userData, email}))
            setEmail('')
            setPassword('')
            navigate('/home');
            swal('Successfully Login');
        } catch (err) {
            if(!err?.response){
                setErrMsg('No server Response')
            }else if(err.response?.status === 400){
                setErrMsg('Missing Email or Password');
            }else if(err.response?.status === 401){
                setErrMsg('Unauthorized');
            }else {
                setErrMsg('Login Failed')
            }
    
        }
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


