import { useEffect, useState } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const TIME_API = "https://worldtimeapi.org/api/timezone/Europe/London";

let currentTime = new Date().toLocaleTimeString([], {
  hour: "2-digit",
  minute: "2-digit",
});

export default function Clock() {
  const [time, setTime] = useState({});

  useEffect(() => {
    async function fetchInitialTime() {
      let rez = await fetch(TIME_API);
      let jrez = await rez.json();
      setTime(jrez);
    }
    fetchInitialTime();
  }, []);

  return (
    <div className="advice">
      <AccessTimeIcon /> {currentTime}{" "}
    </div>
  );
}
