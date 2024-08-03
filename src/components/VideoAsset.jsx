import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import './VideoAsset.css';

const VideoAsset = ({ video }) => {
  const timeAgo = formatDistanceToNow(new Date(video.date), { addSuffix: true });

  return (
    <div className="video-asset">
      <img src={video.thumbnail} alt={video.title} className="video-thumbnail" />
      <div className="video-info">
        <div className="video-title">{video.title}</div>
        <div className="video-meta">
          <span>{video.author}</span>
          <span>{timeAgo}</span>
        </div>
      </div>
    </div>
  );
};

export default VideoAsset;
