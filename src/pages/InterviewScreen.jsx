import { useEffect, useState } from "react";
import VideoComponent from "../components/VideoComponent"
import "../styles/InterviewScreen.css"
import { Outlet } from 'react-router-dom'

const InterviewScreen = () => {
  const [logs, setLogs] = useState([]);
  const [liveLogs, setLiveLogs] = useState([]);

  const logEvent = (event) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, `${timestamp} - ${JSON.stringify(event)}`]);
    setLiveLogs([`${timestamp} - ${JSON.stringify(event)}`]);
  }
  useEffect(() => {
    console.log(logs)
  }, [logs]);

  return (
    <div className="container">
      <div className="child left">
        <VideoComponent onLogEvent={logEvent} />
      </div>
      <div className="child right">
        <Outlet context={{ liveLogs, logs }} />
      </div>
    </div>
  )
}

export default InterviewScreen