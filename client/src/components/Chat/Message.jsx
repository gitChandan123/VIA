import React from "react";
import {Paper} from "@mui/material";

const Message = ({ message, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if (message.sender === trimmedName) {
    isSentByCurrentUser = true;
  }
  return isSentByCurrentUser ? (

    <div>
      <p>{name}</p>
      <Paper>{message.message}</Paper>
    </div>
  ) : (
    <div>
      <p>{message.sender}</p>
      <Paper>{message.message}</Paper>
    </div>
  );
};

export default Message;
