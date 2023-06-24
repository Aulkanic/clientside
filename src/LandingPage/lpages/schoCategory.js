import React from 'react'
import LHeader from '../components/header'
import '../css/schoCategory.css'
import { ScholarCategory } from '../../Api/request.js'
import axios from "axios";
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

function SchoCategory() {
  const [post, setPost] = React.useState([]);
  
  React.useEffect(() => {
    ScholarCategory.ScholarshipProgram().then((res) =>{
      console.log(res.data)
      setPost(res.data.SchoCat);
    })
  }, []);

  const schoCat = post?.map((contact, index) => {
    return (
      <>
      {contact.status === 'Under Evaluation' ? (null) : (<div className='grid-container'>
    <div className='schoCat' key={index}>
      <div className="schoIcon">
      <img src={contact.icon} alt="" />
      </div>
      <div className="schoDet">
        <div className='ntitle'><h4>{contact.name}</h4></div>
        <div className='ndate'><h6>{contact.description}</h6></div>
        {contact.status === 'open' || contact.status === 'Open' ? (<Button variant="contained"><Link className='linkingscho' to='/register' >{contact.status}</Link></Button>)
        : (<Button variant="contained" disabled><Link className='linkingscho' >{contact.status}</Link></Button>)}
      </div>
    </div>
    {(index + 1) % 2 === 0 && <br />}
    </div>)}
    </>
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