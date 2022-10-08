import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const CallWaiting = ({roomId,setVideocall}) => {
  return (
    <>
      <Button variant="contained" onClick={() => setVideocall(true)}>
        Start Call
      </Button>
      <Link to={`/rooms/${roomId}`} style={{ textDecoration: "none" }}>
        <Button variant="contained">Home</Button>
      </Link>
    </>
  );
}
export default CallWaiting;
