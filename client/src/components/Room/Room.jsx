import React, { useEffect, useState } from "react";
import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDeleteRoomMutation, useGetRoomQuery } from "../../redux/api";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import VideocamIcon from "@mui/icons-material/Videocam";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AddUserInRoom from "./AddUserInRoom";
import Chat from "../Chat/Chat";
import "../../index.css";
import { toast } from "react-toastify";

const Room = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const {
    data: room,
    isSuccess,
    isError,
    error,
  } = useGetRoomQuery({ userId: user._id, roomId });
  const [
    deleteRoom,
    {
      data: deleteData,
      isSuccess: isDeleteSuccess,
      isError: isDeleteError,
      error: deleteError,
    },
  ] = useDeleteRoomMutation();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = async () => {
    await deleteRoom({ userId: user._id, roomId });
  };

  useEffect(() => {
    if (isDeleteSuccess) {
      toast.success(deleteData.message);
      navigate("/rooms");
    }
    if (isDeleteError) {
      toast.error(deleteError.message);
    }
    //eslint-disable-next-line
  }, [isDeleteSuccess, isDeleteError]);

  return (
    <>
      {isSuccess && (
        <>
          <AppBar color="transparent" elevation={1} position="static">
            <Toolbar>
              <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                <div
                  className="animate-charcter"
                  style={{ fontSize: "30px", paddingLeft: "8px" }}
                >
                  {room.name}
                </div>
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
              <Tooltip arrow title="Add User in room">
                <button
                  onClick={handleClickOpen}
                  className="btn btn-primary mx-2"
                >
                  <PersonAddAlt1Icon />
                </button>
              </Tooltip>
              <Link
                to={`/video-call/${roomId}`}
                style={{ textDecoration: "none" }}
              >
                <Tooltip arrow title="Start Video Call">
                  <button className="btn btn-primary mx-2">
                    <VideocamIcon />
                  </button>
                </Tooltip>
              </Link>
              <Tooltip arrow title="Leave Room">
                <button onClick={handleClick} className="btn btn-danger mx-2">
                  <ExitToAppIcon />
                </button>
              </Tooltip>
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
