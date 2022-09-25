import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetRoomQuery } from "../redux/api";
import AddUserInRoom from "./AddUserInRoom";
import Chat from "./Chat";

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
          <div>
            <h1>{room.name}</h1>
            <h3>Users:</h3>
            <ul>
              {room.users.map((user) => (
                <li key={user.userId}>{user.userName}</li>
              ))}
            </ul>
            <Button variant="contained" onClick={handleClickOpen}>
              Add User
            </Button>
            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
              <DialogTitle>Add User:</DialogTitle>
              <DialogContent>
                <AddUserInRoom roomId={roomId} usersInRoom={room.users} />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
              </DialogActions>
            </Dialog>
          </div>
          <hr />
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
