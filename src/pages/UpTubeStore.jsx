import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { slowFetchJson } from "../utilities";

export const Store = () => {
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
            <span className="api-text"> {data}</span>
          </p>
        );
      };


  return (
    <main>
      <h1>Store</h1>

      {renderContent()}

      <p>Whoops! Looks like the store is empty.<br></br>
      Be on the lookout for a premium subscription, and UpTube merchandise!
      </p>
      <Link to="/">Go to Home page</Link>
    </main>
  );
};
