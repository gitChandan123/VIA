import React, { useState } from "react";
import {
  Backdrop,
  Button,
  CircularProgress,
  ListItemText,
  MenuItem,
  MenuList,
} from "@mui/material";
import { useAddUserInRoomMutation, useGetUsersQuery } from "../../redux/api";
import { useEffect } from "react";
import { toast } from "react-toastify";

const AddUserInRoom = ({ roomId, usersInRoom }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { data: users, isSuccess } = useGetUsersQuery();

  const [
    addUserInRoom,
    { isLoading, isSuccess: addUserSuccess, isError, error },
  ] = useAddUserInRoomMutation();

  const [searchTerm, setSearchTerm] = useState("");

  const handleClick = async (newUser) => {
    await addUserInRoom({ userId: user._id, roomId, newUserId: newUser._id });
  };

  useEffect(() => {
    if (addUserSuccess) {
      toast.success("User Added");
      window.location.reload(false);
    }
    if (isError) {
      toast.error(error.message);
    }
    //eslint-disable-next-line
  }, [isLoading]);

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div>
        <input
          placeholder="Search User..."
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginTop: "10px" }}
          className="form-control bg-light"
        />
        <br />
        <div>
          {isSuccess && (
            <MenuList>
              {users
                .filter((user) => {
                  if (
                    usersInRoom.some((newUser) => newUser.userId === user._id)
                  )
                    return false;
                  if (searchTerm === "") return true;
                  else if (
                    user.name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    user.email.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                    return true;
                  return false;
                })
                .map((newUser) => (
                  <MenuItem key={newUser._id}>
                    <ListItemText>
                      <h3>{newUser.name}</h3>
                      <p>{newUser.email}</p>
                    </ListItemText>
                    <Button
                      variant="contained"
                      onClick={() => handleClick(newUser)}
                    >
                      Add
                    </Button>
                  </MenuItem>
                ))}
            </MenuList>
          )}
        </div>
      </div>
    </>
  );
};

export default AddUserInRoom;
