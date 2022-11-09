import React from "react";
import { Link } from "react-router-dom";
import CreateRoomForm from "./CreateRoomForm";
import { useGetRoomsQuery } from "../../redux/api";
import {
  Container,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import "./rooms.css";
import "../../index.scss";

const Rooms = ({ setOpen }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { data, isSuccess, isError, error } = useGetRoomsQuery({
    userId: user._id,
  });

  const handle = () => {
    if (window.innerWidth < 600) {
      setOpen(false);
    }
  };

  return (
    <div className="sidebar" onClick={handle}>
      <Container className="leftbar">
        <Paper className="leftbar__paper">
          <div style={{ height: "72vh" }}>
            {isSuccess && data.length ? (
              <ul className="list-group">
                {data.map((room) => (
                  <li key={room._id} className="list-group-item">
                    <Link
                      to={`/rooms/${room._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      {
                        <ListItemButton>
                          <ListItemIcon>
                            <GroupsIcon />
                          </ListItemIcon>
                          <ListItemText>
                            <span className="fw-bold text-uppercase">
                              {room.name}
                            </span>
                          </ListItemText>
                        </ListItemButton>
                      }
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <h3>No rooms</h3>
            )}

            {isError && <p>{error.message}</p>}
          </div>

          <div style={{ height: "10%" }}>
            <CreateRoomForm />
          </div>
        </Paper>
      </Container>
    </div>
  );
};

export default Rooms;
