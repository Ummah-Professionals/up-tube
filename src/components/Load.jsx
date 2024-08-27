import './Load.css';

const Load = () => {
  return (
    <div className="loading-graphic">
      <img src="/Loading.png" alt="Loading" />
      <p className="loading-message">LOADING....</p>
    </div>
  );
};

export default Load;