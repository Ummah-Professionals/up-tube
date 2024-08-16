import { useState } from 'react';
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { slowFetchJson } from "../utilities";
import GlobalHeader from './globalheader';
import VideoAsset from '../components/VideoAsset';
import mockVideos from '../mockVideos.json';
import './Home.css';

export const Home = () => {
  //const { isPending, error, data } = useQuery({
    //queryKey: ["apiData"],
    //queryFn: () => slowFetchJson("/api").then((json) => json.message),
  //});
  const isPending = false;
  const error = null;

  const videoData = mockVideos;

  const renderContent = () => {
    if (isPending) {
      return <p>Loading, please wait...</p>;
    }

    if (error) {
      return (
        <p>
          Got an error: <b>{error.message}</b>
        </p>
      );
    }
//<span className="api-text"> {data}</span>
    return (
      <p>
        The message from the API is:
    
        <span className="api-text"> Simulated API data </span>
      </p>
    );
  };

  return (
    <main>
      <GlobalHeader />
      {renderContent()}

      <div className="video-list">
        {videoData.map((video) => (
          <VideoAsset key={video.id} video={video} />
        ))}
      </div>

      <Link to="/about">Go to About page</Link>
      <br></br>
      <br></br>
      <Link to="/settings">Click to watch a sample video</Link>
    </main>
  );
};

export default Home;
