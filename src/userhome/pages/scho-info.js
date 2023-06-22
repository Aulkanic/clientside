import React, { useEffect, useState } from 'react'
import './scho-info.css'
import  Homepage from '../components/Homepage'
import { FetchingApplicantsInfo, FetchingBmccSchoinfo, FetchingUserappoint } from '../../Api/request'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { styled } from '@mui/material/styles';
import { Tabs, Tab, Box, Modal, Card } from "@mui/material"; 
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';


const Schoinfo = () => {
    const data = localStorage.getItem('ApplicantNum');
      const [PA, setPA] = useState([]);
      var applicantNum = data;

      const [age, setAge] = useState('');
      const [contactNum, setContact] = useState('');
      const [caddress, setAddress] = useState('');
      const [loading, setLoading] = useState(false);
      const [appointuser,setAppointment] = useState([]);

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
  const stylediv = {
    width: '100%',
    fontSize:'20px',
    textAlign:'center'
  };
  useEffect(() => {
   FetchingApplicantsInfo.FETCH_INFO(applicantNum)
    .then((response) => {
        console.log(response.data)
      setPA(response.data.results);
  async function Fetch(){
    const response = await FetchingUserappoint.FETCH_USERAPPOINTMENT(applicantNum)
    console.log(response)
    setAppointment(response.data.results)
  }
  Fetch()
    });
  }, []);
  const formatDate = () => {
    const specificDate = new Date('2023-06-21');
    return specificDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

    const applicantdetails = appointuser?.map((data) =>{
        return (
            <>
     <Box sx={{ flexGrow: 1, display:'flex',justifyContent:'center',alignItems:'center' }}>
          <div className='appointlistcon'>
          <Card>
            <div className='appointscon'>
            <div className="calendar">
          <div className="text">
            <span>{formatDate()}</span>
          </div>
            </div>
            <div className='appointdetails'>
              <p>Agenda: {data.Reason}</p>
              <p>Location: {data.Location}</p>
              <p>Time Start: {data.timeStart}</p>
              <p>Time End: {data.timeEnd}</p>
            </div>
            </div>
          </Card>
          </div>
    </Box>           
            </>
        )
    })

  return (
    <>
        <Homepage/>
        <h1 className='appointheader'>Appointment Schedule</h1>
        <div className="contappoint">
        <div className='sicard'>
        {applicantdetails}
          </div>
          </div>
    </>
  )
}

export default Schoinfo