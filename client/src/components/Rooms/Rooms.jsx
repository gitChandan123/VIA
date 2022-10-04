import React from "react";
import { Link } from "react-router-dom";
import CreateRoomForm from "./CreateRoomForm";
import { useDeleteRoomMutation, useGetRoomsQuery } from "../../redux/api";
import {
  Button,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "./rooms.css";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Rooms = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { data, isSuccess, isError, error } = useGetRoomsQuery({
    userId: user._id,
  });
  const [
    deleteRoom,
    { data: deleteData , isSuccess: isDeleteSuccess, isError: isDeleteError, error: deleteError },
  ] = useDeleteRoomMutation();

  const handleClick = async (roomId) => {
    await deleteRoom({ userId: user._id, roomId });
  };

  useEffect(() => {
    if (isDeleteSuccess) {
      toast.success(deleteData.message);
    }
    if (isDeleteError) {
      toast.error(deleteError.message);
    }
    //eslint-disable-next-line
  }, [isDeleteSuccess, isDeleteError]);

  return (
    <Container className="leftbar">
      <Paper className="leftbar__paper">
        <div style={{ height: "72vh" }}>
          {isSuccess && data.length && (
            <List component="nav" className="paper__list">
              {data.map((room) => (
                <ListItem alignItems="center" divider key={room._id}>
                  <Link
                    to={`/rooms/${room._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <ListItemButton>
                      <ListItemText>{room.name}</ListItemText>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleClick(room._id)}
                      >
                        <DeleteIcon />
                      </Button>
                    </ListItemButton>
                  </Link>
                </ListItem>
              ))}
            </List>
          )}
          {isError && <p>{error.message}</p>}
        </div>
        <div style={{ height: "10%" }}>
          <CreateRoomForm />
        </div>
      </Paper>
    </Container>
  );
};

export default Rooms;
