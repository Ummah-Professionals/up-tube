import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { slowFetchJson } from "../utilities";
import GlobalHeader from './globalheader';
import Load from '../components/Load';
import NotFound from './NotFound';
import VideoAsset from "../components/VideoAsset";
import "./Home.css";

export const Home = () => {
  const [params, setParams] = useSearchParams();
  let page = parseInt(params.get("page"), 10);
  const page_size = parseInt(params.get("page_size"), 10) || 32;
  const query = params.get("query") || "";

  if (isNaN(page) || page < 1) {
    page = 1; // Default to page 1
    setParams({ page: '1', page_size: page_size.toString(), query });
  }

  const { data, error, isPending } = useQuery({
    queryKey: ["apiData", page, page_size],
    queryFn: () => slowFetchJson(`/api/feed?page_size=${page_size}&page=${page}`).then((json) => json),
  });

  
  const extractNumber = (str) => {
    const match = str.match(/\d+/);
    return match ? parseInt(match[0], 10) : null;
  };

  const calculateRelevance = (video, searchQuery, searchNum) => {
    const title = video.title.toLowerCase();
    const isExactMatch = title.includes(searchQuery.toLowerCase());
    const videoNum = extractNumber(video.title);

    
    let relevance = isExactMatch ? 1000 : 0;
    if (searchNum && videoNum !== null) {
      relevance += 100 / (1 + Math.abs(videoNum - searchNum));
    }

    return relevance;
  };

  
  const sortVideos = (videos, searchQuery) => {
    const searchNum = extractNumber(searchQuery);

    return videos
      .map(video => ({
        ...video,
        relevance: calculateRelevance(video, searchQuery, searchNum)
      }))
      .sort((a, b) => b.relevance - a.relevance); 
  };

  const handleNextPage = () => {
    setParams({ page: page + 1, page_size, query });
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setParams({ page: page - 1, page_size, query });
    }
  };

  const renderContent = () => {
    if (isPending) {
      return <Load />;
    }

    if (error) {
      return (
        <p>
          Got an error: <b>{error.message}</b>
        </p>
      );
    }

    if (data.videos.length === 0) {
      return <NotFound />;
    }

    const sortedVideos = sortVideos(data.videos, query);

    return (
      <div className="video-list">
        {sortedVideos.length > 0 ? (
          sortedVideos.map(video => (
            <VideoAsset key={video.id} video={video} />
          ))
        ) : (
          <NotFound />
        )}
      </div>
    );
  };

  return (
    <main>
      <GlobalHeader />
      {renderContent()}
      <div className="pagination-buttons">
        <button onClick={handlePrevPage} disabled={page === 1}>
          Previous
        </button>
        <button onClick={handleNextPage} disabled={data && data.videos.length < page_size}>
          Next
        </button>
      </div>
    </main>
  );
};

export default Home;