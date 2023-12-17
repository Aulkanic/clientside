import React from 'react'
import './announcement.css'
import Announceimg from '../assets/announce.png'
import Homepage from '../components/Homepage'
import { FetchingAnnouncement } from '../../Api/request'
import { Box, Modal} from "@mui/material";
import Card from '@mui/material/Card';

const Announcement = () => {
  const [anno, setAnnounced] = React.useState([]);

  React.useEffect(() => {
    FetchingAnnouncement.FETCH_ANNOUNCEMENT().then((response) => {
        const announce = response.data.Announce
      setAnnounced(announce.reverse());
    });
  }, []);
  const announced = anno.map((data,index) => {
    return (
      <div className="w-full md:1/2 bg-white p-2 ">
      <div className='font-bold text-xl '><h3>{data.title}</h3></div>
      <div className='italic text-base'>{data.date}</div>
      <div className='text-base'>{data.content}</div>
      </div>
    );
  });
  return (
    <>
    <div className='w-full p-4'>
      <div className='w-full flex justify-center items-center gap-4'>
        <p className='tracking-wider font-bold'>ANNOUNCEMENT</p>
        <span>
        <img className='w-20 h-16' src={Announceimg} alt="" />
        </span>
      </div>
      {anno.length > 0 ? (<div className='flex flex-wrap gap-2'>
      {announced}
      </div>) : (
      <div className='anncontent'>
        <p>No Announcement</p>
      </div>)}
    </div>
    </>
  )
}

export default Announcement