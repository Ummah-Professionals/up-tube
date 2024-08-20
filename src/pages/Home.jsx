import GlobalHeader from "./globalheader";
import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchJson } from "../utilities";
import { NotFound } from "./NotFound";

const isValidIntegerInRange = (str) => {
  const parsed = parseInt(str, 10);
  const isValidInt =
    !isNaN(parsed) && Number.isInteger(parsed) && parsed.toString() === str;

  return isValidInt && parsed >= 1;
};

const getPageFromQueryParams = (params) => {
  const pageParam = params.get("page");

  return isValidIntegerInRange(pageParam) ? parseInt(pageParam) : 1;
};

export const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = getPageFromQueryParams(searchParams);

  const { isPending, error, data } = useQuery({
    queryKey: ["apiData", pageParam],
    queryFn: () => {
      return fetchJson(`/api/feed?page=${pageParam}&page_size=30`);
    },
  });

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

    const { current_page, total_pages, videos } = data;

    const isFirstPage = current_page === 1;
    const isLastPage = current_page === total_pages;
    const outOfBounds = total_pages < current_page || current_page < 1;

    return (
      <div>
        {outOfBounds ? null : (
          <>
            <button
              onClick={() => setSearchParams({ page: pageParam - 1 })}
              disabled={isFirstPage || outOfBounds}
            >
              Previous
            </button>
            <button
              onClick={() => setSearchParams({ page: pageParam + 1 })}
              disabled={isLastPage || outOfBounds}
            >
              Next
            </button>
          </>
        )}

        {videos.length === 0 ? (
          <NotFound />
        ) : (
          <ul>
            {videos.map((v) => {
              return (
                <Link key={v.id} to={`/watch?video=${v.id}`}>
                  <li className="video-tile">
                    <img src={v.thumbnail} />
                    <span>{v.duration_seconds}</span>
                    <h2>{v.title}</h2>
                    <h3>{v.user_username}</h3>
                    <span>{v.time_uploaded}</span>
                  </li>
                </Link>
              );
            })}
          </ul>
        )}
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
