const GlobalHeader = () => {
    const navigateToHome = () => {
        window.location.href = '/';
    };
  
    const handleSearch = () => {
        window.location.href = '/about';
    };
  
    const navigateToProfile = () => {
        window.location.href = '/about';
    };
  
    return (
      <header className="global-header">
        <div className="logo" onClick={navigateToHome}>
          <img src="/fowealuplogo.png"/>
        </div>
        <form className="search-form" onSubmit={handleSearch}>
          <input type="text" name="searchInput" placeholder="  Search" />
          <button className="centered-button" type="submit"><img src="/ph_magnifying-glass.png"></img></button>
        </form>
        <div className="profile-links">
          <img src="/Icon.png" onClick={() => navigateToProfile('/about')} />
        </div>
      </header>
    );
  };
  export default GlobalHeader;