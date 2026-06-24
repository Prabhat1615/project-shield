import { useEffect, useState } from "react";
import { getRecentThreats } from "../services/logService";

function RecentThreats() {
  const [threats, setThreats] = useState([]);

  useEffect(() => {
    const loadThreats = async () => {
      try {
        const data =
          await getRecentThreats();

        setThreats(data.threats);
      } catch (err) {
        console.log(err);
      }
    };

    loadThreats();
  }, []);

  return (
    <div className="panel recent-threats">

      <div className="panel-heading">
        <h2>Recent Threats</h2>
      </div>

      {threats.length === 0 ? (
        <p>No recent threats detected.</p>
      ) : (
        threats.map((threat, index) => (
          <div
            key={index}
            className="threat-item high"
          >
            <strong>
              {threat.sourceIP}
            </strong>

            <p>
              {threat.protocol} • Score:
              {threat.threatScore}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default RecentThreats;