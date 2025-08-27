import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import darkLogo from "../../assets/darkLogo.png";
import lightLogo from "../../assets/lightLogo.png";
import BarTiles from "../barTiles/BarTiles";
import { NavLink } from "react-router-dom";
import LogoutButton from "../button/LogoutButton";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
function Navbar({ image, name, email, role, teacherid, classname, studentid }) {
  const sidebarRef = useRef();
  const profileRef = useRef();
  let [toggle, setToggle] = useState(false);
  let [profileToggle, setProfileToggle] = useState(false);
  function toggleHandler() {
    setToggle(!toggle);
  }
  function profileHandler() {
    setProfileToggle(!profileToggle);
  }

  useEffect(() => {
  function handleClickOutside(event) {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setToggle(false);
    }
    if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileToggle(false);
      }

  }
  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  return (
    <>
      <div className="navbar">
      <div>
          <FontAwesomeIcon
            onClick={toggleHandler}
            style={{ fontSize: "35px", marginLeft: "30px" }}
            icon={faBarsStaggered}
          />
        </div>

        <div className="image-container">
          <img className="navImage" src={darkLogo} alt="" />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "2px",
            }}
          >
            <h2 style={{ color: "#152259" }}>CRESTFIELD</h2>
            <h5 style={{ color: "#152259" }}>INTERNATIONAL SCHOOL</h5>
          </div>
        </div>
        <div className="profilePic">
          <img
            style={{ height: "40px", width: "40px", objectFit: 'fill' }}
            src={image}
            alt="user"
            onClick={profileHandler}
          />
        </div>
      </div>
      <div ref={sidebarRef} className={`sidebar ${toggle ? "active" : ""}`}>
       {role === 'admin'? (<> 
        <NavLink to="/adminProfile">
          <div className="sideBar-image-container">
            <img className="barImage" src={lightLogo} alt="" />
          </div>
        </NavLink>
        <BarTiles link="/adminProfile/createTeacher" text={"Create Teacher"} />
        <BarTiles link="/adminProfile/createStudent" text={"Create Student"} />
        <BarTiles link="/adminProfile/class" text={"Class"} />
        <BarTiles link="/adminProfile/teacher" text={"Teacher"} />
        <BarTiles link="/adminProfile/student" text={"Student"} /> 
        </>)
        : role === 'teacher'? (<>
        <NavLink to="/teacherProfile">
          <div className="sideBar-image-container">
            <img className="barImage" src={lightLogo} alt="" />
          </div>
        </NavLink>
        <BarTiles link={`/teacherProfile/teacherclass/${teacherid}`} text={"Class"} />
        <BarTiles link={`/teacherProfile/attendence/${classname}`} text={"Attendence"} />
        <BarTiles link={`/teacherProfile/marks/${classname}`} text={"Marks Sheet"} />
        
        </>) : (<>
        <NavLink to="/studentProfile">
          <div className="sideBar-image-container">
            <img className="barImage" src={lightLogo} alt="" />
          </div>
        </NavLink>
        <BarTiles link={`/studentProfile/studentCard/${studentid}`} text={"Report Card"} />
        </>)}
      </div>
      <div ref={profileRef} className={`profile-bar ${profileToggle ? "active" : ""}`}>
        <div className="profileimage-container">
          <img
            style={{ height: "80px", width: "80px" }}
            src={image}
            alt="user"
          />
          {role === 'admin' && <><NavLink to='/adminProfile/editProfile'><button
            style={{
              position: "absolute",
              top: "15px",
              right: "15px",
              fontSize: "20px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "white",
            }}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button></NavLink></>}
        </div>
        <h3 style={{ color: "aliceblue", marginBottom: "8px" }}>{name}</h3>
        <h6 style={{ color: "aliceblue", marginBottom: "8px" }}>{email}</h6>
        <LogoutButton />
      </div>
    </>
  );
}

export default Navbar;
