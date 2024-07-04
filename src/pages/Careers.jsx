import { Link } from "react-router-dom";

export const Careers = () => {
  return (
    <main>
      <h1>Careers page</h1>

      <p>Here is a list of career areas we offer jobs in:</p>
      <li>Finance</li>
      <li>Information Technology</li>
      <li>Marketing</li>
      <li>Supply Chain Management</li><br></br>

      <Link to="/">Go to Home page</Link>
    </main>
  );
};