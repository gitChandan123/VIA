import React from "react";
import Message from "./Message";
import "../../index.scss";

const Messages = ({ messages, name, userId }) => {
  return (
    <div className="messages">
      {messages.map((message, i) => (
        <div key={i}>
          <Message message={message} name={name} userId={userId} />
        </div>
      ))}
    </div>
  );
};

export default Messages;
