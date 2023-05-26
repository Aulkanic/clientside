import React from 'react'
import axios from "axios";
import './news.css';
import Homepage from '../components/Homepage'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../../features/authenticate/authSlice'

const baseURL = "http://localhost:3006/api/v1/news/newsinfo";


const News = () => {
  const token = useSelector(selectCurrentToken)
  const [post, setPost] = React.useState([]);

  React.useEffect(() => {
    axios.get(baseURL,
      {
        responseType: 'json',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }
      ).then((response) => {
        console.log(response)
        const news = response.data.News
      setPost(news.reverse());
    });
  }, []);
  
console.log(post)
  const newsList = post?.map((contact) => {

    return (
    <div className='newses' key={contact.id}>
      <div className="pictit">
      <img src={contact.picture} alt="" />
      </div>
      <div className="desdat">
        <div className='ntitle'><h3>{contact.title}</h3></div>
        <div className='ndate'><h6>{contact.date}</h6></div>
        <div className='ndes'>{contact.description}</div>
      </div>
    </div>
    );
  });
console.log(post)
  return (
    <>
        <Homepage/>
  <div className='newsec'>
    <h1 className='newsheader'>MARISKO NEWS</h1>
    {post.length > 0 ? (<div className='ncard'>
        {newsList}
    </div>) : (
    <div className='ncard'>
      <p className='NoNews'>No News Available</p>
    </div>)}
  </div>
    </>
  )
}

export default News