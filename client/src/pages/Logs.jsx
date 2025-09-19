import "../styles/Log.css";

const Logs = ({ liveLogs, username, focus }) => {
  return (
    <div className="container-log">
      <div className="container-head">
        <h2 style={{ color: "white" }}>
          Live Logs for <span className="highlight">{username}</span>
        </h2>
        <h3 style={{ color: "orange", paddingBottom:"1rem" }}>Focus Count: {focus}</h3>
      </div>

      <div className="log-list">
        {liveLogs && liveLogs.length > 0 ? (
          liveLogs.map((logEntry, i) => {
            const [time, data] = logEntry.split(" - ");
            let objects = [];

            try {
              objects = JSON.parse(data);
            } catch (err) {
              console.error("Invalid log format", err);
            }

            return (
              <div key={i} className="log-card">
                <div className="log-time">Time: {time}</div>
                <div className="log-data">
                  {objects.length > 0 ? (
                    objects.map((obj, j) => (
                      <div key={j} className="log-item">
                        <span className="log-class">{obj.class}</span>
                        {obj.score && (
                          <span className="log-score">{Math.round(obj.score * 100)}%</span>
                        )}
                        {obj.direction && (
                          <span className="log-direction">{obj.direction}</span>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="no-detect">No detections</p>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p className="no-logs">No live logs yet...</p>
        )}
      </div>
    </div>
  );
};

export default Logs;
