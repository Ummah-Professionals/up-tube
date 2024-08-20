import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchJson, formatVideoViews, toRelativeTime } from "../utilities";

export const Watch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const video = searchParams.get("video");
  const navigate = useNavigate();

  useEffect(() => {
    if (!video) navigate("/");
  }, [video, navigate]);

  const { isPending, error, data } = useQuery({
    queryKey: [video],
    queryFn: () => {
      return fetchJson(`/api/watchVideo/${video}`);
    },
  });

  console.log(data);

  const renderContent = () => {
    if (isPending) {
      return <p>Loading video...</p>;
    }

    if (error) {
      return (
        <p>
          Got an error: <b>{error.message}</b>
        </p>
      );
    }

    const {
      description,
      duration_seconds,
      id,
      thumbnail,
      time_uploaded,
      title,
      user_id,
      user_profile_pic_path,
      user_username,
      video_path,
      views,
    } = data;

    return (
      <div>
        <video src={video_path} controls />
        <h1>{title}</h1>
        <h2>
          <span>{user_username}</span> -{" "}
          <span>{toRelativeTime(time_uploaded)}</span>
        </h2>

        <span>{formatVideoViews(views)} views</span>
      </div>
    );
  };

  return <main>{renderContent()}</main>;
};
