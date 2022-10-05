import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";
import { useCreateRoomMutation } from "../../redux/api";

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
    <>
    <div className="foot2">

      <form onSubmit={onSubmit}>
      <label className="db fw6 lh-copy f6">Create a New Room</label>
        <input
          required
          id="roomName"
          label="Create new room..."
          type="text"
          value={roomNameField}
          autoComplete="off"
          onChange={(e) => setRoomNameField(e.target.value)}
         
        />
        <Button
          variant="contained"
          type="submit"
          value="submit"
          sx={{ borderRadius: 25 }}
        >
          <AddIcon />
        </Button>
      </form>
    </div>
    </>
  );
};

export default CreateRoomForm;
