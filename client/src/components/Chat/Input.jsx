import React, { useEffect, useState } from "react";
import { Tooltip } from "@mui/material";
import MicSharpIcon from "@mui/icons-material/MicSharp";
import MicOffSharpIcon from "@mui/icons-material/MicOffSharp";
import SendIcon from "@mui/icons-material/Send";
import "../../index.css";
import "../../index.scss";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = "en-US";

const Input = ({
  room,
  userId,
  typingHandler,
  setMessage,
  sendMessage,
  message,
}) => {
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    handleListen();
    //eslint-disable-next-line
  }, [isListening]);

  const handleListen = () => {
    if (isListening) {
      mic.start();
      mic.onend = () => {
        console.log("continue..");
        mic.start();
      };
    } else {
      mic.stop();
      mic.onend = () => {
        console.log("Stopped Mic on Click");
      };
    }
    mic.onstart = () => {
      console.log("Mics on");
    };

    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      console.log(transcript);
      setMessage(transcript);
      mic.onerror = (event) => {
        console.log(event.error);
      };
    };
  };

  if (room.isProtected === false || room.host === userId) {
    return (
      <div className="foot form-group d-flex">
        <input
          id="message"
          placeholder="Type a message..."
          value={message}
          className="form-control bg-light"
          onChange={typingHandler}
          onKeyPress={(event) =>
            event.key === "Enter" ? sendMessage(event) : null
          }
        />
        {isListening ? (
          <Tooltip arrow title="🔴Stop Listening">
            <button
              onClick={() => setIsListening((prevState) => !prevState)}
              className="btn btn-danger mx-2"
            >
              <MicOffSharpIcon />
            </button>
          </Tooltip>
        ) : (
          <Tooltip arrow title="👂Start Listening">
            <button
              onClick={() => setIsListening((prevState) => !prevState)}
              className="btn btn-primary mx-2"
            >
              <MicSharpIcon />
            </button>
          </Tooltip>
        )}
        <button
          onClick={(e) => sendMessage(e)}
          className="btn btn-primary mr-2"
        >
          <SendIcon />
        </button>
      </div>
    );
  } else {
    return (
      <div className="foot">
        <h4>Only host can send message.</h4>
      </div>
    );
  }
};

export default Input;
