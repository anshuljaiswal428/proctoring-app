import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import InterviewScreen from './pages/InterViewScreen'
import ResultLogs from './pages/ResultLogs'
import Logs from './pages/Logs'

function App() {
  return (
    <div style={{width:"100vw", height:"100vh"}}>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='interview-screen' element={<InterviewScreen/>}>
          <Route index element={<Logs/>}/>
          <Route path='result-logs' element={<ResultLogs/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
