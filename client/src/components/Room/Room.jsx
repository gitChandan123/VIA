import React, { useState } from "react";
import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useGetRoomQuery } from "../../redux/api";
import AddUserInRoom from "./AddUserInRoom";
import Chat from "../Chat/Chat";

const Room = () => {
  const { roomId } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const {
    data: room,
    isSuccess,
    isError,
    error,
  } = useGetRoomQuery({ userId: user._id, roomId });
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {isSuccess && (
        <>
          <AppBar color="transparent" elevation={1} position="static">
            <Toolbar>
              <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                {room.name}
              </Typography>
              <Typography
                noWrap
                variant="h5"
                component="div"
                sx={{ flexGrow: 5 }}
              >
                {room.users.map((user) => (
                  <span key={user.userId}>{user.userName}, </span>
                ))}
              </Typography>
              <Button
                variant="contained"
                sx={{ m: "2px" }}
                onClick={handleClickOpen}
              >
                Add User
              </Button>
              <Link
                to={`/video-call/${roomId}`}
                style={{ textDecoration: "none" }}
              >
                <Button sx={{ m: "2px" }} variant="contained">
                  Start Video Call
                </Button>
              </Link>
            </Toolbar>
          </AppBar>

          <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>Add User:</DialogTitle>
            <DialogContent>
              <AddUserInRoom roomId={roomId} usersInRoom={room.users} />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
          </Dialog>

          <div>
            <Chat
              userId={user._id}
              name={user.name}
              room={roomId}
              prevMessages={room.messages}
            />
          </div>
        </>
      )}
      {isError && <h1>{error.message}</h1>}
    </>
  );
};

export default Room;
