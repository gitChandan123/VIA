import React, { useState } from "react";
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
          <button type="submit" value="submit" className="btn btn-primary mx-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-plus-lg"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
              />
            </svg>
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateRoomForm;
