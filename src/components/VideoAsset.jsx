import { toRelativeTime, formatVideoViews } from '../utilities';
import './VideoAsset.css';

const VideoAsset = ({ video }) => {
    const timeAgo = toRelativeTime(video.time_uploaded);
  

  return (
    <div className="video-asset">
      <a href={`/watch/${video.id}`}>
      <img src={video.thumbnail} alt={video.title} className="video-thumbnail" />
      </a>
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
