import './Error.css'; 

const Error = ({ onRetry }) => {
    return (
      <div className="error">
        <img src="/error.png" alt="Error" />
        <p className="error-title">Sorry, something went wrong.</p>
        <p className="error-subtitle">Try reloading the page. We're working hard to fix the platform for you as soon as possible.</p>
        <button className="reload-button" onClick={onRetry}>Reload</button>
      </div>
    );
  };

export default Error;
