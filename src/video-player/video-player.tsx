import React from 'react';
import { Player } from 'video-react';

import './video-player.css';

const VideoPlayer = ({ videoUrl }) => {
  return (
    <div className="video-wrapper">
      <Player src={videoUrl} 
      />
    </div>
  );
};

export { VideoPlayer };