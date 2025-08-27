import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../config/axiosConfig";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Marks() {
  const { classname } = useParams();
  const [classStudent, setClassStudent] = useState();
  const [marks, setMarks] = useState({});

  const marksSchema = Yup.object().shape({
    english: Yup.number()
      .typeError("English marks must be a number")
      .required("English marks required")
      .positive("Marks must be a positive number")
      .max(100, "English marks cannot be more than 100"),
    urdu: Yup.number()
      .typeError("Urdu marks must be a number")
      .positive("Marks must be a positive number")
      .required("Urdu marks required")
      .max(100, "Urdu marks cannot be more than 100"),
    math: Yup.number()
      .typeError("Math marks must be a number")
      .positive("Marks must be a positive number")
      .required("Math marks required")
      .max(100, "Math marks cannot be more than 100"),
    science: Yup.number()
      .typeError("Science marks must be a number")
      .positive("Marks must be a positive number")
      .required("Science marks required")
      .max(100, "Science marks cannot be more than 100"),
  });

  const style = {
    width: "30%",
  };
  useEffect(() => {
    async function fetchStudent() {
      try {
        let response = await axios.get(`/marks/classStudent/${classname}`);
        setClassStudent(response.data.classStudent.student);
      } catch (error) {
        console.log(error);
      }
    }
    fetchStudent();
  }, []);

  async function submitHandler(e) {
    e.preventDefault();
    try {
      for (let student of classStudent) {
        let studentMarks = marks[student._id];

        await marksSchema.validate(studentMarks, { abortEarly: false });
      }
      let data = classStudent.map((val) => ({
        studentId: val._id,
        marks: marks[val._id],
        classname: val.classname,
      }));
      let res = await axios.post("/marks/marksheet", data);
      if (res) {
        setMarks({});
      }
    } catch (err) {
      if (err.inner) {
        err.inner.forEach((e) => toast.error(e.message));
      } else {
        toast.error("Validation failed!");
      }
    }
  }

  return (
    <>
      <div className="attendence-container marks-sheet">
        <h2
          style={{ color: "black", textAlign: "center", marginBottom: "7px" }}
        >
          Marks Sheet
        </h2>
        <table className={`attendance-table`}>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Student Name</th>
              <th>English</th>
              <th>Urdu</th>
              <th>Math</th>
              <th>Science</th>
            </tr>
          </thead>
          <tbody>
            {classStudent?.map((val, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{val.name}</td>
                  <td>
                    <Input type="number"
                      value={marks[val._id]?.english || ""}
                      onchange={(e) =>
                        setMarks((prev) => ({
                          ...prev,
                          [val._id]: {
                            ...prev[val._id],
                            english: e.target.value,
                          },
                        }))
                      }
                    />
                  </td>
                  <td>
                    <Input type="number"
                      value={marks[val._id]?.urdu || ""}
                      onchange={(e) =>
                        setMarks((prev) => ({
                          ...prev,
                          [val._id]: { ...prev[val._id], urdu: e.target.value },
                        }))
                      }
                    />
                  </td>
                  <td>
                    <Input type="number"
                      value={marks[val._id]?.math || ""}
                      onchange={(e) =>
                        setMarks((prev) => ({
                          ...prev,
                          [val._id]: { ...prev[val._id], math: e.target.value },
                        }))
                      }
                    />
                  </td>
                  <td>
                    <Input type="number"
                      value={marks[val._id]?.science || ""}
                      onchange={(e) =>
                        setMarks((prev) => ({
                          ...prev,
                          [val._id]: {
                            ...prev[val._id],
                            science: e.target.value,
                          },
                        }))
                      }
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div
          style={{
            width: "100%",
            height: "60px",
            textAlign: "center",
            marginTop: "10px",
          }}
        >
          <Button text="submit" styles={style} onclick={submitHandler} />
        </div>
      </div>
      <ToastContainer/>
    </>
  );
}

export default Marks;
