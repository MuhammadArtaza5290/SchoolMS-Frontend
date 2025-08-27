import React, { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import "./viewReport.css";
import axios from "../../config/axiosConfig";
import { useParams } from "react-router-dom";
import lightlogo from "../../assets/lightLogo.png";
function ViewReport() {
  const {studentId, marksId} = useParams()
  const [data, setData] = useState()
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
  contentRef: componentRef,  // 👈 yahan contentRef likhna hai
});
  useEffect(()=>{
    async function fetchStudentData(){
      try {
        let response = await axios.get(`/marks/reportData/${studentId}/${marksId}`)
        setData(response.data)
        
      } catch (error) {
        console.log(error);
        
      }
    }
    fetchStudentData()
  },[])

  return (
    <>
      <div className="main-reportContainer">
        <div className="reportCard" ref={componentRef}>
          <div className="reportlogo">
            <img className="navImage" src={lightlogo} alt="" />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: "2px",
              }}
            >
              <h2 style={{ color: "aliceblue", fontSize: "30px" }}>
                CRESTFIELD
              </h2>
              <h5 style={{ color: "aliceblue" }}>INTERNATIONAL SCHOOL</h5>
            </div>
          </div>
          {data?.report.marksheet?.length > 0 && (
          <div className="datacontainer">
            <div className="student-img">
              <img
                src={`${data.report.marksheet[0]?.studentId.image}`}
                alt="Teacher"
              />
            </div>
            <div className="studentdata">
              <h3>Name: {data?.report.marksheet[0]?.studentId.name} </h3>
              <h3>FatherName: {data?.report.marksheet[0]?.studentId.fathername} </h3>
              <h3>Class: {data?.report.marksheet[0]?.studentId.classname} </h3>
              <h3>Email: {data?.report.marksheet[0]?.studentId.email} </h3>
            </div>
          </div>
          )}
          <div className="marksdata">
            <table className={`attendance-table`}>
              <thead>
                <tr>
                  <th>Subjects</th>
                  <th>Total Marks</th>
                  <th>Obt. Marks</th>
                  <th>Percentage</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>English</th>
                  <td>100</td>
                  <td>{data?.report.marksheet[0].marks?.english}</td>
                  <td>{data?.engPercentage}%</td>
                  <td>{data?.engGrade}</td>
                </tr>
                <tr>
                  <th>Urdu</th>
                  <td>100</td>
                  <td>{data?.report.marksheet[0].marks?.urdu}</td>
                  <td>{ data?.urduPercentage}%</td>
                  <td>{data?.urduGrade}</td>
                </tr>
                <tr>
                  <th>Math</th>
                  <td>100</td>
                  <td>{data?.report.marksheet[0].marks?.math}</td>
                  <td>{data?.mathPercentage}%</td>
                  <td>{data?.mathGrade}</td>
                </tr>
                <tr>
                  <th>Science</th>
                  <td>100</td>
                  <td>{data?.report.marksheet[0].marks?.science}</td>
                  <td>{data?.sciPercentage}%</td>
                  <td>{data?.sciGrade}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="finalRemarks">
            <h4>Attendence is: {data?.attendPercentage.toFixed(2)}%</h4>
            <h4 style={{marginTop: '8px'}}>You got 400/{data?.total} marks</h4>
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
      <button
        onClick={handlePrint}
        className="print-btn"
      >
        Download PDF
      </button>
    </div>

      </div>
    </>
  );
}

export default ViewReport;
