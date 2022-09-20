import { Button } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <Link to="/join" style={{ textDecoration: "none" }}>
        <Button variant="contained" color="primary" sx={{ m: "5px" }}>
          Join
        </Button>
      </Link>
      <Link to="/create-room" style={{ textDecoration: "none" }}>
        <Button variant="contained" color="primary" sx={{ m: "5px" }}>
          Create Room
        </Button>
      </Link>
      {/* <Link to="/chat" style={{ textDecoration: "none" }}>
        <Button variant="contained" color="primary" sx={{ m: "5px" }}>
          Chat
        </Button>
      </Link>
      <Link to="/video-call" style={{ textDecoration: "none" }}>
        <Button variant="contained" color="primary" sx={{ m: "5px" }}>
          Video Call
        </Button>
      </Link> */}
      <Outlet />
    </>
  );
};

export default Home;
