import React, { useState, useEffect } from "react";
import ReactHlsPlayer from 'react-hls-player';
import ReactHLS from 'react-hls';

const PlayStream = ({stream}) => {
  // const [playerRef, setPlayerRef] = useState(null);

  // useEffect(() => {
  //   return () => {
  //     if (playerRef) playerRef.stop();
  //   };
  // }, []);

  return (
    // <ReactHlsPlayer
    //   src={stream}
    //   autoPlay={true}
    //   controls={false}
    // />
    <>
    <ReactHLS 
      url={stream} 
      autoplay={true}
    />
    </>
  );
};

export default PlayStream;