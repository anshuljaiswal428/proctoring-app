import "../styles/Log.css";

const Logs = ({ liveLogs, username }) => {

  return (
    <div className="container-log">
      <div className="container-head">
        <h2>Live Logs: {username}</h2>
      </div>
      <div className="container-cont">
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
              <div key={i} className="para-content">
                {objects.length > 0 ? (
                  objects.map((obj, j) => (
                    <p key={j}>
                       {time} {obj.class} ({Math.round(obj.score * 100)}%)
                    </p>
                  ))
                ) : (
                  <p>No detections</p>
                )}
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
