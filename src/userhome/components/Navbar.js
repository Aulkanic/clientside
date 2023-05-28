import React, { useEffect, useState } from 'react'
import './../css/mainpage.css'
import './../css/Navbar.css'
import Logo from './../assets/scholar.png'
import {Link} from 'react-router-dom'
import { FetchingProfileUser } from '../../Api/request'
import LoopingRhombusesSpinner from '../loadingDesign/loading'

const Navbar = () => {

    const data = localStorage.getItem('ApplicantNum');
    const value = JSON.parse(data);
    const data1 = localStorage.getItem('ApplicationNumber');
    const value1 = JSON.parse(data1);
    const [picture, setProfile] = React.useState([]);
    const [loading,Setloading] = useState(false);

    useEffect(() => {
      Setloading(true)
      FetchingProfileUser.FETCH_PROFILEUSER(value).then((response) => {
        setProfile(response.data.Profile); 
      Setloading(false)       
      });
    },[]);
    const profile = picture?.map((data) =>{
      return (
        <>

                <div className='profile'>
                 <img src={data.profile} alt="" />
                </div>
                <div className='info'>
                    <div className='details'>
                        <strong>Name:{data.Name}</strong><br />
                        <small>Application Number:{value1}</small><br />
                        <small>STATUS:<span className='stat'>{data.status}</span></small>
                    </div>
                </div>
        </>
      );
    });
  function signout() {
      localStorage.setItem('ApplicantNum', '');
      localStorage.setItem('LoggedIn', 'false');
  }
  return (
    <React.Fragment>
    <div className='scho-info'>
    {profile}
    </div>
<div className='navbar'>

            <div className='navsec'>
                <ul>
                    <Link to='/home' className='link'>HOME</Link>
                    <Link to='/account' className='link'>ACCOUNTS</Link>
                    <Link to='/scholar' className='link'>
                    <div className="dropdown">
                    <Link to='/scholar' className='droptbn' style={{color: 'white', textDecoration: 'none'}}>SCHOLAR</Link>
                    <div className="dropdown-content">
                     <Link to='/scholar' className='a'>Document</Link>
                     <Link to='/scholar/info' className='a'>Information</Link>
                    </div>
                    </div>
                      </Link>
                     <Link to='/news' className='link'>NEWS</Link>
                     <Link to='/announcement' className='link'>ANNOUNCEMENT</Link>
                     <Link to='/trivia' className='link'>TRIVIA</Link>
                     <Link to='/' onClick={signout} className='link'>LOGOUT</Link>
                </ul>
            </div>
    </div>


    </React.Fragment>
  )
}

export default Navbar