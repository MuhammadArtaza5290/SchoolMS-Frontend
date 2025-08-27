import React, { useState } from "react";
import "./login.css";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import axios from "../../config/axiosConfig";
import { useNavigate } from "react-router-dom";
import lightLogo from "../../assets/lightLogo.png";
import * as Yup from 'yup';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Login() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid Email').required('Email is required'),
    password: Yup.string().required('Password is required')
  })
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await validationSchema.validate({email, password},{abortEarly: false})
      let data = {
        email,
        password,
      };
      let res = await axios.post("/login", data);
      if (res.data.role === "admin") {
        navigate("/adminProfile");
      } else if (res.data.role === "teacher") {
        navigate("/teacherProfile");
      } else {
        navigate("/studentProfile");
      }
      setEmail("");
      setPassword("");
    } catch (error) {
      if (error.inner) {
        error.inner.forEach((err)=> toast.error(err.message))
      } else {
        toast.error("Something went wrong!");
      }
    }
    
  }
  return (
    <>
      <div className="container">
        <div className="inner-container">
          <div className="left">
            <div className="loginImage-container">
              <img className="barImage" src={lightLogo} alt="" />
            </div>
            <h2>Welcome Back!</h2>
            <p>Already have an account!</p>
          </div>
          <div className="right">
            <h1 style={{ marginBottom: "10px" }}>Login</h1>
            <Input
              type="text"
              name="email"
              placeholder="Enter your email"
              value={email}
              onchange={(e) => setEmail(e.target.value)}
              autocomplete="off"
            />
            <Input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onchange={(e) => setPassword(e.target.value)}
              autocomplete="off"
            />
            <Button text="Login" onclick={handleSubmit} />
          </div>
        </div>
      </div>
      <ToastContainer/>
    </>
  );
}

export default Login;
