import React, { useEffect, useState } from 'react'
import { NewsAndAnnouncement,FetchingUserappoint,Rulelist,FetchRenewal } from '../../../Api/request'
import CustomSlider from '../../../Components/Slider/slider';
import Mydo from  '../../../Images/mydo.png'
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import MYDO_Calendar from '../../../Components/Calendar/calendar';
import VerticalStepper from '../../../Components/Stepper/vertical';
import { convertToPesos } from '../../../helper/convertPesos';

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
  const user = useSelector((state) => state.login);
  const status = user.info.status === 'For Evaluation' ? 0 
                : user.info.status === 'Assessment' ? 1
                : user.info.status === 'Qualified' ? 2
                : 3;
  const [newsAnnounce,setNewsAnnouncement] = useState([]);
  const [appointments,setAppointment] = useState([]);
  const [rule,setRule] = useState([]);
  const [priviledge,setPriviledge] = useState(0);
  const [renewal,setRenewal] = useState([])

  useEffect(() =>{
    async function Fetch(){
      const applicantNum = user.info.applicantNum
      let res = await NewsAndAnnouncement.NEWS_ANNOUNCE();
      let res1 = await FetchingUserappoint.FETCH_USERAPPOINTMENT(applicantNum);
      let res2 = await Rulelist.FETCH_RULE();
      let res3 = await FetchRenewal.FETCH_RENEW();
      const datapp = res1.data.results?.map((data) =>{
        const schedStart = `${data.schedDate} ${data.timeStart}`;
        const schedEnd = `${data.schedDate} ${data.timeEnd}`;
        return({
          title:data.Reason,
          start: new Date(schedStart),
          end: new Date(schedEnd)
        })
      })
      res.data.forEach(item => {
        item.date = new Date(item.date);
      });
      res.data.sort((a,b) => b.date - a.date)
      const rules = res2.data.result;
      const ruling = rules ? (await convertToPesos(Number(user.info.yearLevel === 'Elementary' ? rules[0].priv1
                     : user.info.yearLevel === 'College' ? rules[0].priv3
                     : rules[0].priv2) * 10)) : 0;
      setPriviledge(ruling)
      setRenewal(res3.data.list[0]);
      setRule(res2.data.result[0])
      setAppointment(datapp)
      setNewsAnnouncement(res.data)
    }
    Fetch()
  },[])

  const isRenewalForm = () =>{
    let details;
    if(renewal){
        const Deadline = new Date(renewal?.deadline);
        const today = new Date()
        if(Deadline < today){
            details = 1
        }else{
            details =2 
        }
    }else{
        details= 0
    }
    return details
  };
const isOpen = isRenewalForm();
const date = new Date(renewal.deadline)
const formattedDate = date.toLocaleString('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
});
  return (
    <div className='sm:w-[350px] md:w-[450px] lg:w-[800px] xl:w-[1100px] flex flex-col'>
      <div className={clsx(
        newsAnnounce.length === 0 ? 'animate-pulse' : '',
        'bg-white p-2 rounded-lg')}>
        <h1 className='sm:text-base md:text-xl lg:text-3xl font-bold'>Latest News/Announcement</h1>
          {newsAnnounce.length > 0 ? (
          <CustomSlider settings={settings}>
            {newsAnnounce?.map((data, index) => {
              return(
              <div key={index} className='m-2 rounded-tr-md rounded-tl-md'>
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
      <div className='flex flex-wrap flex-col md:flex-row h-96 mt-8'>
        <div className='sm:w-full md:w-4/6 h-auto bg-white p-4 rounded-lg'>
          <h1 className='text-3xl font-semibold'>Appointment Schedule</h1>
          <MYDO_Calendar
            appointments={appointments}
          />
        </div>
        <div className='sm:w-full md:w-2/6 h-auto bg-white p-4'>
          
          {status !== 3 ? (
          <>
          <h1 className='text-lg font-semibold'>Your Application Progress for Scholarship Program</h1>
          <VerticalStepper 
          step={status}
          />
          </>) : (
            <>
            <div className=''>
              <h1 className='bg-blueish text-white p-4 rounded-xl'>Scholarship Benefits: {priviledge}</h1>
            </div>
            <div className='mt-8'>
              {isOpen === 2 ? (
                <div className='m-2 p-2 pt-8 rounded-lg relative shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset]'>
                  <p className='absolute text-white font-bold bg-rose-600 w-max p-2 rounded-xl text-sm -right-8 -top-2'>Important!</p>
                  <h1 className='text-lg font-semibold'>Renewal for your Scholarship is now happening!</h1>
                  <p>Please update your information and submit needed requirement</p>
                  <p className='italic text-sm'>Deadline: {formattedDate}</p>
                </div>
              ) : (null)}
            </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
