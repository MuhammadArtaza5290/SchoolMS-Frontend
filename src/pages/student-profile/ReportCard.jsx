import React, {useState, useEffect} from 'react'
import { Outlet } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from '../../config/axiosConfig'
function ReportCard() {
  const navigate = useNavigate()
  const {studentId} = useParams();
  const[card, setCard] = useState()
  useEffect(()=>{
    async function fetchReports (){
      try {
        let response = await axios.get(`/marks/allreports/${studentId}`)
      setCard(response.data)
      
      } catch (error) {
       console.log(error);
        
      }
    }
    fetchReports()
  }, [])
  return (
    <>
     <div className="teacherview-container">
        <div className="teacherHeading">
          <h1>All Reports</h1>
        </div>

        <div className="teacher-card-wrapper">
          {card?.length > 0 ? (
              card?.map((val, index)=>{
            return(
              <div className="teacher-card" key={index}>
            <div className="teacher-img">
              <img
                src={`${val.marksheet[0].studentId.image}`}
                alt="Teacher"
              />
            </div>
            <div className="teacher-info">
              <h3>{val.marksheet[0].studentId.name}</h3>
              <p>{val.date}</p>
              <p> Student of {val.marksheet[0].studentId.classname}</p>
              <button
                className="print-btn"
                style={{ marginTop: "10px" }}
                onClick={() =>
                  navigate(`/studentProfile/viewreport/${val.marksheet[0].studentId._id}/${val._id}`)
                }
              >
                View ReportCard
              </button>
            </div>
          </div>
            )
          })
          ): (
            <div>
              <h1 style={{color: '#2c3e50'}}>No Report Added Yet ...</h1>
            </div>
          )}
        
        </div>
      </div>
    </>
  )
}

export default ReportCard