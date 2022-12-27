import React, { useEffect, useState } from "react";
import {
  AppBar,
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
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
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { toast } from "react-toastify";
import { Box } from "@mui/system";
import { grey } from "@mui/material/colors";
import { useSelector } from "react-redux";
import { callActive } from "../../redux/callreducer";
import RemoveUserFromRoom from "./RemoveUserFromRoom";
import AddUserInRoom from "./AddUserInRoom";
import Chat from "../Chat/Chat";
import "../../index.css";

const Room = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const inCall = useSelector(callActive);
  const user = JSON.parse(localStorage.getItem("user"));
  const [isProtected, setIsProtected] = useState(true);
  const {
    data: room,
    isSuccess,
    isError,
    isLoading,
    isFetching,
    error,
  } = useGetRoomQuery({ userId: user._id, roomId });

  const [
    deleteRoom,
    {
      data: deleteData,
      isSuccess: isDeleteSuccess,
      isError: isDeleteError,
      isLoading: isDeleteLoading,
      error: deleteError,
    },
  ] = useDeleteRoomMutation();

  const [editRoom] = useEditRoomMutation();
  const [open, setOpen] = useState(false);
  const [openRemove, setOpenRemove] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const menuOpen = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenRemove = () => {
    setOpenRemove(true);
  };

  const handleCloseRemove = () => {
    setOpenRemove(false);
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
  }, [isSuccess, isError]);

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
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading || isFetching || isDeleteLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {isSuccess && (
        <>
          {!inCall && (
            <AppBar
              color="inherit"
              elevation={1}
              position="sticky"
              sx={{ top: 65 }}
            >
              <Toolbar>
                <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                  <div
                    className="animate-charcter"
                    style={{ fontSize: "25px", paddingLeft: "8px" }}
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
                    <span
                      className="text-uppercase"
                      style={{ fontSize: "18px" }}
                      key={user.userId}
                    >
                      {user.userName},{" "}
                    </span>
                  ))}
                </Typography>

                <IconButton
                  disableRipple
                  onClick={handleMenuClick}
                  sx={{
                    display: { xs: "block", md: "none", color: grey[900] },
                  }}
                >
                  <MoreVertIcon />
                </IconButton>

                <Box sx={{ display: { xs: "none", md: "flex" } }}>
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

                  {room.host === user._id && (
                    <Tooltip arrow title="Remove User from room">
                      <button
                        onClick={handleClickOpenRemove}
                        className="btn btn-danger mx-2"
                      >
                        <PersonRemoveIcon />
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
                    <button
                      onClick={handleClick}
                      className="btn btn-danger mx-2"
                    >
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
                </Box>
              </Toolbar>
            </AppBar>
          )}

          <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>Add User:</DialogTitle>
            <DialogContent>
              <AddUserInRoom roomId={roomId} usersInRoom={room.users} />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={openRemove}
            onClose={handleCloseRemove}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle>Remove User:</DialogTitle>
            <DialogContent>
              <RemoveUserFromRoom roomId={roomId} usersInRoom={room.users} />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseRemove}>Cancel</Button>
            </DialogActions>
          </Dialog>

          <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleMenuClose}>
            {room.host === user._id && (
              <MenuItem onClick={handleClickOpen}>
                <ListItemIcon>
                  <PersonAddAlt1Icon fontSize="small" />
                </ListItemIcon>
                Add User
              </MenuItem>
            )}

            {room.host === user._id && (
              <MenuItem onClick={handleClickOpenRemove}>
                <ListItemIcon>
                  <PersonRemoveIcon fontSize="small" />
                </ListItemIcon>
                RemoveUser
              </MenuItem>
            )}

            <Link
              to={`/video-call/${roomId}`}
              style={{ textDecoration: "none" }}
            >
              <MenuItem>
                <ListItemIcon>
                  <VideocamIcon fontSize="small" />
                </ListItemIcon>
                Video Call
              </MenuItem>
            </Link>

            <MenuItem onClick={handleClick}>
              <ListItemIcon>
                <ExitToAppIcon fontSize="small" />
              </ListItemIcon>
              Leave Room
            </MenuItem>

            {room.host === user._id && (
              <MenuItem onClick={handleChange}>
                {isProtected ? (
                  <>
                    <ListItemIcon>
                      <LockOpenIcon fontSize="small" />
                    </ListItemIcon>
                    Unlock Room
                  </>
                ) : (
                  <>
                    <ListItemIcon>
                      <LockIcon fontSize="small" />
                    </ListItemIcon>
                    Lock Room
                  </>
                )}
              </MenuItem>
            )}
          </Menu>

          <Box sx={inCall ? { paddingTop: "35px" } : { paddingTop: "0px" }}>
            <Chat
              userId={user._id}
              name={user.name}
              room={room}
              prevMessages={room.messages}
            />
          </Box>
        </>
      )}
    </>
  );
};

export default Room;
