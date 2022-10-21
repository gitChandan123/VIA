import React from "react";
import moment from "moment";
import "./chat.css";
import "../../index.scss";

const Message = ({ message, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if (message.sender === trimmedName) {
    isSentByCurrentUser = true;
  }
  return isSentByCurrentUser ? (
    <div className="row justify-content-end pl-5 ">
      <div className="rec d-flex flex-column align-items-end m-2 shadow p-2  border rounded w-auto">
        <div>
          <em className="m-1 flex-start fw-bold">{name}</em>
          <em className="m-1 flex-end">
            {moment(message.timestamp).format("DD/MM hh:mm")}
          </em>
        </div>
        <h6 className="m-1">{message.message}</h6>
      </div>
    </div>
  ) : (
    <div className="row justify-content-start pl-5 ">
      <div className="sen d-flex flex-column align-items-end m-2 shadow p-2 border rounded w-auto">
        <div>
          <em className="m-1 flex-start fw-bold">{message.sender}</em>
          <em className="m-1 flex-end">
            {moment(message.timestamp).format("DD/MM hh:mm")}
          </em>
        </div>
        <h6 className="m-1">{message.message}</h6>
      </div>
    </div>
  );
};

export default Message;
