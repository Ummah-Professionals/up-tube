import GlobalHeader from './globalheader';
import { NotFound } from './NotFound';
import VideoAsset from "../components/VideoAsset";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { slowFetchJson } from "../utilities";
import "./Home.css";

export const Home = () => {

  const [params] = useSearchParams();

  const { data, error, isPending } = useQuery({
    queryKey: ["apiData"],
    queryFn: () => slowFetchJson("/api/feed?page_size=30&page=" + params.get("page")).then((json) => json),
  });

  console.log(params.get("page"));

  /*const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <Link key={i} to={`/?page=${i}&page_size=${pageSize}`} className={i === page ? 'active' : ''}>
          {i}
        </Link>
      );
    }
    return pages;
  };
  */

  console.log(data?.videos);

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
    if (data.videos.length === 0){
      return (
        <NotFound />
      );
    }

    return (
      <div className="video-list">
          {data.videos.map(video => (
           <VideoAsset key={video.id} video={video} />
         ))}
      </div>
    );
  };
  // <div className="pagination">
        // {renderPagination()}
      // </div>
    

  return (
    <main>
      <GlobalHeader />
      {renderContent()}

    </main>
    
  );
};

export default Home;
