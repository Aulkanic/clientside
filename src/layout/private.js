import React, { useCallback,useEffect,useState } from 'react';
import { Link, Navigate, Outlet } from 'react-router-dom';
import { RouteUrl } from '../routes/routes';
import _ from 'lodash';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../Redux/loginSlice';
import { FaHome } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";
import { FetchNotif,ReadNotifi } from '../Api/request';
import { HiClipboardDocumentList } from "react-icons/hi2";
import { FaRegCalendarAlt } from "react-icons/fa";
import { ImNewspaper } from "react-icons/im";
import { TfiAnnouncement } from "react-icons/tfi";
import { GiGiftOfKnowledge } from "react-icons/gi";
import { IoNotifications } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import MYDO from '../Images/mydo.png';
import formatTimeDifference from '../helper/formatTimeDiff';
import Popover from '@mui/material/Popover';
import Badge from '@mui/material/Badge';


export default function Private(){
    const dispatch = useDispatch();
    const user = useSelector((state) => state.login);
    const applicantNum = user.info.applicantNum;
    const [notification,setNotification] = useState([])
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
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
        <div key={index} onClick={() => SetReadNotif(data)} className='w-full flex overflow-x-hidden flex-wrap gap-2 p-2 hover:bg-gray-300 rounded-lg cursor-pointer hover:transition-all text-sm'>
          <div className='w-16'>
          <img className='w-full object-contain'
          src={MYDO} alt="" />
          </div>
          <div className='w-18'>
            <p className='truncate'>{data.title}</p>
            {content}
          <div className=' flex gap-2 justify-start items-center'>
            <p className={data.remarks === 'unread' ? 'unreadnotif' : 'none'}>{formatTimeDifference(formattedDate)}</p>
            {data.remarks === 'unread' && (<div className='mt-1'>
                        <div className='bg-blue-400 w-4 h-4 rounded-full'></div>
              </div>)}
          </div>
          </div>
        </div>
      )
    })
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = async() => {
      setAnchorEl(null);
    };
    const SetReadNotif = async(val) =>{
      const formData = new FormData();
      formData.append('notifId',val.id)
      formData.append('applicantNum',applicantNum)
      await ReadNotifi.READ_NOTIFICATION(formData)
      .then((response)=>{
        const rev = response.data
        setNotification(rev.reverse());
        })
    }
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined
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
            <div className='flex-1'>
             <GiHamburgerMenu className={clsx(
                'sm:flex',
                'md:hidden lg:hidden text-3xl ml-4 cursor-pointer'
              )}
              onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
            </div>
            <div className='flex-1 flex gap-4 justify-end items-center'>
              <div className=''>
                <Badge 
                  badgeContent={notification?.filter((data) => data.remarks === 'unread').length} 
                  color="error"
                  onClick={handleClick}

                >
                  <button className=''
                    onClick={handleClick}
                  >
                  <IoNotifications className={clsx(open ? 'text-blueish text-3xl' : 'text-3xl')} />
                  </button>
                </Badge>
                <Popover
                  id={id}
                  open={open}
                  anchorReference="anchorPosition"
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  anchorPosition={{ top: 80, left: 1100 }}
                >
                  {notification ? (
                    <div className='w-max h-96 overflow-y-auto p-4'>
                      <h1 className='text-black font-semibold text-lg'>Notification</h1>
                      {notifList}
                    </div>
                  ) : null}
                </Popover>
              </div>

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