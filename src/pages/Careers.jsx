import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { slowFetchJson } from "../utilities";

export const Careers = () => {
  const { isPending: isPendingApi1, error: errorApi1, data: dataApi1 } = useQuery({
    queryKey: ["apiData"],
    queryFn: () => slowFetchJson("/api1.0").then((json) => json.message),
  });

  const { isPending: isPendingApi2, error: errorApi2, data: dataApi2 } = useQuery({
    queryKey: ["api2Data"],
    queryFn: () => slowFetchJson("/api2.0").then((json) => json.message),
  }); 

  const renderContent = () => {
    if (isPendingApi1 || isPendingApi2) {
      return <p>Loading, please wait...</p>;
    }

    if (errorApi1 || errorApi2) {
      return (
        <p>
          Got an error: <b>{errorApi1 ? errorApi1.message : errorApi2.message}</b>
        </p>
      );
    }

    return (
      <div>
        <p>
          Our company motto is:
          <span className="api-text"> {dataApi1}</span>
        </p>
        <p>
          In the company,
          <span className="api-text"> {dataApi2}</span>
        </p>
      </div>
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