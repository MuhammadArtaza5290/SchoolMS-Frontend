import React from 'react'
import './ClassCard.css';
function ClassCard({classname, onclick , teacher}) {
  return (
    <>
    <div className="class-card">
    <div className="card-content">
      <h2 className="class-title">{classname}</h2>
      <h3 className="teacher-name">Incharge: {teacher}</h3>
    </div>
    <button className="view-button" onClick={onclick}>View Class</button>
  </div>
    </>
  )
}

export default ClassCard