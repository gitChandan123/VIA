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
import {
  useDeleteRoomMutation,
  useEditRoomMutation,
  useGetRoomQuery,
} from "../../redux/api";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import VideocamIcon from "@mui/icons-material/Videocam";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import AddUserInRoom from "./AddUserInRoom";
import Chat from "../Chat/Chat";
import "../../index.css";
import { toast } from "react-toastify";

const Room = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [isProtected, setIsProtected] = useState(true);
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

  const [editRoom] = useEditRoomMutation();
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

  const handleChange = async () => {
    await editRoom({ userId: user._id, roomId, isProtected: !isProtected });
    setIsProtected(!isProtected);
  };

  useEffect(() => {
    if (isSuccess) setIsProtected(room.isProtected);
    if (isError) toast.error(error.message);
    //eslint-disable-next-line
  }, [isSuccess,isError]);

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

              {room.host === user._id && (
                <Tooltip arrow title="Add User in room">
                  <button
                    onClick={handleClickOpen}
                    className="btn btn-primary mx-2"
                  >
                    <PersonAddAlt1Icon />
                  </button>
                </Tooltip>
              )}

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

              {room.host === user._id && (
                <>
                  {isProtected ? (
                    <Tooltip arrow title="Unlock Room">
                      <button
                        onClick={handleChange}
                        className="btn btn-success mx-2"
                      >
                        <LockOpenIcon />
                      </button>
                    </Tooltip>
                  ) : (
                    <Tooltip arrow title="Lock Room">
                      <button
                        onClick={handleChange}
                        className="btn btn-danger mx-2"
                      >
                        <LockIcon />
                      </button>
                    </Tooltip>
                  )}
                </>
              )}
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
              room={room}
              prevMessages={room.messages}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Room;
