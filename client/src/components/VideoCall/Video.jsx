import React from "react";
import AgoraUIKit from "agora-react-uikit";
import { useParams } from "react-router-dom";
import CallWaiting from "./CallWaiting";
import { useDispatch } from "react-redux";
import { AppBar, Button, styled, Toolbar, Typography } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import { toggleCallActive } from "../../redux/callreducer";
import { grey } from "@mui/material/colors";
import Room from "../Room/Room";
import "./video.css";

const Video = ({ videocall, setVideocall }) => {
  const BlackButton = styled(Button)(() => ({
    color: grey.A100,
    borderRadius: "25px",
    margin: "2px",
    backgroundColor: grey[900],
    "&:hover": {
      backgroundColor: grey[800],
    },
  }));

  const { roomId } = useParams();
  const dispatch = useDispatch();

  const props = {
    rtcProps: {
      appId: process.env.REACT_APP_AGORA_APPID,
      channel: roomId,
      token: null, // pass in channel token if the app is in secure mode
    },
    callbacks: {
      EndCall: () => {
        dispatch(toggleCallActive());
        setVideocall(false);
        window.location.reload(false);
      },
    },
  };

  return (
    <>
      {videocall ? (
        <>
          <AppBar position="fixed" elevation={6}>
            <Toolbar variant="dense">
              <Typography sx={{ flexGrow: 1 }}></Typography>
              <BlackButton
                variant="contained"
                startIcon={<ChatIcon />}
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasScrolling"
                aria-controls="offcanvasScrolling"
              >
                Chat
              </BlackButton>
            </Toolbar>
          </AppBar>
          <div style={styles.container}>
            <AgoraUIKit rtcProps={props.rtcProps} callbacks={props.callbacks} />
          </div>
          <div
            class="offcanvas offcanvas-end"
            data-bs-scroll="true"
            data-bs-backdrop="false"
            tabindex="-1"
            id="offcanvasScrolling"
            aria-labelledby="offcanvasScrollingLabel"
          >
            <div class="offcanvas-body">
              <Room />
            </div>
          </div>
        </>
      ) : (
        <CallWaiting roomId={roomId} setVideocall={setVideocall} />
      )}
    </>
  );
};

const styles = {
  container: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    flex: 1,
    paddingTop: "48px",
  },
};

export default Video;
