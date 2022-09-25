import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useCreateRoomMutation } from "../redux/api";

const CreateRoomForm = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [createRoom] = useCreateRoomMutation();
  const [roomNameField, setRoomNameField] = useState("");

  const onSubmit = async (val) => {
    const data = {
      roomName: roomNameField,
      userId: user._id,
    };
    val.preventDefault();
    await toast.promise(createRoom(data), {
      pending: "Creating Room",
      success: "Room created 👌",
      error: "Unable to create room 🤯",
    });
    setRoomNameField("");
  };


  return (
    <div>
      <form onSubmit={onSubmit}>
        <TextField
          required
          variant="outlined"
          id="roomName"
          label="Room Name"
          type="text"
          value={roomNameField}
          onChange={(e) => setRoomNameField(e.target.value)}
          style={{ marginTop: "10px", width: "28vw" }}
        />
        <br />
        <Button
          variant="contained"
          type="submit"
          value="submit"
          style={{ marginTop: "10px" }}
        >
          Create Room
        </Button>
      </form>
    </div>
  );
};

export default CreateRoomForm;
