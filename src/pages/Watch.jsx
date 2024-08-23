import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import GlobalHeader from './globalheader';
import Load from '../components/Load'; 
import { NotFound } from './NotFound';
import { slowFetchJson } from '../utilities';
import VideoAsset from '../components/VideoAsset'; 

const Watch = () => {
  const { videoId = "" } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [feed, setFeed] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!videoId) {
      navigate('/'); 
      return;
    }

    const fetchVideoAndFeed = async () => {
      try {
        setLoading(true);
        const videoResponse = await slowFetchJson(`/api/watchVideo/${videoId}`);
        
        if (videoResponse.success === false) {
          throw new Error(videoResponse.status_message);
        }
        
        const feedResponse = await slowFetchJson(`/api/feed?page_size=10&page=1`); 
        
        if (feedResponse.success === false) {
          throw new Error(feedResponse.status_message);
        }

        setVideo(videoResponse);
        setFeed(feedResponse.videos);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchVideoAndFeed();
  }, [videoId, navigate]);

  if (loading) {
    return <Load />;
  }

  if (error) {
    return <NotFound />;
  }

  if (!video) {
    return <NotFound />;
  }

  const filteredFeed = feed.filter(v => v.id !== video.id);

  return (
    <div>
      <GlobalHeader />
      <div className="container">
        <div className="videoColumn">
          <video
            controls
            src={video.video_path}
            poster={video.thumbnail}
          />
          <div className="metadata">
            <h1 className="title">{video.title}</h1>
            <p className="description">{video.description}</p>
            <div className="details">
              <span className="detailItem"><strong>Uploaded by:</strong> {video.user_username}</span>
              <span className="detailItem"><strong>Duration:</strong> {video.duration_seconds} seconds</span>
              <span className="detailItem"><strong>Uploaded on:</strong> {new Date(video.time_uploaded).toLocaleDateString()}</span>
              <span className="detailItem"><strong>Views:</strong> {video.views}</span>
            </div>
          </div>
        </div>
        <div className="recommendationsColumn">
          {filteredFeed.length > 0 ? (
            filteredFeed.map((rec) => (
              <VideoAsset key={rec.id} video={rec} />
            ))
          ) : (
            <p>No recommendations available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Watch;









  
   
    
    
  