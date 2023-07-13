import React from 'react'
import { FetchingNews } from '../../Api/request';
import './news.css';
import Homepage from '../components/Homepage'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../../features/authenticate/authSlice'
import { Box, Divider, Modal, Typography} from "@mui/material";
import Card from '@mui/material/Card';

const News = () => {
  const token = useSelector(selectCurrentToken)
  const [post, setPost] = React.useState([]);

  React.useEffect(() => {
   FetchingNews.FETCH_NEWS().then((response) => {
        const news = response.data.News
      setPost(news.reverse());
    });
  }, []);

  const latest = post.length > 0 ? [post[0]] : [];
  const newslist = post.slice(1);
  console.log(latest)
  return (
    <>
        <Homepage/>
  <div className='newsec'>
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
          { newslist?.map((data) =>{
              return(
                <>
                <div className='newscon'>
                  <Card elevation={0} sx={{display:'flex',width:'97%',height:'100%',padding:'10px'}}>
                    <div style={{width:'45%',marginRight:'10px'}}>
                    <img style={{width:'100%',height:'100%'}} src={data.picture} alt="" />
                    </div>
                    <div style={{width:'45%',height:'100%',overflow:'hidden'}}>
                    <Typography>{data.title}</Typography>
                    <Typography>{data.date}</Typography>
                    <Typography>{data.description}</Typography>
                    </div>
                  </Card>
                </div>
                </>
              )
          })
          }
      </div>
    </div>) : (
    <div className='ncard'>
      <p className='NoNews'>No News Available</p>
    </div>)}
  </div>
    </>
  )
}

export default News