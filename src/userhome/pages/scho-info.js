import React, { useEffect, useState } from 'react'
import './scho-info.css'
import  Homepage from '../components/Homepage'
import { FetchingApplicantsInfo } from '../../Api/request'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Schoinfo = () => {
    const data = localStorage.getItem('ApplicantNum');
      const [PA, setPA] = useState([]);
      var applicantNum = data;

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
   FetchingApplicantsInfo.FETCH_INFO(applicantNum)
    .then((response) => {
        console.log(response.data)
      setPA(response.data.results);
    });
  }, []);
    console.log(PA)
    const applicantdetails = PA?.map((data) =>{
        return (
            <>
            
            </>
        )
    })
  return (
    <>
        <Homepage/>

    </>
  )
}

export default Schoinfo