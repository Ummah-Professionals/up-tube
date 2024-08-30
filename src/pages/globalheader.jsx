import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";

const GlobalHeader = () => {
  const [params, setParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(params.get("searchQuery") || "");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setParams({ searchQuery: searchQuery, page: '1', page_size: params.get("page_size") || '32' });
  };

  return (
    <header className="global-header">
      <div className="logo">
        <Link to="/">
          <img src="/fowealuplogo.png" alt="Logo" />
        </Link>
      </div>
      <form className="search-form" onSubmit={handleSearchSubmit}>
        <input 
          type="text" 
          value={searchQuery} 
          onChange={handleSearchChange} 
          placeholder="Search"
        />
         <button className="centered-button" type="submit">
          <img src="/ph_magnifying-glass.png" alt="Search" />
        </button>
      </form>
    </header>
  );
};

export default GlobalHeader;











