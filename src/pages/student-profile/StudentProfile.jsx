import React,{useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import { useLocation } from 'react-router-dom';
import SlideShow from '../../components/slide-show/SlideShow';
import axios from '../../config/axiosConfig'
import Footer from '../../components/footer/Footer';
function StudentProfile() {
  const location = useLocation();
    let[user, setUser] = useState('')
    const navigate = useNavigate();
      useEffect(()=>{
         axios.get('/studentprofile')
        .then(res=>setUser(res.data))
        .catch((error)=>{
          const role = error.response.data.role;
          if (error.response.status === 403 && role === 'admin') {
            navigate('/adminProfile')
          }else if(error.response.status === 403 && role === 'teacher'){
            setUser('');
            navigate('/teacherProfile')
          }else if(error.response.status === 403 && role === 'student'){
          setUser('');
          navigate('/studentProfile')
        }else{
          setUser('')
          navigate('/')
        }
        })
        
      }, [location.pathname])  // line no 7,10,17 ko hum use krta han jab hum ny useEffect ko path ki location change hony pr rerender krana hota ha..
     const isMainPage = location.pathname === '/studentProfile'
     
  return (
    <>
   <div className="admin-container">
      <Navbar image={`${user.image}`} name={user.name} email={user.email} studentid={user._id} classname={user.classname} role={user.role} />
        <div className="page-content">
        {isMainPage && (
          <div style={{width: '100%', height: '100vh'}}>
            <SlideShow/>
          </div>
          )}
       <Outlet />
       </div>
       <Footer/>
    </div>
    </>
  )
}

export default StudentProfile