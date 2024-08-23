import GlobalHeader from './globalheader';
import { NotFound } from './NotFound';
import VideoAsset from "../components/VideoAsset";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { slowFetchJson } from "../utilities";
import Load from "../components/Load";  
import "./Home.css";

export const Home = () => {
  const [params] = useSearchParams();
  const page = params.get("page") || 1;
  const page_size = params.get("page_size") || 52;

  const { data, error, isPending } = useQuery({
    queryKey: ["apiData", page, page_size],
    queryFn: () => slowFetchJson(`/api/feed?page_size=${page_size}&page=${page}`).then((json) => json),
  }); 

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

    if (data?.videos.length === 0) {
      return <NotFound />;
    }

    return (
      <div className="video-list">
        {data.videos.map(video => (
          <VideoAsset key={video.id} video={video} />
        ))}
      </div>
    );
  };

  return (
    <main>
      <GlobalHeader />
      {renderContent()}
    </main>
  );
};

export default Home;

