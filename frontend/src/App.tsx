
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './common/Login'
import Register from './common/Register'
import CreatorRoutes from './routers/CreatorRoutes'
import CDashboard from './pages/creator/CDashboard'
import AdminRoutes from './routers/AdminRoutes'
import StudentRoutes from './routers/StudentRoutes'
import SDashboard from './pages/student/SDashboard'
import ADashboard from './pages/admin/ADashboard'
import CExam from '@/pages/creator/Exam/CExam'
import SDiscussion from './pages/student/SDiscussion'
import SResult from './pages/student/SResult'
import SGivenExam from './pages/student/SGivenExam'
import SExam from './pages/student/exam/SExam'
import GiveExam from './pages/student/exam/GiveExam'
import CDiscussion from './pages/creator/CDiscussion'
import ViewExam from './pages/creator/ViewExam'
import CLeaderBoard from './pages/creator/CLeaderBoard'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path='/signup' element={<Register/>}/>

        <Route path='/admin-dashboard' element={<AdminRoutes component={ADashboard} />}/>
        {/* <Route path='/admin-dashboard' element={<ADashboard/>}/> */}
        <Route path='/creator-dashboard' element={<CreatorRoutes component={CDashboard} />}/>
        <Route path='/creator-exam' element={<CreatorRoutes component={CExam} />}/>
        <Route path='/creator-viewexam' element={<CreatorRoutes component={ViewExam} />}/>
        <Route path='/creator-discussion/:examId' element={<CreatorRoutes component={CDiscussion} />}/>
        <Route path='/creator-leaderboard/:examId' element={<CreatorRoutes component={CLeaderBoard} />}/>

        {/* <Route path='/std-dashboard' element={<StudentRoutes component={SDashboard} />}/> */}
        <Route path='/std-exam' element={<StudentRoutes component={SExam} />}/>
        <Route path='/giveExam/:examId' element={<StudentRoutes component={GiveExam} />}/>
        <Route path='/std-givenexam' element={<StudentRoutes component={SGivenExam} />}/>
        <Route path='/std-discussion/:examId' element={<StudentRoutes component={SDiscussion} />}/>
        <Route path='/std-result/:examId/:userId' element={<StudentRoutes component={SResult} />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
