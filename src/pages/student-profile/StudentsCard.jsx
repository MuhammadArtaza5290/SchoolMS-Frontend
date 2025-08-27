import React, { useEffect, useState } from "react";
import axios from "../../config/axiosConfig";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function StudentsCard() {
  const navigate = useNavigate();
  const { studentId } = useParams();
  const [studentCard, setStudentCard] = useState();
  useEffect(() => {
    async function fetchStudent() {
      try {
        let response = await axios.get(`/singlestudent/${studentId}`);
        if (response) {
          setStudentCard(response.data.student);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchStudent();
  }, []);

  if (!studentCard) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <div className="teacherview-container">
        <div className="teacherHeading">
          <h1>Your Profile</h1>
        </div>

        <div className="teacher-card-wrapper">
          <div className="teacher-card">
            <div className="teacher-img">
              <img
                src={`${studentCard.image}`}
                alt="Teacher"
              />
            </div>
            <div className="teacher-info">
              <h3>{studentCard.name}</h3>
              <p>{studentCard.email}</p>
              <p> Student of {studentCard.classname}</p>
              <button
                className="print-btn"
                style={{ marginTop: "10px" }}
                onClick={() =>
                  navigate(`/studentProfile/reportcard/${studentCard._id}`)
                }
              >
                Report Cards
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentsCard;
