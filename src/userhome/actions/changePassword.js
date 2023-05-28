import React, { useState } from 'react'
import Axios from 'axios'
import Homepage from '../components/Homepage';
import swal from 'sweetalert';
import { Change_Password } from '../../Api/request'
import './changePassword.css'
import { Link, useNavigate } from 'react-router-dom';
import LoopingRhombusesSpinner from '../loadingDesign/loading';

const ChangePassword = () => {
    const t = localStorage.getItem('ApplicantNum');
    const em = JSON.parse(t);
    var email = em.Email;
    const [currentpassword, setCurrent] = useState('');
    const [newpassword, setNew] = useState('');
    const [repass, setRepass] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
function ChangeProf(event){
    event.preventDefault();
    
    Change_Password.CHANGE_PASSWORD()
    .then(res => {
        console.log(res.data)
        if(res.data.success === 0){
            swal(res.data.message);
            navigate('/ChangePassword')
        }
        else{
    setLoading(true)
      swal({
        title: "Success",
        text: "Password Changed!",
        icon: "success",
        button: "OK",
      });
      setLoading(false)
      navigate('/account');
    }
    }
     )
    .catch(err => console.log(err));
}
  return (
    <>
    <Homepage/>
    
    {!loading && <div className="ChangePassword">
        <div className="chPass">
            <div className="hpass"><h1>Change your Password</h1></div>
            <div className="frmpass">
            <form action="" onSubmit={ChangeProf}>
                <label htmlFor="">Current Password</label><br/>
                <input type="password" onChange={e=> setCurrent(e.target.value)} /><br/>
                <label htmlFor="">New Password</label><br/>
                <input type="password" onChange={e=> setNew(e.target.value)} /><br/>
                <label htmlFor="">Re-type New Password</label><br/>
                <input type="password" onChange={e=> setRepass(e.target.value)} /><br/>
                <div className="btnprof">
                <Link to='/account'><button className='cbtn'>Cancel</button></Link>
                <input className='sbtn' type="submit" />
                </div>
            </form>
            </div> 
        </div>
    </div>}
    {loading && 
    <>
    <div className="ChangePassword">
      <div className="chPass">
        <div className="frmpass">
    <LoopingRhombusesSpinner/>
    </div>
    </div>
    </div>
    </>}
    
    </>

  )
}

export default ChangePassword