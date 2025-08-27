import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from '../../config/axiosConfig'
function TeacherClass() {
  const navigate = useNavigate()
  const {teacherid} = useParams();
  const [teacherClass, setTeacherClass] = useState()
  useEffect(()=>{
    async function fetchClass(){
      try {
        let response = await axios.get(`/class/teacherclass/${teacherid}`)
        if (response) {
          setTeacherClass(response.data.teacherclass)
        }
        
        
      } catch (error) {
        console.log(error);
      }
      
    }
    fetchClass()
  },[])
  
  return (
    <>
    <div className="teacherview-container">
  <div className="teacherHeading">
    <h1>Class</h1>
  </div>

  {teacherClass?.teacher && (
    <div className="teacher-card-wrapper">
      <div className="teacher-card">
        <div className="teacher-img">
          <img
            src={`${teacherClass.teacher.image}`}
            alt="Teacher"
          />
        </div>
        <div className="teacher-info">
          <h3>{teacherClass.teacher.name}</h3>
          <p>{teacherClass.teacher.email}</p>
          <p> Incharge of {teacherClass.classname}</p>
          <button style={{marginTop: '10px' , backgroundColor: '#152259'}} onClick={()=> navigate(`/teacherProfile/classstudent/${teacherClass._id}`)}>View Students</button>
        </div>
      </div>
    </div>
  )}
</div>

    </>
  )
}

export default TeacherClass