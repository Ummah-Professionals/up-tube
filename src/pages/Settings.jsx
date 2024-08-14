import React, { useRef } from 'react';
import GlobalHeader from './globalheader';

export const Settings = () => {
  const video = {
    url: 'videoplayback.mp4',
  thumbnail: 'Screenshot (32).png',
  title: 'Funny fat rabbit wakes up to a new day',
  uploader: 'Harun Incekara',
  description: 'A funny fat rabbit wakes up to a new day',
  duration: '~6 Seconds',
  uploadDate: '2024-07-26',
  views: '7.9 Billion'
  };

  const recommendations = [
    { id: 1, title: '10 minutes of Harun failing to get his code to work', thumbnail: 'ugh1.jpg' },
    { id: 2, title: '10 minutes of Harun failing to get his code to work Part 2', thumbnail: 'ugh2.jpg' },
    { id: 3, title: '10 minutes of Harun failing to get his code to work Part 3', thumbnail: 'ugh3.jpg' },
    { id: 4, title: 'This', thumbnail: 'download.jpg' },
    { id: 5, title: 'is', thumbnail: 'download.jpg' },
    { id: 6, title: 'where', thumbnail: 'download.jpg' },
    { id: 7, title: 'all', thumbnail: 'download.jpg' },
    { id: 8, title: 'of', thumbnail: 'download.jpg' },
    { id: 9, title: 'the', thumbnail: 'download.jpg' },
    { id: 10, title: 'recommended', thumbnail: 'download.jpg' },
    { id: 11, title: 'videos', thumbnail: 'download.jpg' },
    { id: 12, title: 'will', thumbnail: 'download.jpg' },
    { id: 13, title: 'appear', thumbnail: 'download.jpg' },
    { id: 14, title: 'Inshallah', thumbnail: 'download.jpg' },
    { id: 15, title: ':)', thumbnail: 'download.jpg' },
  ];

  return (
    <div> <GlobalHeader />
    <div className="container">
      <div className="videoColumn">
        <div className="videoWrapper">
          <video
            controls
            className="videoPlayer"
            src={video.url}
            poster={video.thumbnail}
            onError={(e) => console.error('Error loading video:', e)}
          >
          </video>
        </div>
        <div className="metadata">
          <h1 className="title">{video.title}</h1>
          <p className="description">{video.description}</p>
          <div className="details">
          <span className="detailItem">
  <strong>Uploaded by:</strong> {video.uploader}
</span>

            <span className="detailItem">
              <strong>Duration:</strong> {video.duration}
            </span>
            <span className="detailItem">
              <strong>Uploaded on:</strong> {video.uploadDate}
            </span>
            <span className="detailItem">
              <strong>Views:</strong> {video.views}
            </span>
          </div>
        </div>
      </div>
      <div className="recommendationsColumn">
        {recommendations.map((rec) => (
          <div key={rec.id} className="recommendationItem">
            <img src={rec.thumbnail} alt={rec.title} />
            <h3>{rec.title}</h3>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};



  
   
    
    
  