import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import InterviewScreen from './pages/InterviewScreen'
import ResultLogs from './pages/ResultLogs'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='interview-screen' element={<InterviewScreen/>}/>
        <Route path='result-logs' element={<ResultLogs/>}/>
      </Routes>
    </div>
  )
}

export default App
