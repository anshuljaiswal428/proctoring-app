import { useOutletContext } from "react-router-dom";
import "../styles/Log.css";

const ResultLogs = () => {
  const { logs } = useOutletContext();

  return (
    <div className="container-log">
      <div className="container-head">
        <h2>Result Logs</h2>
      </div>
      <div className="container-cont">
        {logs && logs.length > 0 ? (
          logs.map((logEntry, i) => {
            const [time, data] = logEntry.split(" - ");
            let objects = [];

            try {
              objects = JSON.parse(data);
            } catch (err) {
              console.error("Invalid log format:", logEntry, err);
            }

            return (
              <div key={i} className="para-content">
                <p><strong>{time}</strong></p>
                {objects.length > 0 ? (
                  objects.map((obj, j) => (
                    <p key={j} className="log-line">
                      {obj.class} ({Math.round(obj.score * 100)}%)
                    </p>
                  ))
                ) : (
                  <p className="log-line">No detections</p>
                )}
              </div>
            );
          })
        ) : (
          <p className="no-logs">No result logs yet...</p>
        )}
      </div>
    </div>
  );
};

export default ResultLogs;
