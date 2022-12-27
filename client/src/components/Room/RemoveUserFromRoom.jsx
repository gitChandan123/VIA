import {
  Backdrop,
  Button,
  CircularProgress,
  ListItemText,
  MenuItem,
  MenuList,
} from "@mui/material";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useRemoveUserFromRoomMutation } from "../../redux/api";

const RemoveUserFromRoom = ({ roomId, usersInRoom }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [removeUserFromRoom, { isSuccess, isLoading, isError, error }] =
    useRemoveUserFromRoomMutation();

  const handleClick = async (newUserId) => {
    await removeUserFromRoom({
      userId: user._id,
      roomId,
      newUserId,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("User Removed");
      window.location.reload(false);
    }
    if (isError) {
      toast.error(error.message);
    }
    //eslint-disable-next-line
  }, [isSuccess, isError]);

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <MenuList>
        {usersInRoom
          .filter((newUser) => newUser.userId !== user._id)
          .map((newUser) => (
            <MenuItem key={newUser.userId}>
              <ListItemText>
                <h3>{newUser.userName}</h3>
              </ListItemText>
              <Button
                variant="contained"
                onClick={() => handleClick(newUser.userId)}
              >
                Remove
              </Button>
            </MenuItem>
          ))}
      </MenuList>
    </>
  );
};
export default RemoveUserFromRoom;
