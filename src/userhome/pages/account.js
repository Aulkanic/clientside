import React from 'react'
import './account.css'
import Homepage from '../components/Homepage'
import Image from '../assets/default-profile-picture1.jpg'
import { Link } from 'react-router-dom'
import { FetchingPersonal,FetchingProfileUser } from '../../Api/request'
import {useState, useEffect } from 'react'



const Account = () => {
  const [post, setPost] = useState([]);
  const [picture, setProfile] = React.useState([]);
  const data = localStorage.getItem('ApplicantNum');
  const data1 = localStorage.getItem('ApplicantionNumber');

  useEffect(() => {
    FetchingPersonal.FETCH_PERSONA(data).then((response) => {
      setPost(response.data); 
    });
  });

  useEffect(() => {
    FetchingProfileUser.FETCH_PROFILEUSER(data).then((response) => {
      console.log(response)
      setProfile(response.data.Profile);   
      
    });
  },[]);

  const profile = picture?.map((data) =>{
    return (
      <>
         <img src={data.profile} alt='' />
      </>
    );
  });
  const details = picture?.map((data) =>{
    return (
      <>
        <th>Status</th>
        <td>{data.status}</td>
      </>
    )
  })
  const email = picture?.map((data) =>{
    return (
      <>
        <p><strong>Email:</strong>{data.email}</p>
      </>
    )
  })
  return (
    <>

      <Homepage/>
      <div className='acard'>
    <div className='profile-card'>
        <div className="prof-pic">
          <div className='prof-img'>
              {profile}
              <div>
              <Link to='/ChangeProfile'className='changeprof'>Change Profile</Link>
              </div>
             
          </div>
          <div className='prof-det'>
            <div className='prof-email'>
              {email}
            </div>
            <div className='prof-password'>
             <Link to='/ChangePassword'> <button>Change Password</button></Link>
            </div>
          </div>
        </div>
        <div className="prof-accs">
          <table>
          <tr>
            <th>Application Number</th>
            <td>{data1}</td>
            </tr>
            <tr>
            <th>Name</th>
            <td>{post.FirstName} {post.MiddleName} {post.LastName}</td>
            </tr>
            <tr>
            <th>Age</th>
            <td>{post.Age}</td>
            </tr>
            <tr>
            <th>Address</th>
            <td>{post.CurrentAddress}</td>
            </tr>
            <tr>
            <th>Contact Number</th>
            <td>{post.Contact}</td>
            </tr>
            <tr>
            {details}
            </tr>
          </table>
        </div>
    </div>
    </div>


    </>
  )
}

export default Account