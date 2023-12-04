import React, { useCallback,useEffect,useState } from 'react';
import { Link, Navigate, Outlet } from 'react-router-dom';
import { RouteUrl } from '../routes/routes';
import _ from 'lodash';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../Redux/loginSlice';
import { FaHome } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";
import { FetchNotif } from '../Api/request';
import { HiClipboardDocumentList } from "react-icons/hi2";
import { FaRegCalendarAlt } from "react-icons/fa";
import { ImNewspaper } from "react-icons/im";
import { TfiAnnouncement } from "react-icons/tfi";
import { GiGiftOfKnowledge } from "react-icons/gi";
import { IoNotifications } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import MYDO from '../Images/mydo.png';
import formatTimeDifference from '../helper/formatTimeDiff';


export default function Private(){
    const dispatch = useDispatch();
    const user = useSelector((state) => state.login);
    const [notification,setNotification] = useState([])
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [selectedMenu,setSelectedMenu] = useState({
        id:0
    })
    const links = [
      {
        id:0,
        name:'Home',
        url: RouteUrl.DASHBOARD,
        icon: <FaHome />
      },
      {
        id:1,
        name:'Profile',
        url: RouteUrl.PROFILE,
        icon: <MdManageAccounts />
      },
      {
        id:2,
        name:'Requirements',
        url: RouteUrl.SCHOLAR_REQUIREMENT,
        icon: <HiClipboardDocumentList />
      },
      {
        id:3,
        name:'Appointment',
        url: RouteUrl.SCHOLAR_APPOINTMENT,
        icon: <FaRegCalendarAlt />
      },
      {
        id:4,
        name:'News',
        url: RouteUrl.NEWS,
        icon: <ImNewspaper />
      },
      {
        id:5,
        name:'Announcement',
        url: RouteUrl.ANNOUNCEMENT,
        icon: <TfiAnnouncement />
      },
      {
        id:6,
        name:'Trivia',
        url: RouteUrl.TRIVIA,
        icon: <GiGiftOfKnowledge />
      }
    ]
    useEffect(() =>{
      async function Fetch(){
          const applicantNum = user.info.applicantNum;
          const res = await FetchNotif.FETCH_NOTIF(applicantNum)
          setNotification(res.data.reverse())
      }
      Fetch()
      const intervalId = setInterval(Fetch, 5000);
      return () => {
        clearInterval(intervalId);
      };
    },[notification])
    const onSelectedMenu = useCallback((item) => {
        setSelectedMenu({ ...item });
      }, []);

    const logOut = () => {
        dispatch(signOut());
      };
    const notifList = notification?.map((data,index) =>{
      const rawDate = data.date.replace("at", ""); 
      const formattedDate = new Date(rawDate);        
      let content;
      if(data.content.length <= 30){
        content = <p className='truncated-text'>{data.content}</p>
      }else{
        const truncated = data.content.substring(0, 30) + '...';
        content = <p className='truncated-text'>{truncated}</p>
      }
      return (
        <div key={index} className='notifcontainer'>
          <img src={MYDO} alt="" />
          <div style={{display:'flex',flexDirection:'column'}}>
          <p style={{
            fontWeight:'700',
            margin:'0'
          }}>{data.title}</p>
          {content}
          <div style={{display:'flex',position:'relative'}}>
          <p className={data.remarks === 'unread' ? 'unreadnotif' : 'none'}>{formatTimeDifference(formattedDate)}</p>
          {data.remarks === 'unread' && (<div className='rightnotif'>
                      <div className='circle'></div>
            </div>)}
          </div>

          </div>
        </div>
      )
    })
    return (
      <div className="flex w-screen border-black">
        {/* Sidebar */}
        <div className={clsx(
          isSidebarOpen ? 'block' : 'hidden',
          'md:block md:basis-1/5 bg-gray-600 h-screen text-white flex flex-col justify-between'
        )}>
          <div className="w-160 min-w-120">
            <div className="w-120 min-w-120 p-5 bg-gray-500">
              <div className='w-40 h-20 pb-2'>
              <img className='w-full h-full '
              src={MYDO} 
              alt="" />
              </div>
              <p className='m-none text-xs truncate'>MARILAO YOUTH DEVELOPMENT OFFICE</p>
              <p>BATCH {user.info.Batch}</p>
            </div>
            <div className="bg-white h-[1px]"></div>
            <div className="flex flex-col w-full py-2 px-4">
              {links.map((link, idx) => (
                <div
                  className={clsx(
                    'p-3 w-full flex items-center gap-3 truncate transition-all duration-300',
                    selectedMenu?.id === link.id ? 'bg-gray-300 text-[#043F97] rounded-md text-xl font-semibold leading-5' : 'font-light',
                  )}
                  key={idx}
                >
                  {link.icon}
                  <Link
                    key={idx}
                    to={link.url}
                    onClick={() => onSelectedMenu(link)}
                  >
                    {link.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={logOut}
            />
          </div>
        </div>
        {/* Body */}
        <div className="flex h-screen flex-1 w-screen flex-col pt-32 relative">
          <nav className="bg-gray-700 text-white absolute w-full h-24 top-0 flex truncate justify-between items-center">
            <div>
             <GiHamburgerMenu className={clsx(
                'sm:flex',
                'md:hidden lg:hidden text-3xl ml-4 cursor-pointer'
              )}
              onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
            </div>
            <div className='w-1/2 md:w-max lg:w-max flex gap-2 justify-end items-center'>
              <button className=''>
              <IoNotifications className='text-3xl' />
              </button>
              <div className='flex items-center justify-between'>
                <div className='mr-2 w-12 h-12'>
                  <img className='w-full h-full rounded-full bg-white object-contain mr-2'
                  src={user.info.profile || MYDO} 
                  alt="" />
                </div>
                <div className='hidden md:flex flex-col mr-4'>
                    <p className='font-bold text m-0'>{user.info.Name}</p>
                    <p className='text-slate-300 text-sm m-0 truncate'><strong>Status:</strong> {user.info.remarks}</p>
                </div>
              </div>
            </div>
          </nav>
          <div className="md:p-4 md:ml-4 overflow-y-auto">
            <Outlet />
          </div>
        </div>
      </div>        
    )

}