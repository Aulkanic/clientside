import React, { useState } from 'react'
import '../css/schoCategory.css'
import { ScholarCategory } from '../../Api/request.js'
import { setForm } from '../../Redux/formSlice.js';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import { useContext } from "react";
import { color } from "../../App";
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../Components/Button/button.jsx';
import dayjs from 'dayjs';

function SchoCategory() {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.form)
  const [post, setPost] = React.useState([]);
  const navigate = useNavigate()
  const { colorlist } = useContext(color);
  React.useEffect(() => {

    async function Fetch(){
      const req = await ScholarCategory.ScholarshipProgram()
      const list = req.data.SchoCat?.map((data) =>{
        const start = dayjs(data.startDate).format('MMMM DD, YYYY');
        const end = dayjs(data.endDate).format('MMMM DD, YYYY');
        return({
          ...data,
          startDate: start,
          endDate: end
        })
      })
      setPost(list)
    }
    Fetch()

  }, [post]);

  const setSchoforForm = (schoname) =>{
    localStorage.setItem('schoId',schoname)
    dispatch(setForm({ 'schoId': schoname}))
    navigate('/register')
  }

  const schoCat = post?.map((contact, index) => {
    return (
      <div key={index}>
      {contact.status === 'Under Evaluation' ? (null) : (<div className='grid-container'>
    <div className='schoCat'>
      <div className="schoIcon">
      <Avatar
        alt="Remy Sharp"
        src={contact.icon}
        sx={{ width: 56, height: 56 }}
      />
      </div>
      <div className="schoDet">
        <div className='text-lg font-bold'><h4>{contact.name}</h4></div>
        <div className='ndate'><h6>{contact.description}</h6></div>
        <div><p className='text-sm italic'>Start: {contact.startDate}</p></div>
        <div><p className='text-sm italic'>End: {contact.endDate}</p></div>
      </div>
      <div className='btncontainerscho'>
      {contact.status === 'open' || contact.status === 'Open' ? 
      (
        <CustomButton
          label={'Apply Now'}
          color={'blue'}
          loading={false}
          onClick={() =>setSchoforForm(contact.name)}
        />)
        : (
          <CustomButton
            label={contact.status}
            color={'gray'}
            loading={false}
            disabled={true}
            onClick={() =>setSchoforForm(contact.name)}
          />)}
      </div>
    </div>
    {(index + 1) % 2 === 0 && <br />}
    </div>)}
    </div>
    );
  });
  
  return (
    <>
    <div style={{width:'100%'}}>
    <h1 className='schohp' style={{backgroundColor:colorlist[0].bgColor,color:colorlist[0].bgColor1}}>Scholarship Program</h1>
    <div className='lschoCat'>
        {schoCat}
    </div>

    </div>
    </>
  )
}

export default SchoCategory