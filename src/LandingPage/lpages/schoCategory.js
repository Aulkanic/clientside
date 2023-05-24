import React from 'react'
import LHeader from '../components/header'
import '../css/schoCategory.css'
import axios from "axios";
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

function SchoCategory() {
  const [post, setPost] = React.useState([]);
  
  React.useEffect(() => {
    axios.get(`http://localhost:3006/api/v1/scholar/schoCat`,
      {
        responseType: 'json',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }
      ).then((response) => {
        console.log(response)
      setPost(response.data.SchoCat);
    });
  }, []);
  

  const schoCat = post?.map((contact, index) => {
    return (
      <div className='grid-container'>
    <div className='schoCat' key={index}>
      <div className="schoIcon">
      <img src={contact.icon} alt="" />
      </div>
      <div className="schoDet">
        <div className='ntitle'><h4>{contact.name}</h4></div>
        <div className='ndate'><h6>{contact.description}</h6></div>
        {contact.status === 'open' ? (<Button variant="contained"><Link className='linkingscho' to='/Scho1' >{contact.status}</Link></Button>) :
          (<Button sx={{color:'red'}} variant="contained" disabled>{contact.status}</Button>)}
      </div>
    </div>
    {(index + 1) % 2 === 0 && <br />}
    </div>
    );
  });
  
  return (
    <>
    <LHeader/>
    <h1 className='schohp'>Scholarship Program</h1>
    <div className='lschoCat'>
        {schoCat}
    </div>
    </>
  )
}

export default SchoCategory