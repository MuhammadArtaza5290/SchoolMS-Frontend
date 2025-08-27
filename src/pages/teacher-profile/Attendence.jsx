import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from '../../config/axiosConfig';
import './teacherProfile.css'
import Button from '../../components/button/Button';

function Attendence() {
  const style ={
    width: '30%',
  }
  const {classname} = useParams();
  const [classStudent, setClassStudent] = useState()
  const [status, setStatus] = useState({})
  useEffect(()=>{
   async function fetchStudent(){
      try {
        let response = await axios.get(`/class/classStudents/${classname}`)
        setClassStudent(response.data.students.student)
        
      } catch (error) {
        console.log(error);
        
      }
    }
    fetchStudent()
  },[])
  async function submitHandler(e){
    e.preventDefault()
    let data = classStudent.map((val)=>({
      studentId: val._id,
      status: status[val._id],
      classname: val.classname

    }))
    try {
        let response = await axios.post('/attendence/studentattendence', data)
        setStatus({})
    } catch (error) {
      console.log(error);
      
    }
    
    
  }
  return (
    <>
     <div className="attendence-container">
      <h2 style={{color: 'black', textAlign: 'center', marginBottom: '7px'}}>Attendance</h2>
      <table className={`attendance-table`}>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Student Name</th>
            <th>Present</th>
            <th>Absent</th>
            <th>Leave</th>
          </tr>
        </thead>
        <tbody>
          {classStudent?.map((val, index)=>{
            return(
              <tr className={status[val._id]} key={index}>
            <td>{index + 1}</td>
            <td>{val.name}</td>
            <td>
              <input
                type="radio"
                 name={`attend-${val._id}`}
                value='present'
                checked={status[val._id] === 'present'}
                onChange={() => setStatus(prev => ({ ...prev, [val._id]: 'present' }))}
              />
            </td>
            <td>
              <input
                type="radio"
                 name={`attend-${val._id}`}
                value='absent'
                checked={status[val._id] === 'absent'}
                onChange={() => setStatus(prev => ({ ...prev, [val._id]: 'absent' }))}
              />
            </td>
            <td>
              <input
                type="radio"
                 name={`attend-${val._id}`}
                value='leave'
                checked={status[val._id] === 'leave'}
                onChange={() => setStatus(prev => ({ ...prev, [val._id]: 'leave' }))}
              />
            </td>
          </tr>
            )
          })}
        </tbody>
      </table>
      <div style={{width:'100%', height: '60px', textAlign: 'center', marginTop: '10px'}}>
        <Button text='submit' styles={style} onclick={submitHandler}/>
      </div>
    </div>
    </>
  )
}

export default Attendence