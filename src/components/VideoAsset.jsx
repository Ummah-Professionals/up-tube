import { toRelativeTime, formatVideoViews } from '../utilities';
import './VideoAsset.css';

const VideoAsset = ({ video }) => {
    const timeAgo = toRelativeTime(video.time_uploaded);
  

  return (
    <div className="video-asset">
      <img src={"https://flymeflag.com/cdn/shop/products/Palestine-Flags-Flag_1e2d848c-16d0-49e9-b469-7b9507ba3904.jpg?v=1628782911&width=550"} alt={video.title} className="video-thumbnail" />
      <div className="video-info">
        <div className="video-title">{video.title}</div>
        <div className="video-meta">
          <span>{video.user_username}</span>
          <span>{timeAgo}</span>
          <span>{formatVideoViews(video.views)} views </span>
        </div>
      </div>
    </div>
  );
};

export default VideoAsset;
