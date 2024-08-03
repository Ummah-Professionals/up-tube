import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { slowFetchJson } from "../utilities";
import VideoAsset from '../components/VideoAsset';
import mockVideos from '../mockVideos.json';
import './Home.css';

const videosPerPage = 8;

export const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { isPending, error, data } = useQuery({
    queryKey: ["apiData"],
    queryFn: () => slowFetchJson("/api").then((json) => json.message),
  });

  // Calculate the range of videos to display
  const startIndex = (currentPage - 1) * videosPerPage;
  const endIndex = startIndex + videosPerPage;
  const videoData = mockVideos.slice(startIndex, endIndex);

  const totalPages = Math.ceil(mockVideos.length / videosPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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

    return (
      <p>
        The message from the API is:
        <span className="api-text"> {data}</span>
      </p>
    );
  };

  return (
    <main>

      {renderContent()}

      <div className="video-list">
        {videoData.map((video) => (
          <VideoAsset key={video.id} video={video} />
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      <Link to="/about">Go to About page</Link>
    </main>
  );
};

export default Home;
