import React, { useEffect, useState } from "react";
import AgoraUIKit, { layout } from "agora-react-uikit";
import { useParams } from "react-router-dom";
import CallWaiting from "./CallWaiting";
import { useDispatch } from "react-redux";
import { AppBar, Button, styled, Toolbar, Typography } from "@mui/material";
import PushPinIcon from "@mui/icons-material/PushPin";
import GridViewIcon from "@mui/icons-material/GridView";
import ChatIcon from "@mui/icons-material/Chat";
import { toggleCallActive } from "../../redux/callreducer";
import { grey } from "@mui/material/colors";
import Room from "../Room/Room";
import { useGetRoomQuery } from "../../redux/api";

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
  const user = JSON.parse(localStorage.getItem("user"));
  const [isProtected, setIsProtected] = useState(true);
  const [isHost, setHost] = useState(false);
  const [isPinned, setPinned] = useState(true);

  const { data: room, isSuccess } = useGetRoomQuery({
    userId: user._id,
    roomId,
  });

  useEffect(() => {
    if (isSuccess) {
      setIsProtected(room.isProtected);
      setHost(room.isProtected ? room.host === user._id : true);
    }
    //eslint-disable-next-line
  }, [isSuccess]);

  const props = {
    rtcProps: {
      appId: process.env.REACT_APP_AGORA_APPID,
      channel: roomId,
      token: null, // pass in channel token if the app is in secure mode
      role: isHost ? "host" : "audience",
      layout: isPinned ? layout.pin : layout.grid,
      enableScreensharing: true,
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
              {!isProtected && (
                <BlackButton
                  variant="contained"
                  startIcon={isPinned ? <GridViewIcon /> : <PushPinIcon />}
                  onClick={() => setPinned(!isPinned)}
                >
                  {isPinned ? "Grid" : "Pinned"}
                </BlackButton>
              )}
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
            className="offcanvas offcanvas-end"
            data-bs-scroll="true"
            data-bs-backdrop="false"
            tabIndex="-1"
            id="offcanvasScrolling"
            aria-labelledby="offcanvasScrollingLabel"
          >
            <div className="offcanvas-body">
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
