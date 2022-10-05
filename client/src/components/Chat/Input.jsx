import React from "react";
import { Button, TextField } from "@mui/material";
import '../../index.css'
const Input = ({ setMessage, sendMessage, message }) => {
  return (
    // <div style={{ padding:"10px",height: "20%" }}>
    //   <form>
    //     <TextField
    //       id="message"
    //       variant="outlined"
    //       label="message"
    //       placeholder="Type a message..."
    //       value={message}
    //       onChange={(e) => setMessage(e.target.value)}
    //       onKeyPress={(event) =>
    //         event.key === "Enter" ? sendMessage(event) : null
    //       }
    //       size="small"
    //     />
    //     <Button variant="contained" onClick={(e) => sendMessage(e)}>Send</Button>
    //   </form>
    // </div>


<div className="foot form-group d-flex">
<input id="message" 
          placeholder="Type a message..."
          value={message}
          className="form-control bg-light"
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(event) =>
            event.key === "Enter" ? sendMessage(event) : null
          }
/>
<button onClick={(e) => sendMessage(e)} className="btn btn-primary mx-2"  >
   
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"></path>
        </svg>
                        </button>   
</div>
  );
};

export default Input;
