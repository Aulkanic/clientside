import React, { useEffect, useState } from 'react'
import Homepage from '../components/Homepage'
import './changeProfile.css'
import Axios from 'axios'
import swal from 'sweetalert';
import { ChangingProfile } from '../../Api/request';
import LoopingRhombusesSpinner from '../loadingDesign/loading';
import { Link, useNavigate } from 'react-router-dom';
function ChangeProfile() {
  
  const data = localStorage.getItem('ApplicantNum');
  const applicantNum = JSON.parse(data);
    const [userprof, setProfile] = useState('');
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState();
    const navigate = useNavigate();
function ChangeProf(event){
    event.preventDefault();
    setLoading(true)
    const data = {userprof,applicantNum};
    console.log(data)
    ChangingProfile.CHANGE_PROFILE(data)
    .then(res => {
      console.log(res)
      swal({
        title: "Success",
        text: "Profile has been changed!",
        icon: "success",
        button: "OK",
      });
      setLoading(false)
      navigate('/account')
    }
     )
    .catch(err => console.log(err));
}

useEffect(() => {
  if (!userprof) {
      setPreview(undefined)
      return
  }

  const objectUrl = URL.createObjectURL(userprof)
  setPreview(objectUrl)

  return () => URL.revokeObjectURL(objectUrl)
}, [userprof])




  return (
    <>
    <Homepage/>
    
    {!loading && <div className="Changeprofile">
        <div className="chProf">
            <div className="hprof"><h1>Change your Profile</h1></div>
            <div className="prevprof">
               <p>Preview</p>
               {userprof &&  <img className='previmg' src={preview} alt=''/> }
            </div>
            <div className="frmprof">
             <form action="" onSubmit={ChangeProf}>
                <input type="file" onChange={e=> setProfile(e.target.files[0])} /><br></br>
                <div className="btnprof">
                <Link to='/account'><button className='cbtn'>Cancel</button></Link>
                <input className='sbtn' type="submit" />
                </div>

            </form>
            </div>
            
        </div>
    </div>}{loading && <LoopingRhombusesSpinner/>}
    
    </>

  )
}

export default ChangeProfile