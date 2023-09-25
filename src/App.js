import Bmccsite from './LandingPage/lpages/Bmccsite'
import StepContext from './LandingPage/ApplicationgFrm/StepContext';
import SchoCategory from './LandingPage/lpages/schoCategory';
import Home from './userhome/pages/Home'
import Account from './userhome/pages/account';
import SCHOLAR from './userhome/pages/scholar';
import Schoinfo from './userhome/pages/scho-info';
import PageNotFound from './userhome/pages/PagenotFound';
import NoInternet from './userhome/pages/NoInternet';
import News from './userhome/pages/news';
import Announcement from './userhome/pages/announcement';
import Trivia from './userhome/pages/trivia';
import Login from './userhome/pages/login';
import Register from './userhome/pages/register'
import { Route, Routes, useNavigate} from 'react-router-dom';
import RequireAuth from './features/authenticate/RequireAuth';
import { Colorlist,WebImg,Logos } from './Api/request'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor} from './Redux/store';
import { useEffect } from 'react';
import { createContext } from 'react';
import { useState } from 'react';
import Renewal from './LandingPage/Renewal/renewal';
import LoopingRhombusesSpinner from './userhome/loadingDesign/loading'


export const color = createContext();
function App() {
  const navigate = useNavigate();
  const isOnline = navigator.onLine;
  const colorstore = JSON.parse(localStorage.getItem('Color'));
  const imgstore = JSON.parse(localStorage.getItem('Image'));
  const logostore = JSON.parse(localStorage.getItem('Logo'));
  const [colorlist, setColorcode] = useState(colorstore || null);
  const [imgList,setImglist] = useState(imgstore || null);
  const [logolist,setLogolist] = useState(logostore || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOnline) {
      navigate('/no-internet');
    }
  }, [isOnline, navigate]);

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
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <color.Provider value={{ colorlist,imgList,logolist }}>
    <Routes> 
         <Route exact path='/' element={<Bmccsite/>}/>
         <Route path='/ScholarshipProgram' element={<SchoCategory/>}/>
         <Route path='/login' element={<Login/>}/>
         <Route path='/register' element={<Register/>}/>
         <Route path='/ApplicationForm' element={<StepContext/>}/>
         <Route path='/no-internet' element={<NoInternet/>}/>
         <Route path="/404" element={<PageNotFound />} />
         <Route path="/Renewal" element={<Renewal />} />
         <Route path="*" element={<PageNotFound />} />

        {/* Protective Route*/}

       <Route element={<RequireAuth/>}>
            <Route path='/home' element={<Home/>}/>
            <Route path='/account' element={<Account/>}/>
            <Route path='/scholar' element={<SCHOLAR/>}/>
            <Route path='/scholar/info' element={<Schoinfo/>}/>
            <Route path='/news' element={<News/>}/>
            <Route path='/announcement' element={<Announcement/>}/>
            <Route path='/trivia' element={<Trivia/>}/>
        </Route>

    </Routes>  
    </color.Provider>
    </PersistGate>
    </Provider>
      </>
  );
}

export default App;
