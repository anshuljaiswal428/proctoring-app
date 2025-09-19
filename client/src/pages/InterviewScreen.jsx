import { useState } from "react";
import VideoComponent from "../components/VideoComponent";
import "../styles/InterviewScreen.css";
import Logs from "./Logs";
import PlaceholdersAndVanishInputDemo from "../components/PlaceholdersAndVanishInputDemo.jsx";

const InterviewScreen = () => {
  const [logs, setLogs] = useState([]);
  const [liveLogs, setLiveLogs] = useState([]);
  const [username, setUsername] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [focus, setFocus] = useState(0);

  const logEvent = (event) => {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = `${timestamp} - ${JSON.stringify(event)}`;
    setLogs((prev) => [...prev, logEntry]);
    setLiveLogs([logEntry]);
  };

  return (
    <div className="container">
      {!submitted ? (
        <div className="username-dialog">
          <PlaceholdersAndVanishInputDemo
            setSubmitted={setSubmitted}
            username={username}
            setUsername={setUsername}
          />
        </div>
      ) : (
        <>
          <div className="child left">
            <VideoComponent
              setFocus={setFocus}
              onLogEvent={logEvent}
              username={username}
              allLogs={logs}
            />
          </div>
          <div className="child right">
            <Logs focus={focus} liveLogs={liveLogs} logs={logs} username={username} />
          </div>
        </>
      )}
    </div>
  );
};

export default InterviewScreen;
