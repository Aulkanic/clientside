import LandingPage from '.././src/LandingPage/lpages/lhomepage'
import LAbout from '.././src/LandingPage/lpages/about'
import LContact from '.././src/LandingPage/lpages/contact'
import LScholarship from '.././src/LandingPage/lpages/scholarship'
import LFAQs from '.././src/LandingPage/lpages/faqs'
import StepContext from './LandingPage/ApplicationgFrm/StepContext';
import SchoCategory from './LandingPage/lpages/schoCategory';
import Lnewexspage from './LandingPage/lpages/new-exspage'
import Home from './userhome/pages/Home'
import Account from './userhome/pages/account';
import ChangeProfile from './userhome/actions/changeProfile';
import ChangePassword from './userhome/actions/changePassword';
import SCHOLAR from './userhome/pages/scholar';
import Schoinfo from './userhome/pages/scho-info';
import News from './userhome/pages/news';
import Announcement from './userhome/pages/announcement';
import Trivia from './userhome/pages/trivia';
import Login from './userhome/pages/login';
import Register from './userhome/pages/register'
import FlippableCard from './Experiment/card/flippable-card'
import { Route, Routes} from 'react-router-dom';
import RequireAuth from './features/authenticate/RequireAuth';
import { io } from "socket.io-client";
import { Colorlist,WebImg,Logos } from './Api/request'
import { useEffect } from 'react'
import { createContext } from 'react';
import { useState } from 'react'
import LoopingRhombusesSpinner
 from './userhome/loadingDesign/loading'
export const color = createContext();

function App() {
  const colorstore = JSON.parse(localStorage.getItem('Color'));
  const imgstore = JSON.parse(localStorage.getItem('Image'));
  const logostore = JSON.parse(localStorage.getItem('Logo'));
  const [colorlist, setColorcode] = useState(colorstore || null);
  const [imgList,setImglist] = useState(imgstore || null);
  const [logolist,setLogolist] = useState(logostore || null);
  const [loading, setLoading] = useState(false);

  useEffect(() =>{
    async function Fetch(){
      try {
        setLoading(true);
        const res = await Colorlist.FETCH_COLOR();
        const img = await WebImg.FETCH_WEB();
        const req = await Logos.LOGOS()
        setImglist(img.data.result);
        setColorcode(res.data.result);
        setLogolist(req.data.result)
        setLoading(false);
        localStorage.setItem('Image', JSON.stringify(img.data.result));
        localStorage.setItem('Logo', JSON.stringify(req.data.result));
        localStorage.setItem('Color', JSON.stringify(res.data.result));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    Fetch()
  },[])

  

  if (loading) {
    return (
      <div style={{ width: '100vw', height: '100vh' }}>
        <LoopingRhombusesSpinner />
      </div>
    );
  }

  return (
    <>
    <color.Provider value={{ colorlist,imgList,logolist }}>
    <Routes> 

      {/* <Route path='/' element={<Layout/>}/>
       <Route index element={<Login/>}/> */}
         <Route exact path='/' element={<LandingPage/>}/>
         <Route path='/About' element={<LAbout/>}/>
         <Route path='/Contact' element={<LContact/>}/>
         <Route path='/Scholarship' element={<LScholarship/>}/>
         <Route path='/FAQs' element={<LFAQs/>}/>
         <Route path='/ScholarshipProgram' element={<SchoCategory/>}/>
         <Route path='/Scho1' element={<Lnewexspage/>}/>
         <Route path='/login' element={<Login/>}/>
         <Route path='/register' element={<Register/>}/>
         <Route path='/ApplicationForm' element={<StepContext/>}/>
         <Route path='/Experiment' element={<FlippableCard/>}/>

         
        {/* Protective Route*/}

       <Route element={<RequireAuth/>}>
            <Route path='/home' element={<Home/>}/>
            <Route path='/account' element={<Account/>}/>
            <Route path='/ChangeProfile' element={<ChangeProfile/>}/>
            <Route path='/ChangePassword' element={<ChangePassword/>}/>
            <Route path='/scholar' element={<SCHOLAR/>}/>
            <Route path='/scholar/info' element={<Schoinfo/>}/>
            <Route path='/news' element={<News/>}/>
            <Route path='/announcement' element={<Announcement/>}/>
            <Route path='/trivia' element={<Trivia/>}/>
        </Route>

    </Routes>  
    </color.Provider>
      </>
  );
}

export default App;
