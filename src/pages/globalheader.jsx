import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const GlobalHeader = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchInput.trim()) {
     
      navigate(`/?query=${encodeURIComponent(searchInput.trim())}`);
    } else {
   
      navigate('/');
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
      <div className="profile-links">
        <img src="/Icon.png" onClick={() => navigate('/about')} alt="Profile" />
      </div>
    </header>
  );
};

export default GlobalHeader;



