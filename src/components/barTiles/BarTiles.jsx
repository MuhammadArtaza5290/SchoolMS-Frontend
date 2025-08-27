import React from 'react'
import { NavLink } from 'react-router-dom'
import './BarTiles.css'
function BarTiles({link, text}) {
  return (
    <>
    <div className='tile'><NavLink to={link}>{text}</NavLink></div>
    </>
  )
}

export default BarTiles