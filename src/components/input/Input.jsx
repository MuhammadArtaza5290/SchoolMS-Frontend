import React from 'react'
import './input.css'
function Input({type, onchange, placeholder, value, name, autocomplete}) {
  return (
    <input type={type} placeholder={placeholder} name={name} autoComplete={autocomplete} value={value} onChange={onchange}/>
  )
}

export default Input