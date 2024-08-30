const Error = ({ onReload }) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', textAlign: 'center' }}>
        <button onClick={onReload} style={{ marginTop: 'auto', marginBottom: '250px' }}>Reload Page</button>
      </div>
    );
  };
  
  export default Error;

