import React, { useEffect } from 'react'
import './../css/mainpage.css'
import './../css/Navbar.css'
import Logo from './../assets/scholar.png'
import {Link} from 'react-router-dom'
import axios from 'axios'


const Navbar = () => {

    const data = localStorage.getItem('ApplicantNum');
    const value = JSON.parse(data);
    const [picture, setProfile] = React.useState([]);

    useEffect(() => {
      axios.get(`http://localhost:3006/api/v1/userProf/getPROFILE/${value.ApplicantID}`,
        {
          responseType: 'json',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        }
        ).then((response) => {

        setProfile(response.data.Profile);   
        
      });
    },[]);
  
    const profile = picture?.map((data) =>{
      return (
        <>
           <img src={data.profile} alt={Image} />
        </>
      );
    });
  function signout() {
      localStorage.setItem('ApplicantNum', '');
      localStorage.setItem('LoggedIn', 'false');
  }
  return (
    <React.Fragment>
    
    <div className='navbar'>
    <div className='scho-info'>
                <div className='profile'>
                  {profile}
                </div>
                <div className='info'>
                    <div className='details'>
                        <strong>{value.Name}</strong><br />
                        <small>Application Number:{value.ApplicationNumber}</small><br />
                        <small>STATUS:<span className='stat'>APPROVED</span></small>
                    </div>
                </div>
            </div>
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