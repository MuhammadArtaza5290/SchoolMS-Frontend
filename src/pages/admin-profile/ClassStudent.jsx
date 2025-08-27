import React,{useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from 'react-router-dom';
import axios from '../../config/axiosConfig'
import { useNavigate } from 'react-router-dom';
function ClassStudent() {
    let navigate = useNavigate()
    let location = useLocation()
    let { classid } = useParams();
    let[studentData, setStudentData] = useState([]);
    let [refresh, setRefresh] = useState(false);
    
      function toogle() {
        setRefresh(!refresh);
      }

    useEffect(()=>{
       async function fetchStudent(){
      try {
         let response = await axios.get(`/class/classStudent/${classid}`)
         setStudentData(response.data)
      } catch (error) {
        console.log(error);
        
      }
        }
        fetchStudent()
    }, [classid, refresh])

    async function deleteHandler(userid) {
    try {
      const result = await axios.delete(`/deletestudent/${userid}`);
      if (result.data.success) {
        toogle();
      }
    } catch (error) {
      console.log(error);
    }
  }
   const isMainPage = location.pathname.includes(`/adminProfile/classstudent/`) 
  return (
    <>
    <div className="teacherview-container">
            <div className="teacherHeading">
              <h1>All Students</h1>
            </div>
            <div className="teacher-card-wrapper">
              {studentData.student?.length > 0 ? (
                studentData.student.map((val, index) => {
                  return (
                    <div className="teacher-card" key={index}>
                      {isMainPage && (<div className="card-actions">
                        <FontAwesomeIcon
                          icon={faEdit}
                          className="icon edit-icon"
                          title="Edit"
                           onClick={()=> navigate(`/adminProfile/editStudent/${val._id}`)}
                        />
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="icon delete-icon"
                          title="Delete"
                          onClick={()=> deleteHandler(val._id)}
                        />
                      </div>)}
                      <div className="teacher-img">
                        <img
                          src={`${val.image}`}
                          alt="Teacher"
                        />
                      </div>
                      <div className="teacher-info">
                        <h3>{val.name}</h3>
                        <p>{val.email}</p>
                        <p> Student of {val.classname}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div>
                  <h1 style={{color: '#2c3e50'}}>No Students Yet ...</h1>
                </div>
              )}
            </div>
          </div>
    </>
  )
}

export default ClassStudent