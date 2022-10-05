import React from "react";
import {Paper} from "@mui/material";
import './chat.css'

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
                                <em className="m-1 white">{name}</em> 
                            </div>
                            <h4 className="m-1 white">{message.message}</h4>
                        </div>
                    </div>
  ) : (

    <div className="row justify-content-start pl-5 ">
    <div className="sen d-flex flex-column align-items-end m-2 shadow p-2 border rounded w-auto">
        <div>
            <em className="m-1">{message.sender}</em>
            
        </div>
        <h4 className="m-1">{message.message}</h4>
    </div>
</div>
  );
};

export default Message;
