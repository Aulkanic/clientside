
import './Home.css'
import Homepage from '../components/Homepage'
import { useSelector } from 'react-redux'
import { selectCurrentUser, selectCurrentToken } from '../../features/authenticate/authSlice'
import { Link } from 'react-router-dom'
const Home = () => {
    // const user = useSelector(selectCurrentUser)
    // const token = useSelector(selectCurrentToken)
    // const tokenAbbr = `${token.slice(0,9)}...`

    const content = (
      <>
      <Homepage/>
      <div className='hcard'>
      <div className="grad">
      <h2 className="text-title">FINANCIAL ASSISTANCE FOR ISKOLAR NG BAYAN NG MARILAO</h2>
      <p className="text-box">
  
      </p>
    </div>
      </div>
      </>
    )
  return content
}

export default Home
