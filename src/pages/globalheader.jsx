import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const GlobalHeader = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?page=1&page_size=32&searchQuery=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="global-header">
      <div className="logo" onClick={() => navigate('/')}>
        <img src="/fowealuplogo.png" alt="Logo" />
      </div>
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          name="searchInput"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
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




