import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import GlobalHeader from './globalheader';
import Load from '../components/Load'; 
import { NotFound } from './NotFound';
import { fetchJson } from '../utilities'; // Ensure fetchJson is used for querying

const fetchVideo = async (videoId) => {
  const response = await fetchJson(`/api/videos/${videoId}`);
  return response;
};

const Watch = () => {
  const { videoId = "" } = useParams(); 
  const navigate = useNavigate();

  const {
    data: video,
    error,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['video', videoId],
    queryFn: () => fetchVideo(videoId),
    enabled: !!videoId, // Only run the query if videoId is available
  });

  React.useEffect(() => {
    if (!videoId) {
      navigate('/'); 
    }
  }, [videoId, navigate]);

  if (isLoading) {
    return <Load />;
  }

  if (isError || !video) {
    return <NotFound />;
  }

  return (
    <div>
      <GlobalHeader />
      <div className="container">
        <div className="videoColumn">
          <video
            controls
            src={video.url}
            poster={video.thumbnail}
          />
          <div className="metadata">
            <h1 className="title">{video.title}</h1>
            <p className="description">{video.description}</p>
            <div className="details">
              <span className="detailItem"><strong>Uploaded by:</strong> {video.uploader}</span>
              <span className="detailItem"><strong>Duration:</strong> {video.duration}</span>
              <span className="detailItem"><strong>Uploaded on:</strong> {video.uploadDate}</span>
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





  
   
    
    
  