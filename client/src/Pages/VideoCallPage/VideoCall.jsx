import React, { useState } from "react";
import Video from "../../components/VideoCall/Video";

const VideoCall = () => {
  const [videocall, setVideocall] = useState(false);
  return (
    <>
      <Video videocall={videocall} setVideocall={setVideocall} />
    </>
  );
};

export default VideoCall;
