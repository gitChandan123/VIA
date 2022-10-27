import { useEffect, useRef } from "react";
import { Button, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import styled from "@emotion/styled";
import { indigo } from "@mui/material/colors";
import CallIcon from "@mui/icons-material/Call";
import HomeIcon from "@mui/icons-material/Home";
import { toggleCallActive } from "../../redux/callreducer";
import svg from "../../static/group-vedio.svg";

const CallWaiting = ({ roomId, setVideocall }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const ENDPOINT = process.env.REACT_APP_ENDPOINT;
  let socket = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.current = io(ENDPOINT);
    socket.current.emit(
      "join",
      { name: user.name, userId: user._id, room: roomId },
      (error) => {
        if (error) {
          console.error(error);
        }
      }
    );
    return () => {
      socket.current?.disconnect();
    };
    //eslint-disable-next-line
  }, []);

  const StyledButton = styled(Button)(() => ({
    color: indigo[50],
    borderRadius: "25px",
    margin: "5px",
    backgroundColor: indigo[900],
    "&:hover": {
      backgroundColor: indigo[800],
    },
  }));

  const handleClick = () => {
    socket.current.emit("call");
    dispatch(toggleCallActive());
    setVideocall(true);
  };

  return (
    <>
      <div className="container-fluid vh-50 d-flex align-items-end justify-content-center bg-img">
        <img src={svg} alt="text alt" width="100%" height="100%" />
      </div>
      <Divider />
      <div className="container-fluid d-flex justify-content-center m-4">
        <StyledButton
          size="large"
          variant="contained"
          startIcon={<CallIcon />}
          onClick={handleClick}
        >
          Join Call
        </StyledButton>
        <Link to={`/rooms/${roomId}`} style={{ textDecoration: "none" }}>
          <StyledButton
            size="large"
            startIcon={<HomeIcon />}
            variant="contained"
          >
            Home
          </StyledButton>
        </Link>
      </div>
    </>
  );
};
export default CallWaiting;
