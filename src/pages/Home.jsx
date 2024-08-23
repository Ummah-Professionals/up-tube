import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import GlobalHeader from './globalheader';
import Load from '../components/Load';
import { NotFound } from './NotFound';
import VideoAsset from "../components/VideoAsset";
import { useQuery } from '@tanstack/react-query';
import { slowFetchJson } from '../utilities';
import "./Home.css";

export const Home = () => {
  const [params] = useSearchParams();
  const [sortedVideos, setSortedVideos] = useState([]);

  const page = params.get("page") || 1;
  const pageSize = params.get("page_size") || 52;
  const searchQuery = params.get("query") || '';

  const { data, error, isLoading } = useQuery({
    queryKey: ["apiData", page, pageSize],
    queryFn: () => slowFetchJson(`/api/feed?page_size=${pageSize}&page=${page}`).then((json) => json),
  });

  useEffect(() => {
    if (data) {
      let videos = data.videos;

      if (searchQuery) {
        videos = videos.map(video => ({
          ...video,
          score: video.title.toLowerCase().includes(searchQuery.toLowerCase()) ? 1 : 0
        }));

       
        videos.sort((a, b) => b.score - a.score);
      }

      setSortedVideos(videos);
    }
  }, [data, searchQuery]);

  if (isLoading) {
    return <Load />;
  }

  if (error) {
    return <p>Got an error: <b>{error.message}</b></p>;
  }

  if (sortedVideos.length === 0) {
    return <NotFound />;
  }

  return (
    <main>
      <GlobalHeader />
      <div className="video-list">
        {sortedVideos.length > 0 ? (
          sortedVideos.map(video => (
            <VideoAsset key={video.id} video={video} />
          ))
        ) : (
          <NotFound />
        )}
      </div>
    </main>
  );
};

export default Home;


