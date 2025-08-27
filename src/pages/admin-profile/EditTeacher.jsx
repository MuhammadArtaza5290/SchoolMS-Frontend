import React,{useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/input/Input'
import Button from '../../components/button/Button'
import { useParams } from 'react-router-dom'
import axios from '../../config/axiosConfig'

function EditTeacher() {
    let {teacherid} = useParams();
    let navigate = useNavigate()
     let[name, setName] = useState('')
      let[email, setEmail] = useState('')
      let[phone, setPhone] = useState('')
      let[image, setImage] = useState('')

    useEffect(()=>{
           async function fetchUpdateTeacher(){
                try {
                    let response = await axios.get(`/teacherdata/${teacherid}`)
                     setName(response.data?.name);
                     setEmail(response.data?.email);
                     setPhone(response.data?.phone);
                } catch (error) {
                    console.log(error);
                    
                }
                
            }
            fetchUpdateTeacher()
    }, [])

   async function editHandler(e){
        e.preventDefault()
       let formData = new FormData();
    formData.append('image', image)
    formData.append('name', name)
    formData.append('email', email)
    formData.append('phone', phone)

    await axios.post(`/editteacher/${teacherid}`, formData)
    .then(()=> navigate('/adminProfile/Teacher'))
    .catch(err => console.log(err))
    }

  return (
    <>
     <div className="createTeacher-container">
  <div className="form-box">
    <h2 style={{color: 'black', fontSize: '40px', textAlign: 'center'}}>Update Teacher</h2>
    <div className="inputTeacher-container">
      <Input type="file" name="image"  onchange={(e) => setImage(e.target.files[0])} />
      <Input type="text" placeholder="Enter Name" name='name' value={name} className="input-field" onchange={(e)=> setName(e.target.value)} />
      <Input type="email" placeholder="Enter Email" name='email' value={email} className="input-field" onchange={(e)=> setEmail(e.target.value)} />
      <Input type="text" placeholder="Enter Phone" value={phone} name='phone' className="input-field" onchange={(e)=> setPhone(e.target.value)}/>
      <Button text='Update Teacher' onclick={editHandler} />
    </div>
  </div>
</div>
    </>
  )
}

export default EditTeacher