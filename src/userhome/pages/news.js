import React from 'react'
import { FetchingNews } from '../../Api/request';
import './news.css';
import Homepage from '../components/Homepage'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../../features/authenticate/authSlice'



const News = () => {
  const token = useSelector(selectCurrentToken)
  const [post, setPost] = React.useState([]);

  React.useEffect(() => {
   FetchingNews.FETCH_NEWS().then((response) => {
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