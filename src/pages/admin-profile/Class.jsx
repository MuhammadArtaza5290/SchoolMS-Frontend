import React,{useEffect, useState} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Button from '../../components/button/Button'
import axios from '../../config/axiosConfig'
import ClassCard from '../../components/classCard/ClassCard';
import { useNavigate } from 'react-router-dom';
function Class() {
  const navigate = useNavigate();
  const[toggle, setToggle] = useState(false);
  const[classname, setClassname] = useState('');
  const[viewClass, setViewClass] = useState([]);
  const [refresh, setRefresh] = useState(false);

  function createClassHandler(){
    setToggle(!toggle)
  }
  
  async function onClickHandler(e){
    e.preventDefault()
    let data = {
      classname
    };
    try {
      await axios.post('/class/createclass', data)
      setRefresh(prev=> !prev)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchClasses()
  }, [refresh])

  async function fetchClasses(){
    try {
     let res = await axios.get('/class/viewclass')   
     setViewClass(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  

  return (
    <>
    <div className="class-mainContainer">
      <div className="classHeading"><h2>Classes</h2></div>
      <div className="class-grid">
      {viewClass.map((val, index)=>{
        return(
         <ClassCard key={index} classname={val.classname} teacher={val.teacher?.name} onclick={()=> navigate(`/adminProfile/classstudent/${val._id}`)} />
        )
      })}
      </div>
      <div className="createCard">
      <div className="class-create" onClick={createClassHandler}>
        <h3>Create Class</h3>
        {toggle ? (<div onClick={(e) => e.stopPropagation()} className="class-dropdown-wrapper">
        <label htmlFor="myDropdown">Choose Class:</label>
        <select id="myDropdown" name="myDropdown" onChange={(e)=> setClassname(e.target.value)}>
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
        <Button className='classBtn' text="Create class" onclick={onClickHandler} />
</div>) : (<div className="class-icon" >
          <FontAwesomeIcon
                      icon={faPlus}/>
        </div>)}
      </div>
      </div>
      

    </div>
    </>
  )
}

export default Class