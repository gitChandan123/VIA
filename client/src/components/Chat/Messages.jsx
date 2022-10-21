import React from "react";
import Message from "./Message";
import "../../index.scss";

const Messages = ({ messages, name }) => {
  return (
    <div className="messages">
      {messages.map((message, i) => (
        <div key={i}>
          <Message message={message} name={name} />
        </div>
      ))}
    </div>
  );
};

export default Messages;
