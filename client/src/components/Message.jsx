import React from "react";
import {Paper} from "@mui/material";

const Message = ({ message: { user,text }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }
  return (isSentByCurrentUser ? (
    <>
      <p>{name}</p>
      <Paper>{text}</Paper>
    </>
  ) : (
    <>
      <p>{user}</p>
      <Paper>{text}</Paper>
    </>
  ));
};

export default Message;
