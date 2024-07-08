import { Link } from "react-router-dom";

export const Store = () => {
  return (
    <main>
      <h1>Store</h1>

      <p>Whoops! Looks like the store is empty.</p>

      <Link to="/">Go to Home page</Link>
    </main>
  );
};
