import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { slowFetchJson } from "../utilities";
import GlobalHeader from './globalheader';
import Load from '../components/Load';
import NotFound from './NotFound';
import VideoAsset from "../components/VideoAsset";
import Error from '../components/Error';
import "./Home.css";

export const Home = () => {
  const [params, setParams] = useSearchParams();
  let page = parseInt(params.get("page"), 10) || 1;
  const page_size = parseInt(params.get("page_size"), 10) || 32;
  const searchQuery = params.get("searchQuery") || "";

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["apiData", page, page_size, searchQuery],
    queryFn: () => slowFetchJson(`/api/feed?page_size=${page_size}&page=${page}&searchQuery=${searchQuery}`).then((json) => json),
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
    setParams({ page: page + 1, page_size, searchQuery });
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setParams({ page: page - 1, page_size, searchQuery });
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return <Load />;
    }

    if (error) {
      return <Error onRetry={refetch} />;
    }

    if (data.videos.length === 0) {
      return <NotFound />;
    }

    const sortedVideos = sortVideos(data.videos, searchQuery);

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
      {!error && (
        <div className="pagination-buttons">
          <button onClick={handlePrevPage} disabled={page === 1}><img src="/Vector_Prev.png" alt="Prev"/></button>
          { <span className="page-info">Page {page}</span> }
          <button onClick={handleNextPage} disabled={data && data.videos.length < page_size}><img src="/Vector.png" alt="Next"/></button>
        </div>
      )}
    </main>
  );
};

export default Home;


