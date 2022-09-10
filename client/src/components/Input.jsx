import React from "react";
import { Button, TextField } from "@mui/material";

const Input = ({ setMessage, sendMessage, message }) => {
  return (
    <>
      <form>
        <TextField
          id="message"
          variant="outlined"
          label="message"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(event) =>
            event.key === "Enter" ? sendMessage(event) : null
          }
        />
        <Button onClick={(e) => sendMessage(e)}>Send</Button>
      </form>
    </>
  );
};

export default Input;
