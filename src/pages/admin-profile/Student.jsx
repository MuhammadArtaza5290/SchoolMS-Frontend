import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "../../config/axiosConfig";

function Student() {
  let [student, setStudent] = useState([]);
  

  useEffect(() => {
    async function fetchTeacher() {
      try {
        let res = await axios.get("/viewstudent");
        setStudent(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchTeacher();
  }, []);

  
  return (
    <>
      <div className="teacherview-container">
        <div className="teacherHeading">
          <h1>All Students</h1>
        </div>
        <div className="teacher-card-wrapper">
          {student.length > 0 ? (
            student.map((val, index) => {
              return (
                <div className="teacher-card" key={index}>
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
              <h1 style={{color: '#2c3e50'}}>No Student Added Yet ...</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Student;
