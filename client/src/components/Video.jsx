import React, { useState } from 'react';
import AgoraUIKit from "agora-react-uikit";

const Video = () => {
  const [videocall, setVideocall] = useState(true);
  const props = {
    rtcProps: {
      appId: process.env.REACT_APP_AGORA_APPID,
      channel: "test",
      token: null, // pass in channel token if the app is in secure mode
    },
    callbacks: {
      EndCall: () => setVideocall(false),
    },
  };
  return (
    <div style={styles.container}>
      {videocall ? (
        <AgoraUIKit rtcProps={props.rtcProps} callbacks={props.callbacks} />
      ) : null}
    </div>
  );
};

const styles = {
  container: { width: "100vw", height: "100vh", display: "flex", flex: 1 },
};

export default Video