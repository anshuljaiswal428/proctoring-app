import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import InterViewScreen from './pages/InterViewScreen'
import ResultLogs from './pages/ResultLogs'
import Logs from './pages/Logs'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='interview-screen' element={<InterViewScreen/>}>
          <Route index element={<Logs/>}/>
          <Route path='result-logs' element={<ResultLogs/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
