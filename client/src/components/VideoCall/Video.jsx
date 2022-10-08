import React from "react";
import AgoraUIKit from "agora-react-uikit";
import { useParams } from "react-router-dom";
import CallWaiting from "./CallWaiting";

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
        <CallWaiting roomId={roomId} setVideocall={setVideocall} />
      )}
    </div>
  );
};

const styles = {
  container: { width: "100vw", height: "100vh", display: "flex", flex: 1 },
};

export default Video;
