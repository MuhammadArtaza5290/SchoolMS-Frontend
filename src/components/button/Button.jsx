import React from 'react'
import './button.css'
function Button({text, onclick, styles}) {
  return (
    <>
    <button className='btn' type='submit' onClick={onclick} style={styles}>{text}</button>
    </>
  )
}

export default Button