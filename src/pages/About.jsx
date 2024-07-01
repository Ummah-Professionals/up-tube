import { Link } from "react-router-dom";

export const About = () => {
  return (
    <main>
      <h1>About page</h1>

      <p>This is a simple page with static content.</p>

      <Link to="/">Go to Home page</Link>
    </main>
  );
};
