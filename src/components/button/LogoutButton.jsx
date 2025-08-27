import React from 'react'
import './button.css'
import axios from '../../config/axiosConfig'
import { useNavigate } from 'react-router-dom'
function LogoutButton() {
    const navigate = useNavigate()

    async function logoutHandler(){
        try {
            await axios.get('/logout')
            navigate('/')
        } catch (error) {
            navigate('/adminProfile')
        }
    }

  return (
    <>
        <button className='logoutBtn' onClick={logoutHandler}>Logout</button>
    </>
  )
}

export default LogoutButton