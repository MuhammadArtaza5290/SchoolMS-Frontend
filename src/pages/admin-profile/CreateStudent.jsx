import React, { useState } from "react";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import axios from "../../config/axiosConfig";
import * as Yup from 'yup'
import {toast, ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

function CreateStudent() {
  let [name, setName] = useState("");
  let [fathername, setFathername] = useState("");
  let [email, setEmail] = useState("");
  let [classname, setClassname] = useState("");
  let [role, setRole] = useState("");
  let [address, setAddress] = useState("");
  let [phone, setPhone] = useState("");
  let [password, setPassword] = useState("");
  let [image, setImage] = useState("");

  const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        fathername: Yup.string().required("FatherName is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        classname: Yup.string().required("Class is required"),
        role: Yup.string().required("Role is required"),
        address: Yup.string().required("Address is required"),
        phone: Yup.string()
          .matches(/^[0-9]{10,12}$/, "Phone must be 10–12 digits")
          .required("Phone is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
  })

  async function onClickHandler(e) {
    e.preventDefault();
    try {
      await validationSchema.validate({
        image, name,fathername, email, role, classname, phone, address, password
      }, {abortEarly: false})

    let formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("fathername", fathername);
    formData.append("email", email);
    formData.append("classname", classname);
    formData.append("role", role);
    formData.append("address", address);
    formData.append("phone", phone);
    formData.append("password", password);
    
      let response = await axios.post("/createstudent", formData);
      if (response) {
        toast.success("Student created successfully 🚀")
        setImage("");
        setName("");
        setFathername("");
        setEmail("");
        setClassname("");
        setRole("");
        setAddress("");
        setPhone("");
        setPassword("");
      }
    } catch (error) {
      if (error.inner) {
        error.inner.forEach((err) => toast.error(err.message));
      } else {
        toast.error("Error to creating student");
      }
    }
  }

  return (
    <>
      <div className="createTeacher-container">
        <div className="form-box">
          <h2 style={{ color: "black", fontSize: "40px", textAlign: "center" }}>
            Create Student
          </h2>
          <div className="inputTeacher-container">
            <Input
              type="file"
              name="image"
              onchange={(e) => setImage(e.target.files[0])}
            />
            <Input
              type="text"
              placeholder="Enter Name"
              name="name"
              value={name}
              className="input-field"
              onchange={(e) => setName(e.target.value)}
              autocomplete="off"
            />
            <Input
              type="text"
              placeholder="Enter Fathername"
              name="fathername"
              value={fathername}
              className="input-field"
              onchange={(e) => setFathername(e.target.value)}
              autocomplete="off"
            />
            <Input
              type="email"
              placeholder="Enter Email"
              name="email"
              value={email}
              className="input-field"
              onchange={(e) => setEmail(e.target.value)}
              autocomplete="off"
            />

            <select
              id="myDropdown"
              name="classname"
              value={classname}
              className="input-field"
              onChange={(e) => setClassname(e.target.value)}
            >
              <option value="">Select Class</option>
              <option value="class1">Class 1</option>
              <option value="class2">Class 2</option>
              <option value="class3">Class 3</option>
              <option value="class4">Class 4</option>
              <option value="class5">Class 5</option>
              <option value="class6">Class 6</option>
              <option value="class7">Class 7</option>
              <option value="class8">Class 8</option>
              <option value="class9">Class 9</option>
              <option value="class10">Class 10</option>
            </select>
            <select
              id="myDropdown"
              name="role"
              value={role}
              className="input-field"
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">Select Role</option>
              <option value="student">student</option>
            </select>

            <Input
              type="text"
              placeholder="Enter Address"
              value={address}
              name="address"
              className="input-field"
              onchange={(e) => setAddress(e.target.value)}
              autocomplete="off"
            />
            <Input
              type="text"
              placeholder="Enter Phone"
              value={phone}
              name="phone"
              className="input-field"
              onchange={(e) => setPhone(e.target.value)}
              autocomplete="off"
            />
            <Input
              type="password"
              placeholder="Enter Password"
              name="password"
              value={password}
              className="input-field"
              onchange={(e) => setPassword(e.target.value)}
              autocomplete="off"
            />
            <Button text="Create Teacher" onclick={onClickHandler} />
          </div>
        </div>
      </div>
      <ToastContainer/>
    </>
  );
}

export default CreateStudent;
