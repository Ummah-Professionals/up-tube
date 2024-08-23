import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import GlobalHeader from './globalheader';
import Load from '../components/Load'; 
import { NotFound } from './NotFound';
import { slowFetchJson } from '../utilities';

const Watch = () => {
  const { videoId = "" } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!videoId) {
      navigate('/'); 
      return;
    }

    const fetchVideo = async () => {
      try {
        setLoading(true);
        const response = await slowFetchJson(`/api/watchVideo/${videoId}`);
        
        if (response.success === false) {
          throw new Error(response.status_message);
        }

        setVideo(response);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchVideo();
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
          {video.recommendations && video.recommendations.map((rec) => (
            <div key={rec.id} className="recommendationItem">
              <a href={`/watch/${rec.id}`}>
                <img src={rec.thumbnail} alt={rec.title} />
              </a>
              <h3>{rec.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Watch;






  
   
    
    
  