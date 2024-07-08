import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { slowFetchJson } from "../utilities";

export const Careers = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["apiData"],
    queryFn: () => slowFetchJson("/api").then((json) => json.message),
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

    return (
      <p>
        Our company motto is:
        <span className="api-text"> {data}</span>
      </p>
    );
  };

  return (
    <main>
      <h1>Careers page</h1>

      {renderContent()}

      <p>Here is a list of career areas we offer jobs in:</p>
      <li>Finance</li>
      <li>Information Technology</li>
      <li>Marketing</li>
      <li>Supply Chain Management</li><br></br>

      <Link to="/">Go to Home page</Link>
    </main>
  );
};