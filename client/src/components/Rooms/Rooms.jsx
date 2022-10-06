import React from "react";
import { Link } from "react-router-dom";
import CreateRoomForm from "./CreateRoomForm";
import { useGetRoomsQuery } from "../../redux/api";
import {
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
} from "@mui/material";
import "./rooms.css";

const Rooms = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { data, isSuccess, isError, error } = useGetRoomsQuery({
    userId: user._id,
  });

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
