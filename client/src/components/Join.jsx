import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, TextField } from "@mui/material";

const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <div>
      <TextField
        id="name"
        label="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        id="room"
        label="room"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
      />
      <Link
        onClick={(e) => (!name || !room ? e.preventDefault() : null)}
        to={`/chat?name=${name}&room=${room}`}
      >
        <Button variant="contained" color="primary" type="submit">
          Join Room
        </Button>
      </Link>
    </div>
  );
};

export default Join;
