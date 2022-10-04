import React from 'react';
import AgoraUIKit from "agora-react-uikit";
import { Link, useParams } from "react-router-dom";
import { Button } from '@mui/material';

const Video = ({ videocall, setVideocall }) => {
  const { roomId } = useParams();
  const props = {
    rtcProps: {
      appId: process.env.REACT_APP_AGORA_APPID,
      channel: roomId,
      token: null, // pass in channel token if the app is in secure mode
    },
    callbacks: {
      EndCall: () => {
        setVideocall(false);
        window.location.reload(false);
      },
    },
  };

  return (
    <div>
      {videocall ? (
        <div style={styles.container}>
          <AgoraUIKit rtcProps={props.rtcProps} callbacks={props.callbacks} />
        </div>
      ) : (
        <>
          <Button variant="contained" onClick={() => setVideocall(true)}>
            Start Call
          </Button>
          <Link to="/rooms" style={{ textDecoration: "none" }}>
            <Button variant="contained">Home</Button>
          </Link>
        </>
      )}
    </div>
  );
};

const styles = {
  container: { width: "100vw", height: "100vh", display: "flex", flex: 1 },
};

export default Video;
