import React,{useEffect, useState} from 'react'
import './adminProfile.css'
import axios from '../../config/axiosConfig'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import { Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import SlideShow from '../../components/slide-show/SlideShow'
import Footer from '../../components/footer/Footer'

function AdminProfilee() {
  const location = useLocation();
  let[user, setUser] = useState('')
  const navigate = useNavigate();
    useEffect(()=>{
       axios.get('/adminprofile')
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
   const isMainPage = location.pathname === '/adminProfile'
  return (
    <>
    <div className="admin-container">
      <Navbar role={user.role} image={`${user.image}`} name={user.name} email={user.email}/>
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

export default AdminProfilee