import React, { useEffect, useState } from 'react'
import '../css/navbar.css'
import {Link} from 'react-router-dom'
import { Colorlist } from '../../Api/request'

function Navbar() {
  const [colorlist,setColorlist] = useState([])

  useEffect(() =>{
    async function Fetch(){
      const res = await Colorlist.FETCH_COLOR()
      setColorlist(res.data.result[0])
    }
    Fetch()
  })
  return (
    <>
    <div style={{margin:'0px',width:'100%',height:'45px',backgroundColor: colorlist.bgColor1,fontFamily:'"Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'}}>
        <ul style={{display:'flex',listStyleType:'none',justifyContent:'space-around',alignItems:'center'}}>
            <li><Link style={{color:colorlist.bgColor,fontWeight:1000,textDecoration:'none'}} to='/'> HOME </Link></li>
            <li><Link style={{color:colorlist.bgColor,fontWeight:1000,textDecoration:'none'}} to='/About'> ABOUT </Link></li>
            <li><Link style={{color:colorlist.bgColor,fontWeight:1000,textDecoration:'none'}} to='/Contact'> CONTACT </Link></li>
            <li><Link style={{color:colorlist.bgColor,fontWeight:1000,textDecoration:'none'}} to='/Scholarship'> SCHOLARSHIP </Link></li>
            <li><Link style={{color:colorlist.bgColor,fontWeight:1000,textDecoration:'none'}} to='/FAQs'> FAQs </Link></li>
            <li><Link style={{color:colorlist.bgColor,fontWeight:1000,textDecoration:'none'}} to='/login'> SIGN-IN </Link></li>
        </ul>
    </div>
    </>
  )
}

export default Navbar