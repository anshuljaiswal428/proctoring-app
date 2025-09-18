import { useEffect, useState } from "react";
import "../styles/ResultLogs.css";
import axios from "axios";
import { useLocation } from "react-router-dom";

const ResultLogs = () => {
  const location = useLocation();
  const { reportId, username } = location.state || {};
  const [logs, setLogs] = useState([]);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const submitReport = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/logs/${reportId}`);
        setLogs(res.data.suspiciousEvents);
      } catch (err) {
        console.error("Error submitting report:", err);
      }
    };
    if (reportId) {
      submitReport();
    }
  }, []);

  const downloadPdf = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/logs/${reportId}/pdf`,
        { responseType: "blob" }
      );

      const blob = res.data;
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `report_${reportId}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error downloading PDF:", err);
    }
  };

  return (
    <div className="container-log-res">
      <div className="container-head-res">
        <div className="report-header">
          <div>
            <h2 style={{color:"white"}}>Result Logs for <span className="highlight">{username}</span></h2>
            <p className="duration">
              <strong style={{color:"white"}}>Duration: {logs.length * 3} seconds</strong>
            </p>
          </div>
          <div>
            <button className="dialog-btn" onClick={downloadPdf}>
              Download Report
            </button>
          </div>
        </div>
      </div>

      <div className="log-list-res">
        {logs && logs.length > 0 ? (
          logs.map((logEntry, i) => {
            const time = logEntry.timestamp;
            const objects = logEntry.detections || [];

            return (
              <div key={i} className="log-card-res">
                <div className="log-time-res">Time: {time}</div>
                <div className="log-data-res">
                  {objects.length > 0 ? (
                    objects.map((obj, j) => (
                      <div key={j} className="log-item-res">
                        <span className="log-class-res">{obj.class}</span>
                        <span className="log-score-res">
                          {Math.round(obj.score * 100)}%
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="no-detect-res">No detections</p>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p className="no-logs-res">No result logs yet...</p>
        )}
      </div>
    </div>
  );
};

export default ResultLogs;
