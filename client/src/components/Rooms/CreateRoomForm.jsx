import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";
import { useCreateRoomMutation } from "../../redux/api";
import "../../index.css";
import "../../index.scss";

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
        <label className="fw-bold" htmlFor="roomName">Create new room</label>
        <form className="form-group d-flex" onSubmit={onSubmit}>
          <input
            required
            id="roomName"
            type="text"
            value={roomNameField}
            autoComplete="off"
            onChange={(e) => setRoomNameField(e.target.value)}
            className="form-control bg-light"
          />
          <button type="submit" value="submit" className="btn btn-primary">
            <AddIcon />
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateRoomForm;
