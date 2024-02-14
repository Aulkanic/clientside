import React, { useCallback,useEffect,useState } from 'react';
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { RouteUrl } from '../routes/routes';
import _ from 'lodash';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../Redux/loginSlice';
import { FaHome } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";
import { FetchNotif,ReadNotifi,FetchingBmccSchoinfo,FetchingProfileUser } from '../Api/request';
import { HiClipboardDocumentList } from "react-icons/hi2";
import { MdNotificationsActive } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import { ImNewspaper } from "react-icons/im";
import { TfiAnnouncement } from "react-icons/tfi";
import { GiGiftOfKnowledge } from "react-icons/gi";
import { IoNotifications } from "react-icons/io5";
import { FaWpforms } from "react-icons/fa6";
import { BsCashCoin } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import MYDO from '../Images/mydo.png';
import formatTimeDifference from '../helper/formatTimeDiff';
import Popover from '@mui/material/Popover';
import Badge from '@mui/material/Badge';
import { updateInfo } from '../Redux/loginSlice';
import { CiLogout } from "react-icons/ci";
import { Logoutuser } from '../Api/request';

export default function Private(){
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const user = useSelector((state) => state.login);
    const userDet = user.info;
    const applicantNum = user.info?.applicantNum;
    const [notification,setNotification] = useState([])
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [isRequesting, setIsRequesting] = useState(false);
    const [selectedMenu,setSelectedMenu] = useState({
        id:0
    })
    const links = userDet?.status === 'Approved' ? [
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
        name:'Renewal',
        url: RouteUrl.RENEWAL_FORM,
        icon: <FaWpforms />
      },
      {
        id:5,
        name:'Payout',
        url: RouteUrl.PAYOUT,
        icon: <BsCashCoin />
      },
      {
        id:6,
        name:'News',
        url: RouteUrl.NEWS,
        icon: <ImNewspaper />
      },
      {
        id:7,
        name:'Announcement',
        url: RouteUrl.ANNOUNCEMENT,
        icon: <TfiAnnouncement />
      },
      {
        id:8,
        name:'Trivia',
        url: RouteUrl.TRIVIA,
        icon: <GiGiftOfKnowledge />
      }
    ] : [
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
      async function fetchData(){
        if (isRequesting) {
          return; 
        }
        setIsRequesting(true); 
        try {
          const res = await FetchNotif.FETCH_NOTIF(applicantNum);
          const profileUserResponse = await FetchingProfileUser.FETCH_PROFILEUSER(applicantNum);
          const val = profileUserResponse.data.Profile;
          if(val){
            dispatch(updateInfo({ key: 'remarks', value: val[0].remarks }));
            dispatch(updateInfo({ key: 'status', value: val[0].status }));
            if (val[0].status === 'Approved') {
              const res1 = await FetchingBmccSchoinfo.FETCH_SCHOLARSINFO(applicantNum);
              const val1 = res1.data.ScholarInf.results1;
              dispatch(updateInfo({ key: 'scholarCode', value: val1[0].scholarCode }));
            }
          }

          setNotification(res.data.reverse());
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setIsRequesting(false); 
        }
      }
  
      fetchData();
  
      // const intervalId = setInterval(fetchData, 5000);
  
      // return () => {
      //   clearInterval(intervalId);
      // };
    },[notification, applicantNum, dispatch, isRequesting,userDet])

    const onSelectedMenu = useCallback((item) => {
        setSelectedMenu({ ...item });
      }, []);
    const logOut = async() => {
      const formData = new FormData();
      formData.append('applicantNum',applicantNum)
        await Logoutuser.USER_LOGOUT(formData)
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
      if(val.remarks === 'unread'){
        const formData = new FormData();
        formData.append('notifId',val.id)
        formData.append('applicantNum',applicantNum)
        await ReadNotifi.READ_NOTIFICATION(formData)
        .then((response)=>{
          const rev = response.data
          setNotification(rev.reverse());
          navigate(`/dashboard/${val.link}`)
          })
      }else{
        navigate(`/dashboard/${val.link}`)
      }

    }
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined
    return _.isNil(user?.info && applicantNum) ? (
      <Navigate replace to={'/login'} />
    ) : (
      <div className="flex w-screen border-black">
        {/* Sidebar */}
        <div className={clsx(
          isSidebarOpen ? 'block' : 'hidden',
          'md:block md:basis-1/5 relative bg-blueish h-screen text-white flex flex-col justify-between'
        )}>
          <div className="w-160 min-w-120">
            <div className="w-120 min-w-120 p-5 bg-blueish00">
              <div className='w-40 h-20 pb-2'>
              <img className='w-full h-full '
              src={MYDO} 
              alt="" />
              </div>
              <p className='m-none text-xs truncate'>MARILAO YOUTH DEVELOPMENT OFFICE</p>
              <p>Academic Year: {userDet.academicYear}</p>
            </div>
            <div className="bg-white h-[1px]"></div>
            <div className="flex flex-col w-full py-2 px-4">
              {links.map((link, idx) => (
                <div
                  className={clsx(
                    'p-3 w-full flex items-center gap-3 truncate transition-all duration-300',
                    selectedMenu?.id === link.id ? 'bg-blueish00 text-white rounded-md text-xl font-semibold leading-5' : 'font-light',
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
          <div className="absolute bottom-0 bg-blueish00 w-full h-10 flex justify-center font-bold items-center">
            <button onClick={logOut} className='flex items-center justify-center gap-2 w-max -ml-4'>
            <CiLogout /> <p>Logout</p>
            </button>
          </div>
        </div>
        {/* Body */}
        <div className="flex h-screen flex-1 w-screen flex-col pt-32 relative">
          <nav className="bg-blueish text-white absolute w-full h-24 top-0 flex truncate justify-between items-center">
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
                  className={clsx(open ? 'animate-bounce text-3xl' : 'text-3xl')}
                >
                  <button className=''
                    onClick={handleClick}
                  >
                  {!open && <IoNotifications className={clsx(open ? 'text-white text-3xl' : 'text-3xl')} />}
                  {open && <MdNotificationsActive className={clsx(open ? 'text-white text-3xl' : 'text-3xl')} />}
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
                    <div className='w-full md:w-96 h-96 overflow-y-auto p-4'>
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
                    <p className='font-bold text m-0'>{userDet.Name}</p>
                    <p className='text-slate-300 text-sm m-0 truncate'><strong>Status:</strong> {userDet.remarks}</p>
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