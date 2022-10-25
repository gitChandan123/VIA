import React from "react";
import moment from "moment";
import { Avatar } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import "./chat.css";
import "../../index.scss";

const Message = ({ message, name, userId }) => {
  let isSentByCurrentUser = false;

  if (message.senderId === userId) {
    isSentByCurrentUser = true;
  }
  return isSentByCurrentUser ? (
    <div className="row justify-content-end pl-5 ">
      <div className="rec d-flex flex-column align-items-end m-2 shadow p-2  border rounded w-auto">
        <div>
          <em className="m-1 flex-start fw-bold text-uppercase">{name}</em>
          <em className="m-1 flex-end" style={{ fontSize: "10px" }}>
            {moment(message.timestamp).format("DD/MM hh:mm")}
          </em>
        </div>
        <h6 className="m-1">{message.message}</h6>
      </div>
    </div>
  ) : (
    <div className="row justify-content-start pl-5 ">
      <Avatar sx={{ marginTop: "12px" }}>
        <PersonIcon />
      </Avatar>
      <div className="sen d-flex flex-column align-items-end my-2 shadow p-2 border rounded w-auto">
        <div>
          <em className="m-1 flex-start fw-bold text-uppercase">
            {message.sender}
          </em>
          <em className="m-1 flex-end" style={{ fontSize: "10px" }}>
            {moment(message.timestamp).format("DD/MM hh:mm")}
          </em>
        </div>
        <h6 className="m-1">{message.message}</h6>
      </div>
    </div>
  );
};

export default Message;
