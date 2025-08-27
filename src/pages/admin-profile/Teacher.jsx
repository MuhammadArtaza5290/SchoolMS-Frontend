import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "../../config/axiosConfig";
function Teacher() {
  let [teacher, setTeacher] = useState([]);
  let[refresh, setRefresh] = useState(false);
  let navigate = useNavigate();

  function toogle (){
    setRefresh(!refresh)
  }
   
  useEffect(() => {
    async function fetchTeacher() {
      try {
        let res = await axios.get("/viewteacher");
        setTeacher(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchTeacher();
  }, [refresh]);

  async function deleteHandler(userid){
    try {
      const result = await axios.delete(`/deleteteacher/${userid}`);
      if(result.data.success){
        toogle();
      }
    } catch (error) {
      console.log(error); 
    }
  }

  return (
    <>
      <div className="teacherview-container">
        <div className="teacherHeading">
          <h1>Teachers</h1>
        </div>
        <div className="teacher-card-wrapper">
          {teacher.length > 0 ? (
          teacher.map((val, index) => {
            return (
              <div className="teacher-card" key={index}>
                <div className="card-actions">
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="icon edit-icon"
                    title="Edit"
                    onClick={()=> navigate(`/adminProfile/editTeacher/${val._id}`)}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="icon delete-icon"
                    title="Delete"
                    onClick={()=> deleteHandler(val._id)}
                  />
                </div>
                <div className="teacher-img">
                  <img
                    src={`${val.image}`}
                    alt="Teacher"
                  />
                </div>
                <div className="teacher-info">
                  <h3>{val.name}</h3>
                  <p>{val.email}</p>
                  <p> Incharge of {val.classname}</p>
                </div>
              </div>
            );
          })) : (
            <div>
              <h1 style={{color: '#2c3e50'}}>No Teachers Add Yet ...</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Teacher;
