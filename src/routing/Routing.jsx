import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import AdminProfilee from '../pages/admin-profile/AdminProfilee'
import TeacherProfile from '../pages/teacher-profile/TeacherProfile'
import StudentProfile from '../pages/student-profile/StudentProfile'
import Login from '../pages/login/Login'
import Class from '../pages/admin-profile/Class'
import CreateTeacher from '../pages/admin-profile/CreateTeacher'
import Teacher from '../pages/admin-profile/Teacher'
import CreateStudent from '../pages/admin-profile/CreateStudent'
import Student from '../pages/admin-profile/Student'
import EditProfile from '../pages/admin-profile/EditProfile'
import ClassStudent from '../pages/admin-profile/ClassStudent'
import EditTeacher from '../pages/admin-profile/EditTeacher'
import EditStudent from '../pages/admin-profile/EditStudent'
import TeacherClass from '../pages/teacher-profile/TeacherClass'
import Attendence from '../pages/teacher-profile/Attendence'
import Marks from '../pages/teacher-profile/Marks'
import ReportCard from '../pages/student-profile/ReportCard'
import StudentsCard from '../pages/student-profile/StudentsCard'
import ViewReport from '../pages/student-profile/ViewReport'
function Routing() {
  return (
    <>
    <BrowserRouter>
        <Routes>
            <Route path='/' element={ <Login/> } />
            <Route path='/adminProfile' element={ <AdminProfilee/> } >
              <Route path='/adminProfile/class' element={ <Class/> }/>
              <Route path='/adminProfile/createTeacher' element={ <CreateTeacher/> }/>
              <Route path='/adminProfile/Teacher' element={ <Teacher/> }/>
              <Route path='/adminProfile/createStudent' element={ <CreateStudent/> }/>
              <Route path='/adminProfile/Student' element={ <Student/> }/>
              <Route path='/adminProfile/editProfile' element={ <EditProfile/> }/>
              <Route path='/adminProfile/classstudent/:classid' element={ <ClassStudent/> } />
              <Route path='/adminProfile/editTeacher/:teacherid' element={ <EditTeacher/> } />
              <Route path='/adminProfile/editStudent/:studentid' element={ <EditStudent/> } />
            </Route>
            <Route path='/teacherProfile' element={ <TeacherProfile/> } >
              <Route path='/teacherProfile/teacherclass/:teacherid' element={ <TeacherClass/> } />
              <Route path='/teacherProfile/attendence/:classname' element={ <Attendence/> } />
              <Route path='/teacherProfile/marks/:classname' element={ <Marks/> } />
              <Route path='/teacherProfile/classstudent/:classid' element={ <ClassStudent/> } />
            </Route>
            
            <Route path='/studentProfile' element={ <StudentProfile/> } >
              <Route path='/studentProfile/studentCard/:studentId' element={ <StudentsCard/> } />
              <Route path='/studentProfile/reportcard/:studentId' element={ <ReportCard/> } />
              <Route path='/studentProfile/viewreport/:studentId/:marksId' element={ <ViewReport/> } />
            </Route>
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default Routing

// mera ik question ha tumhary sy. me MERN ka project bna rha hu to me ne routes ko frontend or backend sy protect kiya ha. jab proper login krta hu agr authorized ha ya unauthorized to routes smoothly work krta han agr user unauthorized ha or wo frontend pr routes ko access krna ki try krta ha through direct url ab wo routes to protect han ku ke un ko me ne protect kiya hua ha . route to us ko access nahi hota lakin jesa hi unauthorized user jumlp krta ha protect routed pr to useEffect me condition ki wja sy wo usy wapis login route pr bhej deta ha . sab thek chal rha ha lakin jo slightly c blink hota ha wo muja acha nahi lag rha. kya itna sa hota ha ku ke agr koi unauthorized ho ga tab hi esa ho ga . agr proper way follow kiya jay phir thek ha. tum kya suggest krta ho.