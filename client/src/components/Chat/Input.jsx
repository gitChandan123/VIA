import React from "react";
import { Button, TextField } from "@mui/material";

const Input = ({ setMessage, sendMessage, message }) => {
  return (
    <div style={{ padding:"10px",height: "20%" }}>
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
          size="small"
        />
        <Button variant="contained" onClick={(e) => sendMessage(e)}>Send</Button>
      </form>
    </div>
  );
};

export default Input;
