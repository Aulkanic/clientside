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
      <Box key={index}>
        <Card>
      <div className="announcements">
      <div className='anntitle'><h3>{data.title}</h3></div>
      <div className='anndate'>{data.date}</div>
      <div className='anncontent'>{data.content}</div>
      </div>
      </Card>
      </Box>
    );
  });
  return (
    <>
    <div className='anncard'>
      <div className='annhead'><p>ANNOUNCEMENT</p><span><img src={Announceimg} alt="" /></span></div>
      {anno.length > 0 ? (<div className='anncontent'>
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