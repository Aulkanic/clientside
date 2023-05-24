import React from 'react'
import Mainpage from './Mainpage'
import Header from './BMCC-headlay'
import Footerlayout from './Footerlay'
const Homepage = () => {
  return (
    <React.Fragment>
      <Header/>
      <Mainpage/>
      <Footerlayout/>
    </React.Fragment>
  )
}

export default Homepage