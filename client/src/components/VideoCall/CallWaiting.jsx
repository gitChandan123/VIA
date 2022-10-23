import { useEffect, useRef } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { toggleCallActive } from "../../redux/callreducer";

const CallWaiting = ({ roomId, setVideocall }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const ENDPOINT = process.env.REACT_APP_ENDPOINT;
  let socket = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.current = io(ENDPOINT);
    socket.current.emit("join", { name: user.name, room: roomId }, (error) => {
      if (error) {
        console.error(error);
      }
    });
    return () => {
      socket.current?.disconnect();
    };
    //eslint-disable-next-line
  }, []);

  const handleClick = () => {
    socket.current.emit("call");
    dispatch(toggleCallActive());
    setVideocall(true);
  };

  return (
    <>
      <Button variant="contained" onClick={handleClick}>
        Join Call
      </Button>
      <Link to={`/rooms/${roomId}`} style={{ textDecoration: "none" }}>
        <Button variant="contained">Home</Button>
      </Link>
    </>
  );
};
export default CallWaiting;
