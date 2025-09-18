import { useState } from "react";
import VideoComponent from "../components/VideoComponent";
import "../styles/InterviewScreen.css";
import { useEffect } from "react";
import Logs from "./Logs";

const InterviewScreen = () => {
  const [logs, setLogs] = useState([]);
  const [liveLogs, setLiveLogs] = useState([]);
  const [username, setUsername] = useState(""); // store name
  const [submitted, setSubmitted] = useState(false); // track if form submitted

  const logEvent = (event) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [...prev, `${timestamp} - ${JSON.stringify(event)}`]);
    setLiveLogs([`${timestamp} - ${JSON.stringify(event)}`]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() !== "") {
      setSubmitted(true);
    }
  };

  return (
    <div className="container">
      {!submitted ? (
        <div className="username-dialog">
          <form onSubmit={handleSubmit} className="dialog-form">
            <h2 style={{color: "black"}}>Enter Your Name</h2>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your Name"
              required
              className="name-input"
            />
            <button type="submit" className="dialog-btn">
              Start Interview
            </button>
          </form>
        </div>
      ) : (
        <>
          <div className="child left">
            <VideoComponent onLogEvent={logEvent} username={username} allLogs={logs} />
          </div>
          <div className="child right">
            <Logs liveLogs={liveLogs} logs={logs} username={username} />
          </div>
        </>
      )}
    </div>
  );
};

export default InterviewScreen;
