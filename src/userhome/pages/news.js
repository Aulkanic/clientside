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
        <Homepage/>
  {activeState === 'News' && <div className='newsec'>
    {post.length > 0 ? (
    <div className='ncard'>
      <div className='latestnews'>
        <h1 style={{margin:'5px'}}>Latest News</h1>
        <Card sx={{width:'95%',display:'flex',justifyContent:'space-between',padding:'0px 10px 0px 10px',alignItems:'center'}}>
            <Typography sx={{fontSize:'27px',fontWeight:'700'}}>{latest[0].title}</Typography>
            <Typography>{latest[0].date}</Typography>
        </Card>
        <div className='imgnews'>
          <img src={latest[0].picture} alt="" />
        </div>
        <div>
          <Card sx={{width:'98%',padding:'10px',height:'200px',overflow:'auto'}}>
            <Typography>{latest[0].description}</Typography>
          </Card>
        </div>
      </div>
      <div className='news'>
        <h2 style={{margin:'5px'}}>Recent News</h2>
          { newslist?.map((data,index) =>{
              return(
                <div key={index} className='newscon'>
                <Card elevation={0} sx={{display:'flex',width:'97%',height:'100%',padding:'10px'}}>
                    <div style={{width:'45%',marginRight:'10px'}}>
                    <img style={{width:'100%',height:'100%'}} src={data.picture} alt="" />
                    </div>
                    <div style={{width:'45%',marginRight:'10px',height:'100%',overflow:'hidden'}}>
                    <div style={{width:'100%',marginRight:'10px',height:'80%',overflow:'hidden'}}>
                    <Typography>{data.title}</Typography>
                    <Typography>{data.date}</Typography>
                    <Typography>{data.description}</Typography>
                    </div>
                    <div>
                      <Button onClick={() =>tabschange(data)} sx={{color:'blue',fontSize:'12px'}}>Read more</Button>
                    </div>
                    </div>
                  </Card>
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
      <Button onClick={tabschange} sx={{color:'white'}} className='myButton2'><ArrowBackIosNewIcon/>Back</Button>
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