import React, { useEffect, useState } from 'react'
import './scho-info.css'
import  Homepage from '../components/Homepage'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Schoinfo = () => {
    const data = localStorage.getItem('ApplicantNum');
      const value = JSON.parse(data);
      const [PA, setPA] = useState([]);
      var applicantNum = value.ApplicantID;

      const [age, setAge] = useState('');
      const [contactNum, setContact] = useState('');
      const [caddress, setAddress] = useState('');
      const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  function UpdateSubmit(event){
      event.preventDefault();
      setLoading(true);
      axios.patch(`http://localhost:3006/api/v1/personalinfo/update`,{age,contactNum,caddress,applicantNum})
      .then(res => {
        setLoading(false);
        navigate('/account')
        
      }
       )
      .catch(err => console.log(err));
  }
  useEffect(() => {
    axios.get(`http://localhost:3006/api/v1/personalinfo/PA/${applicantNum}`,
      {
        responseType: 'json',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }
      ).then((response) => {
        console.log(response.data)
      setPA(response.data);
    });
  }, []);
    console.log(PA)
  return (
    <>
        <Homepage/>
    {!loading && <div className='sicard'>
        <p>Update Contact Information</p>
        <hr />
        <div className='container'>
            <div className='card-container'>
                <div className='header'>
                    <p>Personal Information</p>
                </div>
                <div className='content'>
                    <form  onSubmit={UpdateSubmit} action="">
                        <table>
                            <tr>
                                <th>First Name</th>
                                <td>{PA.FirstName} {PA.MiddleName}, {PA.LastName}</td>
                            </tr>
                            <tr>
                                <th>Age</th>
                                <td><input type="number" id='age' onChange={e=> setAge(e.target.value)} placeholder={PA.Age}/><br /></td>
                            </tr>
                            <tr>
                                <th>Nationality</th>
                                <td>Filipino</td>
                            </tr>
                            <tr>
                                <th>Birthday</th>
                                <td>March 31, 2002</td>
                            </tr>
                            <tr>
                                <th>Gender</th>
                                <td>Male</td>
                            </tr>
                            <tr>
                                <th>Place of Birth</th>
                                <td>Talibon Bohol</td>
                            </tr>
                            <tr>
                                <th>Phone Number</th>
                                <td> <input type="tel" id="contactNum" onChange={e=> setContact(e.target.value)} name="phone" placeholder={PA.Contact}/></td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td>michael@gmail.com</td>
                            </tr>
                            <tr>
                                <th>Address</th>
                                <td><input type="text" id='address' onChange={e=> setAddress(e.target.value)} value={caddress} placeholder={PA.CurrentAddress} /></td>
                            </tr>
 
                        </table>
                        <button className="button">UPDATE</button>
                    </form>
                </div>
            </div>
            <div className='card-container'>
            <div className='header'>
                   <p>Current School Attended Information</p> 
            </div> 
            <div className='content'>
                    <form action="">
                        <table>
                        <tr>
                            <th>School Name</th>
                            <td><input type="text" name="" id="" placeholder=' Pambayang Dalubhasaan ng Marilao' /></td>
                        </tr>
                        <tr>
                            <th>Type of School</th>
                            <td><input type="text" name="" id="" placeholder=' Public' /></td>
                        </tr>
                        <tr>
                            <th>School Address</th>
                            <td><input type="text" name="" id="" placeholder=' Abangan Norte Marilao, Bulacan' /></td>
                        </tr>
                        <tr>
                            <th>School Year</th>
                            <td><input type="text" name="" id="" placeholder=' 2020-2021' /></td>
                        </tr>
                        <tr>
                            <th>General Weighted Average</th>
                            <td><input type="text" name="" id="" placeholder='90' /></td>
                        </tr>
                        <tr>
                            <th>Certificate of Registration</th>
                            <td><input  type="file" name="" id=""/></td>
                        </tr>
                        <tr>
                            <th>Report Card</th>
                            <td><input  type="file" name="" id=""/></td>
                        </tr>
                        </table>
                        <button className="button">UPDATE</button>
                    </form>
                </div> 
            </div>
        </div>
    </div>
}
    </>
  )
}

export default Schoinfo