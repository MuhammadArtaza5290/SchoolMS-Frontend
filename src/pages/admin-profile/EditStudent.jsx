import React,{useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/input/Input'
import Button from '../../components/button/Button'
import { useParams } from 'react-router-dom'
import axios from '../../config/axiosConfig'

function EditStudent() {
        let {studentid} = useParams();
        let navigate = useNavigate()
        let[name, setName] = useState('')
        let[fathername, setFathername] = useState('')
        let[email, setEmail] = useState('')
        let[address, setAddress] = useState('')
        let[phone, setPhone] = useState('')
        let[image, setImage] = useState('')

         useEffect(()=>{
                   async function fetchUpdateStudent(){
                        try {
                            let response = await axios.get(`/studentdata/${studentid}`)
                             setName(response.data.name);
                             setFathername(response.data.fathername);
                             setEmail(response.data.email);
                             setAddress(response.data.address);
                             setPhone(response.data.phone);
                        } catch (error) {
                            console.log(error);
                            
                        }
                        
                    }
                    fetchUpdateStudent()
            }, [])
        
           async function editHandler(e){
                e.preventDefault()
               let formData = new FormData();
            formData.append('image', image)
            formData.append('name', name)
            formData.append('fathername', fathername)
            formData.append('email', email)
            formData.append('address', address)
            formData.append('phone', phone)
        
            await axios.post(`/editstudent/${studentid}`, formData)
            .then(()=> navigate('/adminProfile/class'))
            .catch(err => console.log(err))
            }

  return (
    <>
    <div className="createTeacher-container">
  <div className="form-box">
    <h2 style={{color: 'black', fontSize: '40px', textAlign: 'center'}}>Update Student</h2>
    <div className="inputTeacher-container">
      <Input type="file" name="image"  onchange={(e) => setImage(e.target.files[0])} />
      <Input type="text" placeholder="Enter Name" name='name' value={name} className="input-field" onchange={(e)=> setName(e.target.value)} />
      <Input type="text" placeholder="Enter FatherName" name='fathername' value={fathername} className="input-field" onchange={(e)=> setFathername(e.target.value)} />
      <Input type="email" placeholder="Enter Email" name='email' value={email} className="input-field" onchange={(e)=> setEmail(e.target.value)} />
      <Input type="text" placeholder="Enter Address" value={address} name='address' className="input-field" onchange={(e)=> setAddress(e.target.value)}/>
      <Input type="text" placeholder="Enter Phone" value={phone} name='phone' className="input-field" onchange={(e)=> setPhone(e.target.value)}/>
      <Button text='Update Student' onclick={editHandler} />
    </div>
  </div>
</div>
    </>
  )
}

export default EditStudent