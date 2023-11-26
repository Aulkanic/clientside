import React, { useEffect, useState } from 'react'
import { NewsAndAnnouncement } from '../../../Api/request'
import CustomSlider from '../../../Components/Slider/slider';
import Mydo from  '../../../Images/mydo.png'

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    lazyLoad: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        }
      },
    ]
  };

export const Dashboard = () => {
  const [newsAnnounce,setNewsAnnouncement] = useState([])

  useEffect(() =>{
    async function Fetch(){
      let res = await NewsAndAnnouncement.NEWS_ANNOUNCE()
      res.data.forEach(item => {
        item.date = new Date(item.date);
      });
      res.data.sort((a,b) => b.date - a.date)
      setNewsAnnouncement(res.data)
    }
    Fetch()
  },[])

  return (
    <div className='sm:w-[350px] md:w-[450px] lg:w-[800px] xl:w-[1100px] flex flex-col'>
      <div>
        <h1 className='sm:text-base md:text-xl lg:text-3xl font-bold'>Latest News/Announcement</h1>
          {newsAnnounce.length > 0 ? (
          <CustomSlider settings={settings}>
            {newsAnnounce?.map((data, index) => {
              return(
              <div key={index} className='m-2 border-2 border-gray-800 rounded-tr-md rounded-tl-md'>
                <img className='w-full h-32 rounded-tr-md rounded-tl-md bg-gray-400' 
                src={data.picture || Mydo} alt=""/>
                <div className='bg-white h-12 p-2'>
                  <h3 className='truncate hover:text-clip'>{data.title}</h3>
                </div>
              </div>
            )})}
          </CustomSlider>
        ) : (
          <p>No news or announcements available.</p>
        )}
      </div>
      <div className='flex flex-wrap h-96 mt-8'>
        <div className='sm:w-full md:w-4/6 h-auto bg-white'>

        </div>
        <div className='sm:w-full md:w-2/6 h-auto bg-black'>
          
        </div>
      </div>
    </div>
  )
}
