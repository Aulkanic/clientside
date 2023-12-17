import React from 'react'
import { FetchingNews } from '../../Api/request';
import './news.css';
import Homepage from '../components/Homepage'
import { Box, Divider, Modal, Typography,Button} from "@mui/material";
import Card from '@mui/material/Card';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useState } from 'react';

const News = () => {
  const [post, setPost] = React.useState([]);
  const [activeState,setActiveState] = useState('News')
  const [newsDetails,setNewDetails] = useState([]);
  React.useEffect(() => {
   FetchingNews.FETCH_NEWS().then((response) => {
        const news = response.data.News
      setPost(news.reverse());
    });
  }, []);

  const tabschange = (data) =>{
    setNewDetails(data)
    setActiveState(activeState === 'News' ? 'NewsHead' : 'News');
  }

  const latest = post.length > 0 ? [post[0]] : [];
  const newslist = post.slice(1);
  return (
    <>
  {activeState === 'News' && <div className='newsec'>
    {post.length > 0 ? (
    <div className='w-full flex flex-col md:flex-row gap-2'>
      <div className='w-full md:w-1/2 flex flex-col gap-2'>
        <h1 className='text-2xl font-bold'>Latest News</h1>
        <Card className='w-full p-2 flex flex-col gap-2'>
            <Typography sx={{fontSize:'27px',fontWeight:'700'}}>{latest[0].title}</Typography>
            <Typography className='italic'>{latest[0].date}</Typography>
        </Card>
        <div className='w-full h-max'>
          <img src={latest[0].picture} alt="" />
        </div>
        <div className='w-full bg-white p-2'>
            <Typography>{latest[0].description}</Typography>
        </div>
      </div>
      <div className='w-full md:w-1/2 flex flex-col gap-2'>
        <h2 className='text-2xl font-bold'>Recent News</h2>
          { newslist?.map((data,index) =>{
              return(
                <div key={index} className='flex w-full h-40 bg-white rounded-md gap-2 p-2'>
                    <div className='w-2/5'>
                    <img style={{width:'100%',height:'100%'}} src={data.picture} alt="" />
                    </div>
                    <div className='w-2/3 h-full overflow-hidden'>
                    <div className='w-full h-4/5 overflow-hidden'>
                    <Typography className='font-bold'>{data.title}</Typography>
                    <Typography className='italic'>{data.date}</Typography>
                    <Typography>{data.description}</Typography>
                    </div>
                    <div>
                      <Button onClick={() =>tabschange(data)} sx={{color:'blue',fontSize:'12px'}}>Read more</Button>
                    </div>
                    </div>
                </div>
              )
          })
          }
      </div>
    </div>) : (
    <div className='ncard'>
      <p className='NoNews'>No News Available</p>
    </div>)}
  </div>}
  {activeState === 'NewsHead' &&
    <>
    <div style={{margin:'15px 0px 0px 30px'}}>
      <button onClick={tabschange} className='myButton2'><ArrowBackIosNewIcon/>Back</button>
    </div>
    <div style={{width:'100%',height:'85%',padding:'30px 30px 100px 30px'}}>
      <Card sx={{width:'97%',padding:'15px'}}>
        <div style={{display:'flex',alignItems:'center'}}>
          <CalendarMonthIcon/>
          <p> {newsDetails.date}</p>
        </div>
        <div>
          <h2><b>{newsDetails.title}</b></h2>
        </div>
        <div>
          <p>{newsDetails.description}</p>
        </div>
        <div style={{width:'100%'}}>
          <img style={{width:'95%',margin:'15px'}} src={newsDetails.picture}/>
        </div>
      </Card>
    </div>
    </>
    }
    </>
  )
}

export default News