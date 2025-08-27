import React, { useState } from "react";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import "./adminProfile.css";
import axios from "../../config/axiosConfig";
import { useNavigate } from "react-router-dom";
function EditProfile() {
  const navigate = useNavigate();
  const[image, setImage] = useState('')
  async function updateProfileHandler(e) {
    e.preventDefault();
    //comment about FormData add at the end of this page..
    let formData = new FormData();
    formData.append("image", image);
    try {
      await axios.post("/editProfileData", formData)
      .then((res) => {
        navigate('/adminProfile');
     })
      .catch((err) => {
       navigate('/adminProfile/editProfile');
     })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="editProfile-container">
        <h2 style={{ marginBottom: "10px", color: "black" , fontSize: '35px'}}>
          Add Your Profile Picture
        </h2>
          <Input
            type="file"
            name="image"
            onchange={(e) => setImage(e.target.files[0])}
          />
          <Button text="Update" onclick={updateProfileHandler} />
      </div>
    </>
  );
}

export default EditProfile;

// Jab hum FormData ka use karte hain to data JSON me convert nahi hota. FormData apna ek alag format hota hai — multipart/form-data, jisme text data string ke form me jata hai aur image ya file binary ke form me jati hai. Ye backend par multer ya koi parser handle karta hai, na ke body-parser jo JSON handle karta hai.