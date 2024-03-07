import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { motion } from "framer-motion";
import MYDO from '../../Images/mydo.jpg'
import BMCC from '../../Images/logo.png'
import Municipal from '../../userhome/assets/municipal.jpg'
import clsx from 'clsx';

export default function CustomNavbar() {
  const [currentDateTime, setCurrentDateTime] = useState(moment().format('MMMM Do YYYY, h:mm:ss a'));
  const [hoveredLink, setHoveredLink] = useState(null);
  const links = [
    {id:1,label:'Home',url:'/',child:['Home MYDO','About MYDO']},
    {id:2,label:'Services',url:'/',child:['Scholarship Program','YORP Registration','Sangguniang Kabataan']},
    {id:3,label:'Resources',url:'/',child:['Scholarship Forms','Files']},
    {id:4,label:'Officials',url:'/',child:['MYDO Officials','SK Officials']},
    {id:5,label:'Sign in',url:'/',child:['Login as Scholars','Login as YORP']},
  ]
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(moment().format('MMMM Do YYYY, h:mm:ss a'));
    }, 1000);
    
    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleLinkHover = (id) => {
    console.log(id)
    const keyId = id === hoveredLink ? 0 : id;
    setHoveredLink(keyId);
  }
  return (
    <div>
        <div className='w-screen h-[30px] bg-[#000AFF] text-white py-1 px-4'>
         <p className='text-sm'>{currentDateTime}</p>
        </div>
        <div className='h-[80px] w-screen bg-white px-2 flex flex-wrap items-center justify-between shadow-[0px_6px_5px_3px_#00000024] px-4'>
            <div className='w-[160px] h-full pt-2'>
            <img className='w-[150px] h-[55px] object-cover' src={MYDO} alt="" />
            </div>
            <div className='flex-1 flex flex-wrap justify-around px-8'>
            {links?.map((item,idx) =>(
                <motion.div className='relative h-max'
                >
                <div className={clsx(hoveredLink === item.id ? 'bg-[#000AFF] text-white' : 'bg-[#F4F4F4] text-sky-600','w-[109px] h-[35px] hover:bg-[#000AFF] cursor-pointer text-md ease-in-out duration-300  hover:text-white rounded-lg flex justify-center items-center font-semibold')}
                 onClick={() => handleLinkHover(item.id)}
                 key={idx}>
                    {item.label}
                </div>
                {hoveredLink === item.id && (
                    <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.3 }} 
                    className='absolute top-12 w-max h-max flex flex-col shadow-[0px_19px_11px_0px_#00000024]'
                    >
                    {item.child.map((val,idy) =>(
                        <p className='w-52 text-nowrap text-sm text-[#000AFF] bg-white hover:bg-[#000AFF] ease-in-out duration-300 text-sky-600 hover:text-white cursor-pointer p-2' key={idy}>{val}</p>
                    ))}
                    </motion.div>
                )}
                </motion.div>
            ))}
            </div>
            <div className='flex gap-2 w-[110px]'>
                <img className='w-[55px] h-[55px] rounded-full' src={BMCC} alt="" />
                <img className='w-[55px] h-[55px] rounded-full' src={Municipal} alt="" />
            </div>
        </div>
    </div>
  )
}
