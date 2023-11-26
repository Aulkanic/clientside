import Bmccsite from './LandingPage/lpages/Bmccsite'
import StepContext from './LandingPage/ApplicationgFrm/StepContext';
import SchoCategory from './LandingPage/lpages/schoCategory';
import Home1 from './userhome/pages/Home'
import Account from './userhome/pages/account';
import SCHOLAR from './userhome/pages/scholar';
import Schoinfo from './userhome/pages/scho-info';
import PageNotFound from './userhome/pages/PagenotFound';
import NoInternet from './userhome/pages/NoInternet';
import News1 from './userhome/pages/news';
import Announcement1 from './userhome/pages/announcement';
import Trivia1 from './userhome/pages/trivia';
import Login1 from './userhome/pages/login';
import Register from './userhome/pages/register'
import { Route, Routes, createBrowserRouter, useNavigate, RouterProvider} from 'react-router-dom';
import RequireAuth from './features/authenticate/RequireAuth';
import { Colorlist,WebImg,Logos } from './Api/request'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor} from './Redux/store';
import { useEffect } from 'react';
import { createContext } from 'react';
import { useState } from 'react';
import DownloadLink from './userhome/pages/marisko';
import Renewal1 from './LandingPage/Renewal/renewal';
import { RouteUrl } from './routes/routes';
import { Public,Private } from './layout';
import { Home,Login,Registration,ApplicationForm,ScholarshipProgram,
         Dashboard,Profile,Requirements,Appointment,Announcement,News,Trivia,Renewal } from '../src/Pages';
import './App.css'
import LoopingRhombusesSpinner from './userhome/loadingDesign/loading'


export const color = createContext();
function App() {
  const colorstore = JSON.parse(localStorage.getItem('Color'));
  const imgstore = JSON.parse(localStorage.getItem('Image'));
  const logostore = JSON.parse(localStorage.getItem('Logo'));
  const [colorlist, setColorcode] = useState(colorstore || null);
  const [imgList,setImglist] = useState(imgstore || null);
  const [logolist,setLogolist] = useState(logostore || null);
  const [loading, setLoading] = useState(false);
  const router = createBrowserRouter([
    {
      path: RouteUrl.HOME,
      element: <Public/>,
      children: [
        {
          path: RouteUrl.HOME,
          element: <Home />
        },
        {
          path: RouteUrl.LOGIN,
          element: <Login />
        },
        {
          path: RouteUrl.APPLICATION_FORM,
          element: <ApplicationForm/>
        },
        {
          path: RouteUrl.REGISTER,
          element: <Registration />
        },
        {
          path: RouteUrl.SCHOLARSHIP_PROGRAM,
          element: <ScholarshipProgram />
        }
      ]
    },
    {
      path: RouteUrl.HOME,
      element: <Private />,
      children: [
        {
          path: RouteUrl.DASHBOARD,
          element: <Dashboard />
        },
        {
          path: RouteUrl.PROFILE,
          element: <Profile />
        },
        {
          path: RouteUrl.SCHOLAR_REQUIREMENT,
          element: <Requirements />
        },
        {
          path: RouteUrl.SCHOLAR_APPOINTMENT,
          element: <Appointment />
        },
        {
          path: RouteUrl.NEWS,
          element: <News />
        },
        {
          path: RouteUrl.ANNOUNCEMENT,
          element: <Announcement />
        },
        {
          path: RouteUrl.TRIVIA,
          element: <Trivia />
        },
        {
          path: RouteUrl.RENEWAL_FORM,
          element: <Renewal />
        }
      ]
    }
  ])

  // useEffect(() => {
  //   if (!isOnline) {
  //     navigate('/no-internet');
  //   }
  // }, [isOnline, navigate]);

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

    <RouterProvider router={router} fallbackElement={<h6>Loading...</h6>} />
    </color.Provider>
    </PersistGate>
    </Provider>
      </>
  );
}

export default App;


{/* <Routes> 
<Route exact path='/' element={<Bmccsite/>}/>
<Route path='/ScholarshipProgram' element={<SchoCategory/>}/>
<Route path='/login' element={<Login1/>}/>
<Route path='/register' element={<Register/>}/>
<Route path='/ApplicationForm' element={<StepContext/>}/>
<Route path='/no-internet' element={<NoInternet/>}/>
<Route path="/404" element={<PageNotFound />} />
<Route path="/Renewal" element={<Renewal1 />} />
<Route path="/MariskoApp" element={<DownloadLink />} />
<Route path="*" element={<PageNotFound />} />


<Route element={<RequireAuth/>}>
   <Route path='/home' element={<Home1/>}/>
   <Route path='/account' element={<Account/>}/>
   <Route path='/scholar' element={<SCHOLAR/>}/>
   <Route path='/scholar/info' element={<Schoinfo/>}/>
   <Route path='/news' element={<News1/>}/>
   <Route path='/announcement' element={<Announcement1/>}/>
   <Route path='/trivia' element={<Trivia1/>}/>
</Route>

</Routes>   */}